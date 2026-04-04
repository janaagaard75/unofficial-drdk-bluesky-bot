import { AtpAgent } from "@atproto/api";
import { fetchUrlsPostedOnBluesky } from "../fetchUrlsPostedOnBluesky/fetchUrlsPostedOnBluesky";
import { numberOfStoriesOnTheNhFrontPage } from "./numberOfStoriesOnTheNhFrontPage";

export const fetchPostedNhStoryIds = async (agent: AtpAgent) => {
  const postedUrls = await fetchUrlsPostedOnBluesky(
    agent,
    2 * numberOfStoriesOnTheNhFrontPage,
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
