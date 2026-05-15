import { AtpAgent } from "@atproto/api";
import { postToBluesky } from "../bluesky/postToBluesky/postToBluesky";
import { fetchPageInfo } from "../hackerNews/fetchPageInfo/fetchPageInfo";
import { brand } from "../shared/brandedTypes/brand";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { summarizePolitiet } from "./summarizePolitiet";

interface PolitietUpdate {
  description: PlainTextString;
  imageUrl: URL | undefined;
  title: PlainTextString;
  url: URL;
}

export const postUpdate = async (agent: AtpAgent, update: PolitietUpdate) => {
  const pageInfo = await fetchPageInfo(update.url);

  const summary = await (async () => {
    if (pageInfo.text === undefined || pageInfo.text.length === 0) {
      return update.description;
    }

    return brand<PlainTextString>(
      await summarizePolitiet(pageInfo.text, 300, "google/gemini-2.5-flash"),
    );
  })();

  console.log(`Summary: ${summary}`);

  await postToBluesky({
    agent,
    language: "da-DK",
    linkDescription: update.description,
    linkImageUrl: update.imageUrl,
    linkTitle: update.title,
    linkUrl: update.url,
    text: summary,
  });
};
