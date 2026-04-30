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

  const minimumUpvotes = 100;
  if (hnStory.score < minimumUpvotes) {
    console.log(
      `Story ID ${storyId} score of ${hnStory.score} is below the threshold of ${minimumUpvotes}. Skipping...`,
    );
    continue;
  }

  console.log(`Posting story ID ${storyId} to Bluesky...`);
  try {
    await postHnStory(hnProductionAgent, hnStory);
  } catch (error) {
    console.error(`Error posting story ${storyId}:`, error);
  }
}
