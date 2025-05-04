import { createHtmlArticleString } from "../shared/brandedTypes/createHtmlArticleString";
import { HtmlArticleString } from "../shared/brandedTypes/HtmlArticleString";
import { HtmlPageString } from "../shared/brandedTypes/HtmlPageString";

export const extractHtmlArticle = (
  htmlPage: HtmlPageString,
): HtmlArticleString => {
  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/;
  const articleMatch = articleRegex.exec(htmlPage);

  if (articleMatch === null || articleMatch[1] === undefined) {
    return createHtmlArticleString("");
  }

  return createHtmlArticleString(articleMatch[1]);
};
