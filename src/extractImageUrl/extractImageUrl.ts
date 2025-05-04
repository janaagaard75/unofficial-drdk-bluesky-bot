import { JSDOM } from "jsdom";
import { createUrlString } from "../shared/createUrlString";
import { HtmlString } from "../shared/HtmlString";
import { UrlString } from "../shared/UrlString";

/** Extract the image URL from the content of the <meta name="og:image"> element in htmlDocument. */
export const extractImageUrl = (
  articleHtml: HtmlString,
): UrlString | undefined => {
  const articleDocument = JSDOM.fragment(articleHtml);
  const imageElement = articleDocument.querySelector(
    "div[itemProp='image'] meta[itemProp='url']",
  );
  const rawImageUrl = imageElement?.getAttribute("content");

  if (rawImageUrl === null || rawImageUrl === undefined) {
    return undefined;
  }

  const imageUrl = rawImageUrl.substring(0, rawImageUrl.indexOf("?"));
  return createUrlString(imageUrl);
};
