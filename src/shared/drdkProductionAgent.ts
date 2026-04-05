import { AtpAgent } from "@atproto/api";
import { getEnvironmentVariableValue } from "./getEnvironmentVariableValue";

const username = getEnvironmentVariableValue("BLUESKY_DRDK_USERNAME");
const password = getEnvironmentVariableValue("BLUESKY_DRDK_PASSWORD");

export const drdkProductionAgent = new AtpAgent({
  service: "https://bsky.social",
});
await drdkProductionAgent.login({
  identifier: username,
  password: password,
});

console.log(`Signed in to Bluesky as ${username}.`);
