import { AtpAgent } from "@atproto/api";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { UrlString } from "../shared/brandedTypes/UrlString";
import { compressImage } from "./compressImage";
import { downloadImage } from "./downloadImage";
import { limitLength } from "./limitLength";
import { uploadImage } from "./uploadImage";

export const postToBluesky = async (
  agent: AtpAgent,
  description: PlainTextString,
  imageUrl: UrlString | undefined,
  text: PlainTextString,
  title: PlainTextString,
  url: UrlString,
) => {
  const downloadedImage = await downloadImage(imageUrl);
  const compressedImage = await compressImage(downloadedImage);
  const uploadedImageReference = await uploadImage(agent, compressedImage);
  const limitedText = limitLength(text);

  console.log(
    `Posting ${url} to Bluesky with the text "${limitedText}" (${limitLength.length}).`,
  );

  const post = {
    embed: {
      $type: "app.bsky.embed.external",
      external: {
        description: description,
        thumb: uploadedImageReference,
        title: title,
        uri: url,
      },
    },
    langs: ["da-DK"],
    text: limitedText,
  };

  await agent.post(post);
};
