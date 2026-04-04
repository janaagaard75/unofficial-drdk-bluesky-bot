import { AtpAgent } from "@atproto/api";
import { fetchHnFrontPageStoryIds } from "./fetchHnFrontPageStoryIds";
import { fetchPostedNhStoryIds } from "./fetchPostedHnStoryIds";

export const getNewHnStoryIds = async (agent: AtpAgent) => {
  const frontPageStoryIds = await fetchHnFrontPageStoryIds();
  const postedStoryIds = await fetchPostedNhStoryIds(agent);
  const newStoryIds = frontPageStoryIds.filter((id) => !postedStoryIds.has(id));

  return newStoryIds;
};
