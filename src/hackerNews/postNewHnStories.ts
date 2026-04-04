import { drdkProductionAgent } from "../shared/drdkProductionAgent";
import { getNewHnStoryIds } from "./getNewHnStoryIds";
import { postHnStory } from "./postHnStory";

const newStoryIds = await getNewHnStoryIds(drdkProductionAgent);
console.log("New story IDs: ", newStoryIds.join(", "));

for (const storyId of newStoryIds) {
  console.log(`Posting story ID ${storyId} to Bluesky...`);
  await postHnStory(drdkProductionAgent, storyId);
}
