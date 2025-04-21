import { JSDOM } from "jsdom";
import { HtmlString } from "../shared/HtmlString";
import { UrlString } from "../shared/UrlString";

export const extractArticleImageUrl = (
  articleHtml: HtmlString,
): UrlString | undefined => {
  // <div itemProp="image" itemType="https://schema.org/ImageObject">
  //   <meta itemProp="url" content="https://..."/>
  // </div>

  const articleDocument = JSDOM.fragment(articleHtml);
  const imageElement = articleDocument.querySelector(
    'div[itemProp="image"][itemType="https://schema.org/ImageObject"] meta[itemProp="url"]',
  );
  const imageUrl = imageElement?.getAttribute("content");
  if (imageUrl === null || imageUrl === undefined) {
    return undefined;
  }

  return imageUrl.trim() as UrlString;
};
