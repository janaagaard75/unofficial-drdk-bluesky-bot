import { decode } from "html-entities";

/** Extract the description from the content of the <meta name="description"> element in htmlDocument. */
export const extractDescription = (htmlDocument: string): string => {
  const descriptionMatch =
    /<meta[^>]*name="description"[^>]*content="([^"]*)"/.exec(htmlDocument);
  return decode(descriptionMatch?.[1] ?? "");
};
