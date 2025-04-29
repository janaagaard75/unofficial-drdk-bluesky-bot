import { HtmlString } from "./HtmlString";

export const createHtmlString = (value: string): HtmlString =>
  value as HtmlString;
