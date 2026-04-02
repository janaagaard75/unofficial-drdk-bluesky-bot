import { AtpAgent } from "@atproto/api";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";

const username = getEnvironmentVariableValue("BLUESKY_TEST_USERNAME");
const password = getEnvironmentVariableValue("BLUESKY_TEST_PASSWORD");

export const testAgent = new AtpAgent({
  service: "https://bsky.social",
});
await testAgent.login({
  identifier: username,
  password: password,
});

console.log(`Signed in to Bluesky as ${username}.`);
