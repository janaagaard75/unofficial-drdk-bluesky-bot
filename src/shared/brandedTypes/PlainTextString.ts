import { Branded } from "./Branded";
import { brand } from "./brand";

export type PlainTextString = Branded<string, "PlainTextString">;

export const PlainTextString = {
  Empty: brand<PlainTextString>(""),
};
