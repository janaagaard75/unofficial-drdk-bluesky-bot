import { AtpAgent } from "@atproto/api";
import { postToBluesky } from "../bluesky/postToBluesky/postToBluesky";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";

interface PolitietUpdate {
  description: PlainTextString;
  imageUrl: URL | undefined;
  title: PlainTextString;
  url: URL;
}

export const postUpdate = async (agent: AtpAgent, update: PolitietUpdate) => {
  await postToBluesky({
    agent,
    language: "da-DK",
    linkDescription: update.description,
    linkImageUrl: update.imageUrl,
    linkTitle: update.title,
    linkUrl: update.url,
    text: update.description,
  });
};
