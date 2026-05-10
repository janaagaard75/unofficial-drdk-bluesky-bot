import { AtpAgent } from "@atproto/api";
import { setDifference } from "../shared/setDifference";
import { fetchHnFrontPageStoryIds } from "./fetchHnFrontPageStoryIds";
import { fetchPostedHnStoryIds } from "./fetchPostedHnStoryIds";

export const getNewHnStoryIds = async (agent: AtpAgent) => {
  const frontPageStoryIds = new Set(await fetchHnFrontPageStoryIds());
  const postedStoryIds = await fetchPostedHnStoryIds(agent);
  const newStoryIds = setDifference(frontPageStoryIds, postedStoryIds);

  return newStoryIds;
};
