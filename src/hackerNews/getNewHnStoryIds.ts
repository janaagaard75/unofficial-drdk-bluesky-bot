import { AtpAgent } from "@atproto/api";
import { setDifference } from "../shared/setDifference";
import { fetchHnFrontPageStoryIds } from "./fetchHnFrontPageStoryIds";
import { fetchPostedNhStoryIds } from "./fetchPostedHnStoryIds";

export const getNewHnStoryIds = async (agent: AtpAgent) => {
  const frontPageStoryIds = new Set(await fetchHnFrontPageStoryIds());
  const postedStoryIds = await fetchPostedNhStoryIds(agent);
  const newStoryIds = setDifference(frontPageStoryIds, postedStoryIds);

  return newStoryIds;
};
