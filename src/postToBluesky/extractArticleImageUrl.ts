import { JSDOM } from "jsdom";

export const extractArticleImageUrl = (
  articleHtml: string,
): string | undefined => {
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

  return imageUrl.trim();
};
