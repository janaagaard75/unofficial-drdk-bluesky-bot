import { AtpAgent } from "@atproto/api";
import { fetchPageInfo } from "../fetchPageInfo/fetchPageInfo";
import { postToBluesky } from "../postToBluesky/postToBluesky";
import { brand } from "../shared/brandedTypes/brand";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { UrlString } from "../shared/brandedTypes/UrlString";
import { fetchHnStory } from "./fetchHnStory";
import { summarize } from "./summarize";

export const postHnStory = async (agent: AtpAgent, storyId: number) => {
  const hnStory = await fetchHnStory(storyId);

  if (hnStory === undefined) {
    throw new Error(
      `Something went wrong fetching the story with ID ${storyId}.`,
    );
  }

  console.log(`Story URL: ${hnStory.url}`);
  console.log(`Hacker News title: ${hnStory.title}`);

  const article = await fetchPageInfo(hnStory.url);

  console.log(`Title: ${article.title ?? "No title found."}`);
  console.log(`Description: ${article.description ?? "No description found."}`);
  console.log(`Image: ${article.imageUrl ?? "No image found."}`);
  console.log(
    `Text: ${article.text === undefined ? "No text found." : article.text.substring(0, 600)}...`,
  );

  const summary = brand<PlainTextString>(
    article.text === undefined
      ? "No text found to summarize."
      : await summarize(article.text, 300, "google/gemini-2.5-flash"),
  );
  console.log(`Summary: ${summary}`);

  await postToBluesky({
    agent: agent,
    linkDescription: summary,
    linkImageUrl: article.imageUrl,
    linkTitle: hnStory.title,
    linkUrl: brand<UrlString>(
      `https://news.ycombinator.com/item?id=${storyId}`,
    ),
    text: summary,
  });
};
