import { HtmlString } from "./HtmlString";

export const createHtmlString = (value: string): HtmlString => {
  return value as HtmlString;
};
