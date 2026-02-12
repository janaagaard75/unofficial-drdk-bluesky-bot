import { fetchHnFrontPageStoryIds } from "./fetchHnFrontPageStoryIds";

const storyIds = await fetchHnFrontPageStoryIds();
console.log(storyIds.join(", "));
