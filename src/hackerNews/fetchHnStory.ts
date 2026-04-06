import { brand } from "../shared/brandedTypes/brand";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
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
    score: rawStory.score ?? 0,
    title: brand<PlainTextString>(rawStory.title),
    url: new URL(rawStory.url),
  };
};
