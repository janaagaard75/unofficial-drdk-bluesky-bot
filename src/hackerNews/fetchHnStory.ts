import { brand } from "../shared/brandedTypes/brand";
import { HtmlTitleString } from "../shared/brandedTypes/HtmlTitleString";
import { UrlString } from "../shared/brandedTypes/UrlString";

interface HnStory {
  title: HtmlTitleString;
  url: UrlString;
}

interface RawHnStory {
  by: string | undefined;
  dead: boolean | undefined;
  delete: boolean | undefined;
  descendants: number | undefined;
  id: number;
  kids: ReadonlyArray<number> | undefined;
  parent: number | undefined;
  parts: ReadonlyArray<number> | undefined;
  poll: number | undefined;
  score: number | undefined;
  text: string | undefined;
  time: number | undefined;
  title: string | undefined;
  type: "comment" | "job" | "poll" | "pollopt" | "story" | undefined;
  url: string | undefined;
}

export const fetchHnStory = async (
  storyId: number,
): Promise<HnStory | undefined> => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
  );
  const storyData = (await response.json()) as RawHnStory;

  if (
    storyData.dead === true
    || storyData.delete === true
    || storyData.title === undefined
    || storyData.url === undefined
  ) {
    return undefined;
  }

  return {
    title: brand<HtmlTitleString>(storyData.title),
    url: brand<UrlString>(storyData.url),
  };
};
