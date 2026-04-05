import { imageSize } from "image-size";
import { JSDOM } from "jsdom";
import { brand } from "../shared/brandedTypes/brand";
import { UrlString } from "../shared/brandedTypes/UrlString";
import { ReadabilityArticle } from "./getReadabilityArticle";

export const getImageFromDomOrArticle = async (
  baseUrl: UrlString,
  dom: JSDOM,
  article: ReadabilityArticle | undefined,
): Promise<UrlString | undefined> => {
  const openGraphImageUrl = dom.window.document
    .querySelector('meta[property="og:image"]')
    ?.getAttribute("content");

  if (openGraphImageUrl !== undefined && openGraphImageUrl !== null) {
    const resolvedUrl = resolveUrl(openGraphImageUrl, baseUrl);
    const openGraphImage = await fetchImage(resolvedUrl);

    if (openGraphImage !== undefined && imageIsLargeEnough(openGraphImage)) {
      return brand<UrlString>(resolvedUrl);
    }
  }

  const twitterImageUrl = dom.window.document
    .querySelector("meta[name='twitter:image']")
    ?.getAttribute("content");

  if (twitterImageUrl !== undefined && twitterImageUrl !== null) {
    const resolvedUrl = resolveUrl(twitterImageUrl, baseUrl);
    const twitterImage = await fetchImage(resolvedUrl);

    if (twitterImage !== undefined && imageIsLargeEnough(twitterImage)) {
      return brand<UrlString>(resolvedUrl);
    }
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
    if (articleImageUrl !== undefined && articleImageUrl !== null) {
      const resolvedUrl = resolveUrl(articleImageUrl, baseUrl);
      const articleImage = await fetchImage(resolvedUrl);

      if (articleImage !== undefined && imageIsLargeEnough(articleImage)) {
        return brand<UrlString>(resolvedUrl);
      }
    }
  }

  return undefined;
};

const fetchImage = async (imageUrl: string) => {
  if (imageUrl.trim() === "") {
    return undefined;
  }

  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    return undefined;
  }

  return await imageResponse.bytes();
};

const imageIsLargeEnough = (image: Uint8Array<ArrayBuffer>): boolean => {
  const dimensions = imageSize(image);
  return dimensions.width >= 200 && dimensions.height >= 200;
};

const resolveUrl = (url: string, baseUrl: string): string => {
  try {
    return new URL(url, baseUrl).href;
  } catch {
    return url;
  }
};
