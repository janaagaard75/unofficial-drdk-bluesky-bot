import { decode } from "html-entities";
import { HtmlString } from "../shared/HtmlString";
import { PlainTextString } from "../shared/PlainTextString";
import { createPlainTextString } from "../shared/createPlainTextString";

/** Extract the description from the content of the <meta name="description"> element in htmlDocument. */
export const extractDescription = (
  htmlDocument: HtmlString,
): PlainTextString => {
  const descriptionMatch =
    /<meta[^>]*name="description"[^>]*content="([^"]*)"/.exec(htmlDocument);
  return createPlainTextString(decode(descriptionMatch?.[1] ?? ""));
};
