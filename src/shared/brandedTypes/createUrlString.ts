import { UrlString } from "./UrlString";

export const createUrlString = (value: string) => {
  // Validate that value is a valid URL.
  new URL(value);
  return value as UrlString;
};
