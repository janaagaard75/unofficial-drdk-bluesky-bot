import { AtpAgent } from "@atproto/api";
import { getEnvironmentVariableValue } from "./getEnvironmentVariableValue";

const username = getEnvironmentVariableValue("BLUESKY_HN_USERNAME");
const password = getEnvironmentVariableValue("BLUESKY_HN_PASSWORD");

export const hnProductionAgent = new AtpAgent({
  service: "https://bsky.social",
});
await hnProductionAgent.login({
  identifier: username,
  password: password,
});

console.log(`Signed in to Bluesky as ${username}.`);
