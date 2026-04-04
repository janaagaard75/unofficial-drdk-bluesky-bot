import { productionAgent } from "../shared/productionAgent";
import { getNewHnStoryIds } from "./getNewHnStoryIds";
import { postHnStory } from "./postHnStory";

const newStoryIds = await getNewHnStoryIds(productionAgent);
console.log("New story IDs: ", newStoryIds.join(", "));

for (const storyId of newStoryIds) {
  console.log(`Posting story ID ${storyId} to Bluesky...`);
  await postHnStory(productionAgent, storyId);
}
