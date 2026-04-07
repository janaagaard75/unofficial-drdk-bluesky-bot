import { testAgent } from "../../shared/testAgent";
import { getNewHnStoryIds } from "../getNewHnStoryIds";

const newIds = await getNewHnStoryIds(testAgent);

console.log("New story IDs: ", [...newIds].join(", "));
