import { createHtmlPageString } from "../shared/brandedTypes/createHtmlPageString";
import { HtmlPageString } from "../shared/brandedTypes/HtmlPageString";
import { UrlString } from "../shared/brandedTypes/UrlString";

export const fetchHtmlPage = async (
  url: UrlString,
): Promise<HtmlPageString> => {
  const response = await fetch(url);
  const pageHtml = await response.text();
  return createHtmlPageString(pageHtml);
};
