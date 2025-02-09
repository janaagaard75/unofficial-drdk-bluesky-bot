import { AtpAgent } from "@atproto/api";
import { downloadImage } from "./downloadImage";
import { fetchDescriptionAndImageUrl } from "./fetchDescriptionAndImageUrl";
import { uploadImage } from "./uploadImage";

export const postToBluesky = async (
  agent: AtpAgent,
  title: string,
  url: string
) => {
  console.log("Posting url.", url);
  const descriptionAndImageUrl = await fetchDescriptionAndImageUrl(url);
  const image = await downloadImage(descriptionAndImageUrl?.imageUrl);
  const imageBlob = await uploadImage(agent, image);

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
    text: "",
  };

  await agent.post(post);
};
