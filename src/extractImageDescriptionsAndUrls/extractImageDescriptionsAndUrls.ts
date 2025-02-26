import { extractImageUrl } from "./extractImageUrl";
import { NextData } from "./NextData";

export const extractImageDescriptionsAndUrls = (
  articleHtml: string,
): Array<{
  description: string | undefined;
  url: string;
}> => {
  const singleImageUrl = extractImageUrl(articleHtml);

  const nextData =
    /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/.exec(
      articleHtml,
    )?.[1];

  if (nextData === undefined) {
    if (singleImageUrl === undefined) {
      return [];
    }

    return [
      {
        description: undefined,
        url: singleImageUrl,
      },
    ];
  }

  const descriptionsAndUrls = (
    JSON.parse(nextData) as NextData
  ).props?.pageProps?.viewProps?.resource?.head
    ?.find((headElement) => headElement.type === "ImageCollectionComponent")
    ?.images.map((imageElement) => imageElement.default)
    .filter((imageElement) => imageElement !== undefined)
    .map((definedImageElement) => {
      if (definedImageElement.url === undefined) {
        return undefined;
      }

      return {
        description: definedImageElement.description,
        url: definedImageElement.url,
      };
    })
    .filter((descriptionAndUrl) => descriptionAndUrl !== undefined);

  if (descriptionsAndUrls === undefined) {
    if (singleImageUrl === undefined) {
      return [];
    }

    return [
      {
        description: undefined,
        url: singleImageUrl,
      },
    ];
  }

  return descriptionsAndUrls;
};
