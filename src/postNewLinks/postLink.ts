import { AtpAgent } from "@atproto/api";
import { extractImageUrl } from "../extractImageUrl/extractImageUrl";
import { postToBluesky } from "../postToBluesky/postToBluesky";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { UrlString } from "../shared/brandedTypes/UrlString";
import { extractArticleText } from "../summarize/extractArticleText";
import { summarizeWithOpenRouter } from "../summarize/summarizeWithOpenRouter";
import { extractDescription } from "./extractDescription";
import { extractHtmlArticle } from "./extractHtmlArticle";
import { fetchHtmlPage } from "./fetchHtmlPage";

export const postLink = async (
  agent: AtpAgent,
  title: PlainTextString,
  url: UrlString,
) => {
  const htmlPage = await fetchHtmlPage(url);
  const description = extractDescription(htmlPage);
  const htmlArticle = extractHtmlArticle(htmlPage);
  const imageUrl = extractImageUrl(htmlArticle);
  const articleText = extractArticleText(htmlArticle);
  const summary = await summarizeWithOpenRouter(
    articleText,
    "google/gemini-2.5-flash",
  );

  await postToBluesky(agent, description, imageUrl, summary, title, url);
};
