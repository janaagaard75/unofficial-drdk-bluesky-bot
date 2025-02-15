import { isDefined } from "../shared/isDefined";
import { NextData } from "./NextData";

export const extractImageDescriptionsAndUrls = (
  articleHtml: string,
): Array<{
  description: string | undefined;
  url: string;
}> => {
  const nextData = articleHtml.match(
    /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/,
  )?.[1];

  if (nextData === undefined) {
    return [];
  }

  const descriptionsAndUrls = (
    JSON.parse(nextData) as NextData
  ).props?.pageProps?.viewProps?.resource?.head
    ?.find((headElement) => headElement.type === "ImageCollectionComponent")
    ?.images.map((imageElement) => imageElement.default)
    .filter(isDefined)
    .map((definedImageElement) => {
      if (definedImageElement.url === undefined) {
        return undefined;
      }

      return {
        description: definedImageElement.description,
        url: definedImageElement.url,
      };
    })
    .filter(isDefined);

  if (descriptionsAndUrls === undefined) {
    return [];
  }

  return descriptionsAndUrls;
};
