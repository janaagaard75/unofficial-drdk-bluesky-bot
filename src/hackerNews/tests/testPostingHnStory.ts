import { testAgent } from "../../shared/testAgent";
import { postHnStory } from "../postHnStory";
import { fetchRandomStoryId } from "./fetchRandomStoryId";

const storyId = await fetchRandomStoryId();
console.log(`Hacker News story ID: ${storyId}.`);

await postHnStory(testAgent, storyId);
