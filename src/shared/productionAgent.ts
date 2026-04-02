import { AtpAgent } from "@atproto/api";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";

const username = getEnvironmentVariableValue("BLUESKY_USERNAME");
const password = getEnvironmentVariableValue("BLUESKY_PASSWORD");

export const productionAgent = new AtpAgent({
  service: "https://bsky.social",
});
await productionAgent.login({
  identifier: username,
  password: password,
});

console.log(`Signed in to Bluesky as ${username}.`);
