import { brand } from "../shared/brandedTypes/brand";
import { HtmlString } from "../shared/brandedTypes/HtmlString";

export const extractHtmlArticle = (htmlPage: HtmlString): HtmlString => {
  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/;
  const articleMatch = articleRegex.exec(htmlPage);

  if (articleMatch === null || articleMatch[1] === undefined) {
    return brand<HtmlString>("");
  }

  return brand<HtmlString>(articleMatch[1]);
};
