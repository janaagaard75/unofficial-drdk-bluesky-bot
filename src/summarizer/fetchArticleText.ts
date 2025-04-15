import { JSDOM } from "jsdom";

export const fetchArticleText = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const pageHtml = await response.text();
  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/;
  const articleMatch = articleRegex.exec(pageHtml);

  if (articleMatch === null || articleMatch[1] === undefined) {
    return "";
  }

  const cleanedArticleHtml = articleMatch[1]
    .trim()
    .replace(/<\/div>/gi, "</div> ")
    .replace(/<\/h([1-6])>/gi, "</h$1> ")
    .replace(/<\/li>/gi, "</li> ")
    .replace(/<\/p>/gi, "</p>\n")
    .replace(/<\/span>/gi, "</span> ")
    .replace(/<\/strong>/gi, "</strong> ")
    .replace(/<\/em>/gi, "</em> ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\n/gi, " ");

  const articleText = (JSDOM.fragment(cleanedArticleHtml).textContent ?? "")
    .replace(/\s{2,}/gi, ". ")
    .replaceAll(":.", ":")
    .replaceAll("..", ".")
    .replace(/^. /, "")
    .trim();

  return articleText;
};
