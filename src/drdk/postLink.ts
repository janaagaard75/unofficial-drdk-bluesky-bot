import { AtpAgent } from "@atproto/api";
import { postToBluesky } from "../postToBluesky/postToBluesky";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { UrlString } from "../shared/brandedTypes/UrlString";
import { extractArticleText } from "./extractArticleText";
import { extractDescription } from "./extractDescription";
import { extractHtmlArticle } from "./extractHtmlArticle";
import { extractImageUrl } from "./extractImageUrl/extractImageUrl";
import { fetchHtmlPage } from "./fetchHtmlPage";
import { summarize } from "./summarize";

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
  const summary = await summarize(articleText, "google/gemini-2.5-flash");

  await postToBluesky({
    agent: agent,
    linkDescription: description,
    linkImageUrl: imageUrl,
    linkTitle: title,
    linkUrl: url,
    text: summary,
  });
};
