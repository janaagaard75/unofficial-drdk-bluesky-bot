import { isDefined } from "../shared/isDefined";
import { NextData } from "./NextData";

export const extractImageUrls = (articleHtml: string): Array<string> => {
  const nextData = articleHtml.match(
    /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/,
  )?.[1];

  console.log("nextData: ", nextData);

  if (nextData === undefined) {
    return [];
  }

  const images = (
    JSON.parse(nextData) as NextData
  ).props?.pageProps?.viewProps?.resource?.head
    ?.find((headElement) => headElement.type === "ImageCollectionComponent")
    ?.images.map((imageElement) => imageElement.default?.url)
    .filter(isDefined);

  return images ?? [];
};
