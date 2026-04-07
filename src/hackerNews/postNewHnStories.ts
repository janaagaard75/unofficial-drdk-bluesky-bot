import { getNewHnStoryIds } from "./getNewHnStoryIds";
import { hnProductionAgent } from "./hnProductionAgent";
import { postHnStory } from "./postHnStory";

const newStoryIds = await getNewHnStoryIds(hnProductionAgent);
console.log("New story IDs: ", [...newStoryIds].join(", "));

for (const storyId of newStoryIds) {
  console.log(`Posting story ID ${storyId} to Bluesky...`);
  await postHnStory(hnProductionAgent, storyId);
}
