import { AtpAgent } from "@atproto/api";
import Parser from "rss-parser";

const agent = new AtpAgent({
  service: "https://bsky.social",
});

interface External {
  description: string;
  thumb: string;
  title: string;
  uri: string;
}

async function main() {
  try {
    const urlsFromFeed = await fetchUrlsFromRssFeed();
    const postedUrls = await fetchPostedUrlsOnBluesky();

    const alreadyPostedUrls = urlsFromFeed.intersection(postedUrls);
    const newUrls = urlsFromFeed.difference(postedUrls);

    console.log("alreadyPostedUrls", alreadyPostedUrls);
    console.log("newUrls", newUrls);
  } catch (error) {
    console.error(error);
  }
}

const fetchUrlsFromRssFeed = async (): Promise<Set<string>> => {
  const parser = new Parser();
  const newsFeed = await parser.parseURL(
    "https://www.dr.dk/nyheder/service/feeds/senestenyt"
  );
  const urlsFromFeed = newsFeed.items
    .map((item) => item.link)
    .filter(isDefined);
  return new Set(urlsFromFeed);
};

const fetchPostedUrlsOnBluesky = async (): Promise<Set<string>> => {
  await agent.login({
    identifier: process.env["BLUESKY_USERNAME"]!,
    password: process.env["BLUESKY_PASSWORD"]!,
  });

  const timeline = await agent.getTimeline({
    limit: 100,
  });

  const feedViewPosts = timeline.data.feed;

  const postedUrls = feedViewPosts
    // Filter out posts that aren't from the bot. Don't know why this is necessary.
    .filter(
      (feedViewPost) =>
        feedViewPost.post.author.did === "did:plc:dlxnthdtaz7qdflht47dpst6"
    )
    .map((feedViewPost) => feedViewPost.post.embed)
    .filter(isDefined)
    .map((embed) => (embed.external as External).uri);

  return new Set(postedUrls);
};

const isDefined = <T,>(item: T | null | undefined): item is T =>
  item !== undefined && item !== null;

main();
