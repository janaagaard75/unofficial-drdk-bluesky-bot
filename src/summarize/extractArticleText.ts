import { JSDOM } from "jsdom";
import { HtmlString } from "../shared/brandedTypes/HtmlString";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { brand } from "../shared/brandedTypes/brand";

export const extractArticleText = (
  articleHtml: HtmlString,
): PlainTextString => {
  if (articleHtml === "") {
    return brand<PlainTextString>("");
  }

  const cleanedArticleHtml = articleHtml
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

  const articleText = JSDOM.fragment(cleanedArticleHtml)
    .textContent.replace(/\s{2,}/gi, ". ")
    .replaceAll(":.", ":")
    .replaceAll("..", ".")
    .replace(/^. /, "")
    .trim();

  return brand<PlainTextString>(articleText);
};
