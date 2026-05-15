import { PlainTextString } from "../shared/brandedTypes/PlainTextString";

export interface PolitietUpdate {
  description: PlainTextString;
  imageUrl: URL | undefined;
  title: PlainTextString;
  url: URL;
}
