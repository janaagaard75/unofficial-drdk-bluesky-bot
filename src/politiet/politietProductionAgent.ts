import { AtpAgent } from "@atproto/api";
import { getEnvironmentVariableValue } from "../shared/getEnvironmentVariableValue";

const username = getEnvironmentVariableValue("BLUESKY_POLUP_ALL_USERNAME");
const password = getEnvironmentVariableValue("BLUESKY_POLUP_ALL_PASSWORD");

export const politietProductionAgent = new AtpAgent({
  service: "https://bsky.social",
});
await politietProductionAgent.login({
  identifier: username,
  password: password,
});

console.log(`Signed in to Bluesky as ${username}.`);
