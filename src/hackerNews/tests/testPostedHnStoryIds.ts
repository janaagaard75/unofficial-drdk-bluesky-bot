import { testAgent } from "../../shared/testAgent";
import { fetchPostedHnStoryIds } from "../fetchPostedHnStoryIds";

const storyIds = await fetchPostedHnStoryIds(testAgent);

console.log("Story IDs: ", [...storyIds].join(", "));
