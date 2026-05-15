import { hnFeedSize } from "./hnFeedSize";

export const fetchHnFrontPageStoryIds = async (): Promise<
  ReadonlyArray<number>
> => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
  );
  const storyIds = (await response.json()) as ReadonlyArray<number>;

  const frontPageStoryIds = storyIds.slice(0, hnFeedSize);

  return frontPageStoryIds;
};
