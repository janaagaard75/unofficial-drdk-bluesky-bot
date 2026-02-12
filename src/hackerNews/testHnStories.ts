import { fetchHnStory } from "./fetchHnStory";

const storyIds = [46992553, 46995046, 46991240, 46994907, 46990729];

for (const storyId of storyIds) {
  const story = await fetchHnStory(storyId);
  console.dir(story);
}
