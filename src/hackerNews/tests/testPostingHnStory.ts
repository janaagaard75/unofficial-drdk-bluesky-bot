import { exit } from "node:process";
import { testAgent } from "../../shared/testAgent";
import { fetchHnStory } from "../fetchHnStory";
import { postHnStory } from "../postHnStory";
import { fetchRandomStoryId } from "./fetchRandomStoryId";

const storyId = await fetchRandomStoryId();
console.log(`Hacker News story ID: ${storyId}.`);

const hnStory = await fetchHnStory(storyId);
if (hnStory === undefined) {
  console.log(`Story ID ${storyId} is invalid.`);
  exit(1);
}

await postHnStory(testAgent, hnStory);
