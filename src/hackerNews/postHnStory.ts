import { AtpAgent } from "@atproto/api";
import { postToBluesky } from "../bluesky/postToBluesky/postToBluesky";
import { brand } from "../shared/brandedTypes/brand";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { fetchPageInfo } from "./fetchPageInfo/fetchPageInfo";
import { HnStory } from "./HnStory";
import { summarize } from "./summarize";

export const postHnStory = async (agent: AtpAgent, hnStory: HnStory) => {
  const hnStoryUrl = new URL(
    `https://news.ycombinator.com/item?id=${hnStory.id}`,
  );

  console.log(`Hacker News URL: ${hnStoryUrl}`);
  console.log(`Hacker News title: ${hnStory.title}`);
  console.log(`Story URL: ${hnStory.url}`);

  const article = await fetchPageInfo(hnStory.url);

  console.log(`Title: ${article.title ?? "No title found."}`);
  console.log(`Description: ${article.description ?? "No description found."}`);
  console.log(`Image: ${article.imageUrl ?? "No image found."}`);
  console.log(
    `Text: ${article.text === undefined ? "No text found." : article.text.substring(0, 600)}...`,
  );

  const summary = brand<PlainTextString>(
    article.text === undefined
      ? ""
      : await summarize(article.text, 300, "google/gemini-2.5-flash"),
  );
  console.log(`Summary: ${summary}`);

  await postToBluesky({
    agent: agent,
    linkDescription: brand<PlainTextString>(article.description ?? ""),
    linkImageUrl: article.imageUrl,
    linkTitle: brand<PlainTextString>(`${hnStory.title} (${hnStory.score})`),
    linkUrl: hnStoryUrl,
    text: summary,
  });
};
