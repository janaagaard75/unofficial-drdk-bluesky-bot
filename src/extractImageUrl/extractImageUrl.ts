import { JSDOM } from "jsdom";
import { createUrlString } from "../shared/brandedTypes/createUrlString";
import { HtmlArticleString } from "../shared/brandedTypes/HtmlArticleString";
import { UrlString } from "../shared/brandedTypes/UrlString";

/** Extract the image URL from the content of the <meta name="og:image"> element in htmlDocument. */
export const extractImageUrl = (
  articleHtml: HtmlArticleString,
): UrlString | undefined => {
  const articleDocument = JSDOM.fragment(articleHtml);
  const imageElement = articleDocument.querySelector(
    'div[itemProp="image"][itemType="https://schema.org/ImageObject"] meta[itemProp="url"]',
  );
  const rawImageUrl = imageElement?.getAttribute("content");

  if (rawImageUrl === null || rawImageUrl === undefined) {
    return undefined;
  }

  const cropHeight = 627;
  const cropWidth = 1200;
  const imageCrop = `AspectCrop=(${cropWidth},${cropHeight}),xPosition=.5,yPosition=.5;Resize=(${cropWidth},${cropHeight})&impolicy=low`;
  const imageUrl = `${rawImageUrl.substring(0, rawImageUrl.indexOf("?"))}?${imageCrop}`;
  return createUrlString(imageUrl);
};
