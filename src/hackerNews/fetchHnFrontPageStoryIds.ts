export const fetchHnFrontPageStoryIds = async (): Promise<
  ReadonlyArray<number>
> => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
  );
  const storyIds = (await response.json()) as ReadonlyArray<number>;

  const numberOfStoriesOnTheFrontPage = 30;
  const frontPageStoryIds = storyIds.slice(0, numberOfStoriesOnTheFrontPage);

  return frontPageStoryIds;
};
