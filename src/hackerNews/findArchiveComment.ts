import { HnItem } from "./HnItem";
import { HnStory } from "./HnStory";

export const findArchiveComment = async (
  story: HnStory,
): Promise<string | undefined> => {
  for (const commentId of story.kids ?? []) {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`,
    );
    const rawComment = (await response.json()) as HnItem;

    if (rawComment.dead === true || rawComment.delete === true) {
      continue;
    }

    if (
      rawComment.text !== undefined
      && matchesArchiveUrl.test(rawComment.text)
    ) {
      return rawComment.text;
    }
  }
};
