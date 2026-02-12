/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { HtmlArticleString } from "./HtmlArticleString";
import { HtmlPageString } from "./HtmlPageString";
import { HtmlTitleString } from "./HtmlTitleString";
import { PlainTextString } from "./PlainTextString";
import { UrlString } from "./UrlString";

type BrandedType =
  | HtmlArticleString
  | HtmlPageString
  | HtmlTitleString
  | PlainTextString
  | UrlString;

export function brand<T extends BrandedType>(value: string): T;
export function brand<T extends BrandedType>(
  value: string | undefined,
): T | undefined;
export function brand<T extends BrandedType>(
  value: string | undefined,
): T | undefined {
  return value as T | undefined;
}
