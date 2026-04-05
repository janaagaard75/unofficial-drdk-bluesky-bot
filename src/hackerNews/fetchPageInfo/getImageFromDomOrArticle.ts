import { JSDOM } from "jsdom";
import { brand } from "../../shared/brandedTypes/brand";
import { UrlString } from "../../shared/brandedTypes/UrlString";
import { fetchImage } from "./fetchImage";
import { ReadabilityArticle } from "./getReadabilityArticle";
import { imageIsLargeEnough } from "./imageIsLargeEnough";
import { resolveUrl } from "./resolveUrl";

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

    if (
      openGraphImage !== undefined
      && imageIsLargeEnough(openGraphImage, minimumImageSize)
    ) {
      return brand<UrlString>(resolvedUrl);
    }
  }

  const twitterImageUrl = dom.window.document
    .querySelector("meta[name='twitter:image']")
    ?.getAttribute("content");

  if (twitterImageUrl !== undefined && twitterImageUrl !== null) {
    const resolvedUrl = resolveUrl(twitterImageUrl, baseUrl);
    const twitterImage = await fetchImage(resolvedUrl);

    if (
      twitterImage !== undefined
      && imageIsLargeEnough(twitterImage, minimumImageSize)
    ) {
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

      if (
        articleImage !== undefined
        && imageIsLargeEnough(articleImage, minimumImageSize)
      ) {
        return brand<UrlString>(resolvedUrl);
      }
    }
  }

  return undefined;
};

const minimumImageSize = 200;
