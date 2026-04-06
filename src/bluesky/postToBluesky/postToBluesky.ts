import { AtpAgent } from "@atproto/api";
import { PlainTextString } from "../../shared/brandedTypes/PlainTextString";
import { compressImage } from "./compressImage";
import { downloadImage } from "./downloadImage";
import { limitLength } from "./limitLength";
import { uploadImage } from "./uploadImage";

/** Create a post on Bluesky that contains a text and a link. The link is comprised of the title, description, thumbnail and of course a URL. */
export const postToBluesky = async (parameters: {
  agent: AtpAgent;
  linkDescription: PlainTextString;
  linkImageUrl: URL | undefined;
  linkTitle: PlainTextString;
  linkUrl: URL;
  text: PlainTextString;
}) => {
  const downloadedImage = await downloadImage(parameters.linkImageUrl);
  const compressedImage = await compressImage(downloadedImage);
  const uploadedImageReference = await uploadImage(
    parameters.agent,
    compressedImage,
  );
  const limitedText = limitLength(parameters.text);

  console.log(
    `Posting ${parameters.linkUrl} to Bluesky with the text "${limitedText}" (${limitLength.length}).`,
  );

  const post = {
    embed: {
      $type: "app.bsky.embed.external",
      external: {
        description: parameters.linkDescription,
        thumb: uploadedImageReference,
        title: parameters.linkTitle,
        uri: parameters.linkUrl,
      },
    },
    langs: ["da-DK"],
    text: limitedText,
  };

  await parameters.agent.post(post);
};
