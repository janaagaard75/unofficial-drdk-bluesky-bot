import { JSDOM } from "jsdom";
import { brand } from "../shared/brandedTypes/brand";
import { UrlString } from "../shared/brandedTypes/UrlString";
import { ReadabilityArticle } from "./getReadabilityArticle";

export const getImageFromDomOrArticle = async (
  dom: JSDOM,
  article: ReadabilityArticle | undefined,
): Promise<UrlString | undefined> => {
  const openGraphImageUrl = dom.window.document
    .querySelector('meta[property="og:image"]')
    ?.getAttribute("content");

  const ogImageUrl = await imageExists(openGraphImageUrl);
  if (ogImageUrl !== undefined) {
    return ogImageUrl;
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

const imageExists = async (
  imageUrl: string | null | undefined,
): Promise<UrlString | undefined> => {
  if (imageUrl === undefined || imageUrl === null || imageUrl.trim() === "") {
    return undefined;
  }

  const imageResponse = await fetch(imageUrl, { method: "HEAD" });
  if (!imageResponse.ok) {
    return undefined;
  }

  return brand<UrlString>(imageUrl);
};
