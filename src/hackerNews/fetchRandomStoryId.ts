import { fetchHnFrontPageStoryIds } from "./fetchHnFrontPageStoryIds";

export const fetchRandomStoryId = async (): Promise<number> => {
  const arg = process.argv[2];
  const parsedArg = Number(arg);
  if (Number.isInteger(parsedArg) && parsedArg >= 1) {
    return parsedArg;
  }

  const allStoryIds = await fetchHnFrontPageStoryIds();
  const randomStoryId =
    allStoryIds[Math.floor(Math.random() * allStoryIds.length)];

  if (randomStoryId === undefined) {
    throw new Error(
      `Something went wrong getting a random story ID. Number of story IDs: ${allStoryIds.length}`,
    );
  }

  return randomStoryId;
};
