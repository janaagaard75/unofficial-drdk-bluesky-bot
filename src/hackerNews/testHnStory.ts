import { fetchHnFrontPageStoryIds } from "./fetchHnFrontPageStoryIds";
import { fetchHnStory } from "./fetchHnStory";
import { fetchPageInfo } from "./fetchPageInfo";
import { summarize } from "./summarize";

const storyId = await (async () => {
  const arg = process.argv[2];
  const parsedArg = Number(arg);
  if (Number.isInteger(parsedArg) && parsedArg >= 1) {
    return parsedArg;
  }

  const allStoryIds = await fetchHnFrontPageStoryIds();
  const randomStoryId =
    allStoryIds[Math.floor(Math.random() * allStoryIds.length)];

  if (randomStoryId === undefined) {
    throw new Error(
      `Something went wrong getting a random story ID. Number of story IDs: ${allStoryIds.length}`,
    );
  }

  return randomStoryId;
})();

const story = await fetchHnStory(storyId);
console.log(`Story ID: ${storyId}`);

if (story === undefined) {
  throw new Error(
    `Something went wrong fetching the story with ID ${storyId}.`,
  );
}

console.log(`NH Title: ${story.title}`);
console.log(`NH URL: https://news.ycombinator.com/item?id=${storyId}`);
console.log(`Story URL: ${story.url}`);

const pageInfo = await fetchPageInfo(story.url);
console.log(`Description: ${pageInfo.description ?? "No description found."}`);
console.log(`Image: ${pageInfo.imageUrl ?? "No image found."}`);

const summary =
  pageInfo.text === undefined
    ? undefined
    : await summarize(pageInfo.text, 300, "google/gemini-2.5-flash");

console.log(`Summary: ${summary ?? "Could not extract page text."}`);
