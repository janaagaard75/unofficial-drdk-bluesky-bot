import { fetchHnFrontPageStoryIds } from "./fetchHnFrontPageStoryIds";
import { fetchHnStory } from "./fetchHnStory";

const allStoryIds = await fetchHnFrontPageStoryIds();
const randomStoryId =
  allStoryIds[Math.floor(Math.random() * allStoryIds.length)];

if (randomStoryId === undefined) {
  throw new Error(
    `Something went wrong getting a random story ID. Number of story IDs: ${allStoryIds.length}`,
  );
}

const story = await fetchHnStory(randomStoryId);
console.log(`Story ID: ${randomStoryId}`);

if (story === undefined) {
  throw new Error(
    `Something went wrong fetching the story with ID ${randomStoryId}.`,
  );
}

console.log(`Story title: ${story.title}`);
console.log(`Story URL: ${story.url}`);
