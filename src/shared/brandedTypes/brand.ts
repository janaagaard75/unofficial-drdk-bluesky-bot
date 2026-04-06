/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { HtmlString } from "./HtmlString";
import { PlainTextString } from "./PlainTextString";

type BrandedType = HtmlString | PlainTextString;

export function brand<T extends BrandedType>(value: string): T;
export function brand<T extends BrandedType>(
  value: string | undefined,
): T | undefined;
export function brand<T extends BrandedType>(
  value: string | undefined,
): T | undefined {
  return value as T | undefined;
}
