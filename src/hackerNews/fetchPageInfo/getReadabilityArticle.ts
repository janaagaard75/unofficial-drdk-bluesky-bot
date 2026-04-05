import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export type ReadabilityArticle = Exclude<
  ReturnType<Readability["parse"]>,
  null
>;

export const getReadabilityArticle = (
  dom: JSDOM,
): ReadabilityArticle | undefined => {
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  return article ?? undefined;
};
