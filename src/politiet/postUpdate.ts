import { AtpAgent } from "@atproto/api";
import { postToBluesky } from "../bluesky/postToBluesky/postToBluesky";
import { brand } from "../shared/brandedTypes/brand";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { fetchPageInfo } from "../shared/fetchPageInfo/fetchPageInfo";
import { PolitietUpdate } from "./PolitietUpdate";
import { summarizePolitiet } from "./summarizePolitiet";

export const postUpdate = async (agent: AtpAgent, update: PolitietUpdate) => {
  const pageInfo = await fetchPageInfo(update.url);

  console.log(
    `Page text: ${pageInfo.text === undefined ? "undefined" : `${pageInfo.text.length} characters`}`,
  );

  const summary = await (async () => {
    if (pageInfo.text === undefined || pageInfo.text.length === 0) {
      console.log("Using fallback description as summary.");
      return update.description;
    }

    console.log("Generating summary with AI...");
    return brand<PlainTextString>(await summarizePolitiet(pageInfo.text, 300));
  })();

  console.log(`Summary (${summary.length} characters): ${summary}`);

  await postToBluesky({
    agent: agent,
    language: "da-DK",
    linkDescription: update.description,
    linkImageUrl: update.imageUrl,
    linkTitle: update.title,
    linkUrl: update.url,
    text: summary,
  });
};
