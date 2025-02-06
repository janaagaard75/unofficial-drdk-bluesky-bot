import { AtpAgent } from "@atproto/api";
import { fetchDescriptionAndImage } from "./fetchDescriptionAndImage";
import { uploadImage } from "./uploadImage";

export const postTitleAndUrl = async (
  agent: AtpAgent,
  title: string,
  url: string
) => {
  const imageAndDescription = await fetchDescriptionAndImage(url);
  const imageBlob = await uploadImage(agent, imageAndDescription?.image);

  const post = {
    embed: {
      $type: "app.bsky.embed.external",
      external: {
        description: imageAndDescription?.description,
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
