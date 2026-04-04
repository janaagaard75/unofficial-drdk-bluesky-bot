import { testAgent } from "../shared/testAgent";
import { fetchPostedNhStoryIds } from "./fetchPostedHnStoryIds";

const storyIds = await fetchPostedNhStoryIds(testAgent);

console.log("Story IDs: ", [...storyIds].join(", "));
