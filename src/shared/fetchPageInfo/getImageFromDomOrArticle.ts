import { JSDOM } from "jsdom";
import { fetchImage } from "./fetchImage";
import { ReadabilityArticle } from "./getReadabilityArticle";
import { imageIsLargeEnough } from "./imageIsLargeEnough";

export const getImageFromDomOrArticle = async (
  baseUrl: URL,
  dom: JSDOM,
  article: ReadabilityArticle | undefined,
): Promise<URL | undefined> => {
  const openGraphImageUrl = dom.window.document
    .querySelector('meta[property="og:image"]')
    ?.getAttribute("content");

  if (
    openGraphImageUrl !== undefined
    && openGraphImageUrl !== null
    && openGraphImageUrl.trim() !== ""
  ) {
    const resolvedUrl = new URL(openGraphImageUrl, baseUrl);
    const openGraphImage = await fetchImage(resolvedUrl);

    if (
      openGraphImage !== undefined
      && imageIsLargeEnough(openGraphImage, minimumImageSize)
    ) {
      return resolvedUrl;
    }
  }

  const twitterImageUrl = dom.window.document
    .querySelector("meta[name='twitter:image']")
    ?.getAttribute("content");

  if (
    twitterImageUrl !== undefined
    && twitterImageUrl !== null
    && twitterImageUrl.trim() !== ""
  ) {
    const resolvedUrl = new URL(twitterImageUrl, baseUrl);
    const twitterImage = await fetchImage(resolvedUrl);

    if (
      twitterImage !== undefined
      && imageIsLargeEnough(twitterImage, minimumImageSize)
    ) {
      return resolvedUrl;
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
    if (
      articleImageUrl !== undefined
      && articleImageUrl !== null
      && articleImageUrl.trim() !== ""
    ) {
      const resolvedUrl = new URL(articleImageUrl, baseUrl);
      const articleImage = await fetchImage(resolvedUrl);

      if (
        articleImage !== undefined
        && imageIsLargeEnough(articleImage, minimumImageSize)
      ) {
        return resolvedUrl;
      }
    }
  }

  return undefined;
};

const minimumImageSize = 200;
