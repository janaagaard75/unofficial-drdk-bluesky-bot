import { JSDOM } from "jsdom";
import { brand } from "../shared/brandedTypes/brand";
import { UrlString } from "../shared/brandedTypes/UrlString";
import { ReadabilityArticle } from "./getReadabilityArticle";

export const getImageFromDomOrArticle = (
  dom: JSDOM,
  article: ReadabilityArticle | undefined,
): UrlString | undefined => {
  const openGraphImageUrl = dom.window.document
    .querySelector('meta[property="og:image"]')
    ?.getAttribute("content");

  if (
    openGraphImageUrl !== undefined
    && openGraphImageUrl !== null
    && openGraphImageUrl.trim() !== ""
  ) {
    return brand<UrlString>(openGraphImageUrl);
  }

  const twitterImageUrl = dom.window.document
    .querySelector("meta[name='twitter:image']")
    ?.getAttribute("content");

  if (
    twitterImageUrl !== undefined
    && twitterImageUrl !== null
    && twitterImageUrl.trim() !== ""
  ) {
    return brand<UrlString>(twitterImageUrl);
  }

  if (
    article !== undefined
    && article.content !== undefined
    && article.content !== null
  ) {
    const articleDom = new JSDOM(article.content);
    const articleImageUrl = articleDom.window.document
      .querySelector("img")
      ?.getAttribute("src");
    if (
      articleImageUrl !== undefined
      && articleImageUrl !== null
      && articleImageUrl.trim() !== ""
    ) {
      return brand<UrlString>(articleImageUrl);
    }
  }

  return undefined;
};
