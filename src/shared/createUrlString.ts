import { UrlString } from "./UrlString";

export const createUrlString = (value: string): UrlString => {
  // Validate that value is a valid URL.
  new URL(value);
  return value as UrlString;
};
