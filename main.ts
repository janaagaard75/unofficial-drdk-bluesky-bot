import { AtpAgent, Facet } from "@atproto/api";
import Parser from "rss-parser";
import { detectFacets, UnicodeString } from "./detectFacets";

if (!Set.prototype.difference) {
  Set.prototype.difference = function (
    this: Set<any>,
    otherSet: Set<any>
  ): Set<any> {
    const result = new Set(this);
    for (const item of otherSet) {
      result.delete(item);
    }
    return result;
  };
}

if (!Set.prototype.intersection) {
  Set.prototype.intersection = function (otherSet: Set<any>): Set<any> {
    if (!(otherSet instanceof Set)) {
      throw new TypeError("Argument must be a Set");
    }

    const intersectionSet = new Set<any>();
    for (const item of this) {
      if (otherSet.has(item)) {
        intersectionSet.add(item);
      }
    }
    return intersectionSet;
  };
}

interface Record {
  facets: Array<Facet>;
}

interface External {
  description: string;
  thumb: string;
  title: string;
  uri: string;
}

async function main() {
  try {
    const agent = new AtpAgent({
      service: "https://bsky.social",
    });

    const postedUrls = await fetchPostedUrlsOnBluesky(agent);
    const titlesAndUrlsFromFeed = await fetchTitlesAndUrlsFromRssFeed();
    const urlsFromFeed = new Set(titlesAndUrlsFromFeed.map((item) => item.url));

    // const alreadyPostedUrls = urlsFromFeed.intersection(postedUrls);

    const newUrls = urlsFromFeed.difference(postedUrls);
    const newTitlesAndUrls = titlesAndUrlsFromFeed.filter((titleAndUrl) =>
      newUrls.has(titleAndUrl.url)
    );

    console.log("postedUrls", postedUrls);
    // console.log("urlsFromFeed", urlsFromFeed);
    // console.log("alreadyPostedUrls", alreadyPostedUrls);
    // console.log("newUrls", newUrls);

    const firstTitleAndUrl = newTitlesAndUrls[0];
    if (firstTitleAndUrl !== undefined) {
      postUrl(agent, firstTitleAndUrl.title, firstTitleAndUrl.url);
    }

    // for (const titleAndUrl of newTitlesAndUrls) {
    //   await postUrl(agent, titleAndUrl.title, titleAndUrl.url);
    // }

    console.log(`Posted ${newUrls.size} new URLs.`);
  } catch (error) {
    console.error(error);
  }
}

const fetchTitlesAndUrlsFromRssFeed = async (): Promise<
  Array<{
    title: string;
    url: string;
  }>
> => {
  const parser = new Parser();
  const newsFeed = await parser.parseURL(
    "https://www.dr.dk/nyheder/service/feeds/senestenyt"
  );

  const titlesAndUrls = newsFeed.items.map((item) => {
    return {
      title: item.title ?? "",
      url: item.link ?? "",
    };
  });

  return titlesAndUrls;
};

const fetchPostedUrlsOnBluesky = async (
  agent: AtpAgent
): Promise<Set<string>> => {
  await agent.login({
    identifier: process.env["BLUESKY_USERNAME"]!,
    password: process.env["BLUESKY_PASSWORD"]!,
  });

  const feedSize = 20;
  const timeline = await agent.getTimeline({
    limit: 2 * feedSize,
  });

  const feedViewPosts = timeline.data.feed;

  const postedUrls = feedViewPosts
    // Filter out posts that aren't from the bot. Don't know why this is necessary.
    .filter(
      (feedViewPost) =>
        feedViewPost.post.author.did === "did:plc:dlxnthdtaz7qdflht47dpst6"
    )
    .map((feedViewPost) => feedViewPost.post.record as Record)
    .filter(isDefined)
    .flatMap((record) => record.facets)
    .flatMap((facet) => facet.features)
    .filter((feature) => feature.$type === "app.bsky.richtext.facet#link")
    .map((link) => link.uri as string);

  return new Set(postedUrls);
};

const postUrl = async (agent: AtpAgent, title: string, url: string) => {
  const strippedUrl = url.replace(/https?:\/\//, "");
  const text = `${title}\n\n${strippedUrl}`;
  const facets = detectFacets(new UnicodeString(text));
  const post = {
    facets: facets,
    langs: ["da-DK"],
    text: text,
  };

  console.dir(post, { depth: undefined });
  // await agent.post(post);
};

const isDefined = <T>(item: T | null | undefined): item is T =>
  item !== undefined && item !== null;

main();
