import { brand } from "../shared/brandedTypes/brand";
import { HtmlArticleString } from "../shared/brandedTypes/HtmlArticleString";
import { HtmlPageString } from "../shared/brandedTypes/HtmlPageString";

export const extractHtmlArticle = (
  htmlPage: HtmlPageString,
): HtmlArticleString => {
  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/;
  const articleMatch = articleRegex.exec(htmlPage);

  if (articleMatch === null || articleMatch[1] === undefined) {
    return brand<HtmlArticleString>("");
  }

  return brand<HtmlArticleString>(articleMatch[1]);
};
