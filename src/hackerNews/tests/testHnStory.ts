import { fetchHnStory } from "../fetchHnStory";
import { fetchPageInfo } from "../fetchPageInfo/fetchPageInfo";
import { summarize } from "../summarize";
import { fetchRandomStoryId } from "./fetchRandomStoryId";

const storyId = await fetchRandomStoryId();

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
console.log(`Title: ${pageInfo.title ?? "No title found."}`);

const summary =
  pageInfo.text === undefined
    ? undefined
    : await summarize(pageInfo.text, 300, "google/gemini-2.5-flash");

console.log(`Summary: ${summary ?? "Could not extract page text."}`);
