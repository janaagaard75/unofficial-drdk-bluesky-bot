import { decode } from "html-entities";
import { HtmlString } from "./brandedTypes/HtmlString";
import { PlainTextString } from "./brandedTypes/PlainTextString";
import { brand } from "./brandedTypes/brand";

/** Extract the description from the content of the <meta name="description"> element in htmlDocument. */
export const extractDescription = (htmlPage: HtmlString): PlainTextString => {
  const descriptionMatch =
    /<meta[^>]*name="description"[^>]*content="([^"]*)"/.exec(htmlPage);
  return brand<PlainTextString>(decode(descriptionMatch?.[1] ?? ""));
};
