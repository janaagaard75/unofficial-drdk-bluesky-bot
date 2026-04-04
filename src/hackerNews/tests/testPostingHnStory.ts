import { testAgent } from "../../shared/testAgent";
import { fetchRandomStoryId } from "../fetchRandomStoryId";
import { postHnStory } from "../postHnStory";

const storyId = await fetchRandomStoryId();
console.log(`Hacker News story ID: ${storyId}.`);

await postHnStory(testAgent, storyId);
