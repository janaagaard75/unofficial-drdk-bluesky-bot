import { AtpAgent } from "@atproto/api";
import type { Config } from "@netlify/functions";
import { fetchPostedUrlsOnBluesky } from "./fetchPostedUrlsOnBluesky/fetchPostedUrlsOnBluesky";
import { fetchTitlesAndUrlsFromRssFeed } from "./fetchTitlesAndUrlsFromRssFeed";
import { postTitleAndUrl } from "./postTitleAndUrl/postTitleAndUrl";
import { setDifference } from "./setDifference";

export default async (request: Request) => {
  const { next_run } = await request.json();
  console.log(`pTriggered. Next invocation at: ${next_run}.`);

  try {
    const agent = new AtpAgent({
      service: "https://bsky.social",
    });
    await agent.login({
      identifier: process.env["BLUESKY_USERNAME"]!,
      password: process.env["BLUESKY_PASSWORD"]!,
    });
    console.log("Signed in to Bluesky.");

    const postedUrls = await fetchPostedUrlsOnBluesky(agent);
    console.log(`Fetched ${postedUrls.size} posted URLs.`);

    const titlesAndUrlsFromFeed = await fetchTitlesAndUrlsFromRssFeed();
    console.log(
      `Fetched ${titlesAndUrlsFromFeed.length} titles and URLs from RSS feed.`
    );

    const urlsFromFeed = new Set(titlesAndUrlsFromFeed.map((item) => item.url));
    const newUrls = setDifference(urlsFromFeed, postedUrls);
    console.log(`Found ${newUrls.size} new URLs.`);

    const newTitlesAndUrls = titlesAndUrlsFromFeed.filter((titleAndUrl) =>
      newUrls.has(titleAndUrl.url)
    );

    for (const titleAndUrl of newTitlesAndUrls) {
      await postTitleAndUrl(agent, titleAndUrl.title, titleAndUrl.url);
    }

    console.log(`Posted ${newTitlesAndUrls.length} new URLs.`);
  } catch (error) {
    console.error(error);
  }
};

export const config: Config = {
  schedule: "@hourly",
};
