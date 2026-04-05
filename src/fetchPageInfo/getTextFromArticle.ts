import { brand } from "../shared/brandedTypes/brand";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { ReadabilityArticle } from "./getReadabilityArticle";

export const getTextFromArticle = (
  article: ReadabilityArticle | undefined,
): PlainTextString | undefined => {
  const text =
    article?.textContent?.trim() === ""
      ? undefined
      : article?.textContent?.trim();

  return brand<PlainTextString>(text);
};
