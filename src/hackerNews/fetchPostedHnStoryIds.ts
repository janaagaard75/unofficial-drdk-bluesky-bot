import { AtpAgent } from "@atproto/api";
import { fetchUrlsPostedOnBluesky } from "../fetchUrlsPostedOnBluesky/fetchUrlsPostedOnBluesky";

export const fetchPostedNhStoryIds = async (agent: AtpAgent) => {
  const feedSize = 30;
  const postedUrls = await fetchUrlsPostedOnBluesky(agent, 2 * feedSize);

  const storyIds = new Set(
    [...postedUrls]
      .map((url) => new URL(url))
      .filter((url) => url.hostname === "news.ycombinator.com")
      .map((url) => Number(url.searchParams.get("id")))
      .filter((id): id is number => Number.isInteger(id)),
  );

  return storyIds;
};
