import { createHtmlArticleString } from "../shared/createHtmlArticleString";
import { HtmlArticleString } from "../shared/HtmlArticleString";
import { HtmlPageString } from "../shared/HtmlPageString";

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
