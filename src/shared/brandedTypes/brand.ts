/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { Branded } from "./Branded";

export function brand<T extends Branded<string, string>>(value: string): T;
export function brand<T extends Branded<string, string>>(
  value: string | undefined,
): T | undefined;
export function brand<T extends Branded<string, string>>(
  value: string | undefined,
): T | undefined {
  return value as T | undefined;
}
