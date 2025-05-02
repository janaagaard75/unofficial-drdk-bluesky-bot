import { createUrlString } from "../shared/createUrlString";
import { HtmlString } from "../shared/HtmlString";
import { UrlString } from "../shared/UrlString";

/** Extract the image URL from the content of the <meta name="og:image"> element in htmlDocument. */
export const extractImageUrl = (
  htmlDocument: HtmlString,
): UrlString | undefined => {
  const imageMatch = /<meta[^>]*property="og:image"[^>]*content="([^"]*)"/.exec(
    htmlDocument,
  );

  if (imageMatch === null) {
    return undefined;
  }

  if (imageMatch[1] === undefined) {
    return undefined;
  }

  return createUrlString(imageMatch[1]);
};
