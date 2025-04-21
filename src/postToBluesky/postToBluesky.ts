import { AtpAgent } from "@atproto/api";
import { downloadImage } from "./downloadImage";
import { uploadImage } from "./uploadImage";

export const postToBluesky = async (
  agent: AtpAgent,
  description: string,
  imageUrl: string | undefined,
  text: string,
  title: string,
  url: string,
) => {
  console.log("Posting url.", url);

  const imageBuffer = await downloadImage(imageUrl);
  const imageBlob = await uploadImage(agent, imageBuffer);

  const post = {
    embed: {
      $type: "app.bsky.embed.external",
      external: {
        description: description,
        thumb: imageBlob,
        title: title,
        uri: url,
      },
    },
    langs: ["da-DK"],
    text: text,
  };

  await agent.post(post);
};
