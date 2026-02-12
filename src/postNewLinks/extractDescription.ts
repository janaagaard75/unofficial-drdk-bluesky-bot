import { decode } from "html-entities";
import { HtmlPageString } from "../shared/brandedTypes/HtmlPageString";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { brand } from "../shared/brandedTypes/brand";

/** Extract the description from the content of the <meta name="description"> element in htmlDocument. */
export const extractDescription = (
  htmlPage: HtmlPageString,
): PlainTextString => {
  const descriptionMatch =
    /<meta[^>]*name="description"[^>]*content="([^"]*)"/.exec(htmlPage);
  return brand<PlainTextString>(decode(descriptionMatch?.[1] ?? ""));
};
