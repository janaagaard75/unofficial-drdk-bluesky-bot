import { AtpAgent } from "@atproto/api";
import { fetchDescriptionAndImages } from "../fetchDescriptionAndImages/fetchDescriptionAndImages";
import { postToBluesky } from "../postToBluesky/postToBluesky";
import { createPlainTextString } from "../shared/createPlainTextString";
import { PlainTextString } from "../shared/PlainTextString";
import { UrlString } from "../shared/UrlString";
import { extractArticleText } from "../summarize/extractArticleText";
import { summarizeWithAzure } from "../summarize/summarizeWithAzure";
import { extractArticleImageUrl } from "./extractArticleImageUrl";
import { fetchArticleHtml } from "./fetchArticleHtml";

export const postLink = async (
  agent: AtpAgent,
  title: PlainTextString,
  url: UrlString,
) => {
  const descriptionAndImageUrl = await fetchDescriptionAndImages(url);
  const description =
    descriptionAndImageUrl === undefined
      ? createPlainTextString("")
      : descriptionAndImageUrl.description;
  const articleHtml = await fetchArticleHtml(url);
  const articleImage = extractArticleImageUrl(articleHtml);
  const imageUrl = articleImage ?? descriptionAndImageUrl?.images[0]?.url;
  const articleText = extractArticleText(articleHtml);
  const summary = await summarizeWithAzure(articleText);

  await postToBluesky(agent, description, imageUrl, summary, title, url);
};
