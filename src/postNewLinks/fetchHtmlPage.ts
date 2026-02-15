import { brand } from "../shared/brandedTypes/brand";
import { HtmlString } from "../shared/brandedTypes/HtmlString";
import { UrlString } from "../shared/brandedTypes/UrlString";

export const fetchHtmlPage = async (url: UrlString): Promise<HtmlString> => {
  const response = await fetch(url);
  const pageHtml = await response.text();
  return brand<HtmlString>(pageHtml);
};
