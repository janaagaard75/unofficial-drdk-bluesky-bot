import { AtpAgent } from "@atproto/api";
import { downloadImage } from "./downloadImage";
import { fetchDescriptionAndImage } from "./fetchDescriptionAndImage";
import { uploadImage } from "./uploadImage";

export const postToBluesky = async (
  agent: AtpAgent,
  title: string,
  url: string
) => {
  console.log("Posting url.", url);
  const imageAndDescription = await fetchDescriptionAndImage(url);
  const image = await downloadImage(imageAndDescription?.imageUrl);
  const imageBlob = await uploadImage(agent, image);

  const post = {
    embed: {
      $type: "app.bsky.embed.external",
      external: {
        description: imageAndDescription?.description ?? "",
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
