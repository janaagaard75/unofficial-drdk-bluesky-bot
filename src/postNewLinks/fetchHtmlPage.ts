import { createHtmlPageString } from "../shared/createHtmlPageString";
import { HtmlPageString } from "../shared/HtmlPageString";
import { UrlString } from "../shared/UrlString";

export const fetchHtmlPage = async (
  url: UrlString,
): Promise<HtmlPageString> => {
  const response = await fetch(url);
  const pageHtml = await response.text();
  return createHtmlPageString(pageHtml);
};
