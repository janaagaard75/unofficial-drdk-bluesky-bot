import { fetchHnStory } from "./fetchHnStory";
import { getNewHnStoryIds } from "./getNewHnStoryIds";
import { hnProductionAgent } from "./hnProductionAgent";
import { postHnStory } from "./postHnStory";

const newStoryIds = await getNewHnStoryIds(hnProductionAgent);
console.log("New story IDs: ", [...newStoryIds].join(", "));

for (const storyId of newStoryIds) {
  const hnStory = await fetchHnStory(storyId);
  if (hnStory === undefined) {
    console.log(`Story ID ${storyId} is invalid. Skipping...`);
    continue;
  }

  console.log(`Posting story ID ${storyId} to Bluesky...`);
  await postHnStory(hnProductionAgent, hnStory);
}
