import { PlainTextString } from "../shared/brandedTypes/PlainTextString";

export interface HnStory {
  id: number;
  kids: ReadonlyArray<number> | undefined;
  score: number;
  title: PlainTextString; // The docs list this as HTML. https://github.com/hackernews/api?tab=readme-ov-file#items
  url: URL;
}
