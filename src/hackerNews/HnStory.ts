import { HtmlString } from "../shared/brandedTypes/HtmlString";
import { UrlString } from "../shared/brandedTypes/UrlString";

export interface HnStory {
  kids: ReadonlyArray<number> | undefined;
  title: HtmlString;
  url: UrlString;
}
