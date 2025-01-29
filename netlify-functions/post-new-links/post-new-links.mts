import { AtpAgent } from "@atproto/api";
import type { Config } from "@netlify/functions";
import { fetchPostedUrlsOnBluesky } from "./fetchPostedUrlsOnBluesky/fetchPostedUrlsOnBluesky";
import { fetchTitlesAndUrlsFromRssFeed } from "./fetchTitlesAndUrlsFromRssFeed";
import { postTitleAndUrl } from "./postTitleAndUrl/postTitleAndUrl";
import { setDifference } from "./setDifference";

export default async (request: Request) => {
  const { next_run } = await request.json();

  try {
    const agent = new AtpAgent({
      service: "https://bsky.social",
    });

    await agent.login({
      identifier: process.env["BLUESKY_USERNAME"]!,
      password: process.env["BLUESKY_PASSWORD"]!,
    });

    const postedUrls = await fetchPostedUrlsOnBluesky(agent);
    const titlesAndUrlsFromFeed = await fetchTitlesAndUrlsFromRssFeed();
    const urlsFromFeed = new Set(titlesAndUrlsFromFeed.map((item) => item.url));
    // const alreadyPostedUrls = urlsFromFeed.intersection(postedUrls);
    const newUrls = setDifference(urlsFromFeed, postedUrls);
    const newTitlesAndUrls = titlesAndUrlsFromFeed.filter((titleAndUrl) =>
      newUrls.has(titleAndUrl.url)
    );

    // console.log("postedUrls", postedUrls);
    // console.log("urlsFromFeed", urlsFromFeed);
    // console.log("alreadyPostedUrls", alreadyPostedUrls);
    // console.log("newUrls", newUrls);

    // const lastTitleAndUrl = newTitlesAndUrls[newTitlesAndUrls.length - 1];
    // if (lastTitleAndUrl !== undefined) {
    //   postUrl(agent, lastTitleAndUrl.title, lastTitleAndUrl.url);
    // }

    for (const titleAndUrl of newTitlesAndUrls) {
      await postTitleAndUrl(agent, titleAndUrl.title, titleAndUrl.url);
    }

    console.log(`Posted ${newTitlesAndUrls.length} new URLs.`);
  } catch (error) {
    console.error(error);
  }

  console.log("Received event! Next invocation at:", next_run);
};

export const config: Config = {
  schedule: "@hourly",
};
