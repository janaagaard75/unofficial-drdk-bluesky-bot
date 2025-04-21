import { AtpAgent } from "@atproto/api";
import { fetchDescriptionAndImages } from "../fetchDescriptionAndImages/fetchDescriptionAndImages";
import { summarizeWithAzure } from "../summarize/summarizeWithAzure";
import { downloadImage } from "./downloadImage";
import { extractArticleImageUrl } from "./extractArticleImageUrl";
import { fetchArticleHtml } from "./fetchArticleHtml";
import { uploadImage } from "./uploadImage";

export const postToBluesky = async (
  agent: AtpAgent,
  title: string,
  url: string,
) => {
  console.log("Posting url.", url);
  const descriptionAndImageUrl = await fetchDescriptionAndImages(url);
  const articleHtml = await fetchArticleHtml(url);
  const articleImage = extractArticleImageUrl(articleHtml);
  const imageUrl = articleImage ?? descriptionAndImageUrl?.images[0]?.url;
  const image = await downloadImage(imageUrl);
  const imageBlob = await uploadImage(agent, image);
  const summary = await summarizeWithAzure(articleHtml);

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
