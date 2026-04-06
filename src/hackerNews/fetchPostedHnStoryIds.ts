import { AtpAgent } from "@atproto/api";
import { fetchHrefsPostedOnBluesky } from "../bluesky/fetchHrefsPostedOnBluesky/fetchHrefsPostedOnBluesky";
import { numberOfStoriesOnTheNhFrontPage } from "./numberOfStoriesOnTheNhFrontPage";

export const fetchPostedNhStoryIds = async (agent: AtpAgent) => {
  const postedHrefs = await fetchHrefsPostedOnBluesky(
    agent,
    2 * numberOfStoriesOnTheNhFrontPage,
  );

  const storyIds = new Set(
    [...postedHrefs]
      .map((href) => new URL(href))
      .filter((url) => url.hostname === "news.ycombinator.com")
      .map((url) => Number(url.searchParams.get("id")))
      .filter((id): id is number => Number.isInteger(id)),
  );

  return storyIds;
};
