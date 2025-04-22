import { HtmlString } from "../shared/HtmlString";
import { UrlString } from "../shared/UrlString";

export const fetchArticleHtml = async (url: UrlString): Promise<HtmlString> => {
  const response = await fetch(url);
  const pageHtml = await response.text();
  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/;
  const articleMatch = articleRegex.exec(pageHtml);

  if (articleMatch === null || articleMatch[1] === undefined) {
    return "" as HtmlString;
  }

  return articleMatch[1] as HtmlString;
};
