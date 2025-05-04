import { decode } from "html-entities";
import { createPlainTextString } from "../shared/brandedTypes/createPlainTextString";
import { HtmlPageString } from "../shared/brandedTypes/HtmlPageString";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";

/** Extract the description from the content of the <meta name="description"> element in htmlDocument. */
export const extractDescription = (
  htmlPage: HtmlPageString,
): PlainTextString => {
  const descriptionMatch =
    /<meta[^>]*name="description"[^>]*content="([^"]*)"/.exec(htmlPage);
  return createPlainTextString(decode(descriptionMatch?.[1] ?? ""));
};
