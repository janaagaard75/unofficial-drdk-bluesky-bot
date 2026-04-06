import { brand } from "../shared/brandedTypes/brand";
import { HtmlString } from "../shared/brandedTypes/HtmlString";

export const fetchHtmlPage = async (url: URL): Promise<HtmlString> => {
  const response = await fetch(url);
  const pageHtml = await response.text();
  return brand<HtmlString>(pageHtml);
};
