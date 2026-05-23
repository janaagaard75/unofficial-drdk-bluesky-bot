import { AtpAgent } from "@atproto/api";
import { postToBluesky } from "../bluesky/postToBluesky/postToBluesky";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { extractDescription } from "../shared/extractDescription";
import { extractArticleText } from "./extractArticleText";
import { extractHtmlArticle } from "./extractHtmlArticle";
import { extractImageUrl } from "./extractImageUrl/extractImageUrl";
import { fetchHtmlPage } from "./fetchHtmlPage";
import { summarizeDrdk } from "./summarizeDrdk";

export const postLink = async (
  agent: AtpAgent,
  title: PlainTextString,
  url: URL,
) => {
  const htmlPage = await fetchHtmlPage(url);
  const description = extractDescription(htmlPage);
  const htmlArticle = extractHtmlArticle(htmlPage);
  const imageUrl = extractImageUrl(htmlArticle);
  const articleText = extractArticleText(htmlArticle);
  const summary = await summarizeDrdk(articleText, 300);

  await postToBluesky({
    agent: agent,
    language: "da-DK",
    linkDescription: description,
    linkImageUrl: imageUrl,
    linkTitle: title,
    linkUrl: url,
    text: summary,
  });
};
