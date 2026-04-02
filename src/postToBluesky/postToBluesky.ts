import { AtpAgent } from "@atproto/api";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { UrlString } from "../shared/brandedTypes/UrlString";
import { compressImage } from "./compressImage";
import { downloadImage } from "./downloadImage";
import { limitLength } from "./limitLength";
import { uploadImage } from "./uploadImage";

export const postToBluesky = async (parameters: {
  agent: AtpAgent;
  description: PlainTextString;
  imageUrl: UrlString | undefined;
  text: PlainTextString;
  title: PlainTextString;
  url: UrlString;
}) => {
  const downloadedImage = await downloadImage(parameters.imageUrl);
  const compressedImage = await compressImage(downloadedImage);
  const uploadedImageReference = await uploadImage(
    parameters.agent,
    compressedImage,
  );
  const limitedText = limitLength(parameters.text);

  console.log(
    `Posting ${parameters.url} to Bluesky with the text "${limitedText}" (${limitLength.length}).`,
  );

  const post = {
    embed: {
      $type: "app.bsky.embed.external",
      external: {
        description: parameters.description,
        thumb: uploadedImageReference,
        title: parameters.title,
        uri: parameters.url,
      },
    },
    langs: ["da-DK"],
    text: limitedText,
  };

  await parameters.agent.post(post);
};
