import { postToBluesky } from "../postToBluesky/postToBluesky";
import { brand } from "../shared/brandedTypes/brand";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { UrlString } from "../shared/brandedTypes/UrlString";
import { testAgent } from "../shared/testAgent";
import { fetchHnStory } from "./fetchHnStory";
import { fetchPageInfo } from "./fetchPageInfo";
import { fetchRandomStoryId } from "./fetchRandomStoryId";
import { summarize } from "./summarize";

const storyId = await fetchRandomStoryId();

const story = await fetchHnStory(storyId);

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

const summary = brand<PlainTextString>(
  pageInfo.text === undefined
    ? "No text found to summarize."
    : await summarize(pageInfo.text, 300, "google/gemini-2.5-flash"),
);
console.log(`Summary: ${summary}`);

await postToBluesky({
  agent: testAgent,
  linkDescription: summary,
  linkImageUrl: pageInfo.imageUrl,
  linkTitle: hnStory.title,
  linkUrl: brand<UrlString>(`https://news.ycombinator.com/item?id=${storyId}`),
  text: summary,
});
