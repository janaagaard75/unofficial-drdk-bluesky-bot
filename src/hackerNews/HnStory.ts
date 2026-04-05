import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { UrlString } from "../shared/brandedTypes/UrlString";

export interface HnStory {
  kids: ReadonlyArray<number> | undefined;
  title: PlainTextString; // The docs list this as HTML. https://github.com/hackernews/api?tab=readme-ov-file#items
  url: UrlString;
}
