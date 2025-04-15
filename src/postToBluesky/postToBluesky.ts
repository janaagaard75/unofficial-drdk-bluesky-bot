import { AtpAgent } from "@atproto/api";
import { fetchDescriptionAndImages } from "../fetchDescriptionAndImages/fetchDescriptionAndImages";
import { fetchAndSummarize } from "../summarizer/fetchAndSummarize";
import { downloadImage } from "./downloadImage";
import { uploadImage } from "./uploadImage";

export const postToBluesky = async (
  agent: AtpAgent,
  title: string,
  url: string,
) => {
  console.log("Posting url.", url);
  const descriptionAndImageUrl = await fetchDescriptionAndImages(url);
  const image = await downloadImage(descriptionAndImageUrl?.images[0]?.url);
  const imageBlob = await uploadImage(agent, image);
  const summary = await fetchAndSummarize(url);

  const post = {
    embed: {
      $type: "app.bsky.embed.external",
      external: {
        description: descriptionAndImageUrl?.description ?? "",
        thumb: imageBlob,
        title: title,
        uri: url,
      },
    },
    langs: ["da-DK"],
    text: summary,
  };

  await agent.post(post);
};
