import { createPlainTextString } from "../shared/createPlainTextString";
import { createUrlString } from "../shared/createUrlString";
import { HtmlString } from "../shared/HtmlString";
import { PlainTextString } from "../shared/PlainTextString";
import { UrlString } from "../shared/UrlString";
import { extractImageUrl } from "./extractImageUrl";
import { NextData } from "./NextData";

interface DescriptionAndUrl {
  description: PlainTextString;
  url: UrlString;
}

export const extractImageDescriptionsAndUrls = (
  articleHtml: HtmlString,
): ReadonlyArray<DescriptionAndUrl> => {
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
        description: createPlainTextString(""),
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
        description: createPlainTextString(
          definedImageElement.description ?? "",
        ),
        url: createUrlString(definedImageElement.url),
      };
    })
    .filter((descriptionAndUrl) => descriptionAndUrl !== undefined);

  if (descriptionsAndUrls === undefined) {
    if (singleImageUrl === undefined) {
      return [];
    }

    return [
      {
        description: createPlainTextString(""),
        url: singleImageUrl,
      },
    ];
  }

  return descriptionsAndUrls;
};
