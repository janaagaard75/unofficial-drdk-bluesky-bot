import { brand } from "../shared/brandedTypes/brand";
import { HtmlString } from "../shared/brandedTypes/HtmlString";
import { UrlString } from "../shared/brandedTypes/UrlString";
import { HnItem } from "./HnItem";
import { HnStory } from "./HnStory";

export const fetchHnStory = async (
  storyId: number,
): Promise<HnStory | undefined> => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
  );
  const rawStory = (await response.json()) as HnItem;

  if (
    rawStory.dead === true
    || rawStory.delete === true
    || rawStory.title === undefined
    || rawStory.url === undefined
  ) {
    return undefined;
  }

  return {
    kids: rawStory.kids,
    title: brand<HtmlString>(rawStory.title),
    url: brand<UrlString>(rawStory.url),
  };
};
