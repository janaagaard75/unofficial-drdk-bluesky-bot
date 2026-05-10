import { AtpAgent } from "@atproto/api";
import { fetchUrlsPostedOnBluesky } from "../bluesky/fetchUrlsPostedOnBluesky/fetchUrlsPostedOnBluesky";
import { numberOfStoriesOnTheHnFrontPage } from "./numberOfStoriesOnTheHnFrontPage";

export const fetchPostedHnStoryIds = async (agent: AtpAgent) => {
  const postedUrls = await fetchUrlsPostedOnBluesky(
    agent,
    2 * numberOfStoriesOnTheHnFrontPage,
  );

  const storyIds = new Set(
    [...postedUrls]
      .map((url) => new URL(url))
      .filter((url) => url.hostname === "news.ycombinator.com")
      .map((url) => Number(url.searchParams.get("id")))
      .filter((id): id is number => Number.isInteger(id)),
  );

  return storyIds;
};
