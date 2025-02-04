import { AtpAgent } from "@atproto/api";
import { getEnvironmentVariableValue } from "./netlify-functions/post-new-links/getEnvironmentVariableValue";
import { postTitleAndUrl } from "./netlify-functions/post-new-links/postTitleAndUrl/postTitleAndUrl";

async function main() {
  console.log("Starting...");

  const agent = new AtpAgent({
    service: "https://bsky.social",
  });
  const username = getEnvironmentVariableValue("BLUESKY_TEST_USERNAME");
  const password = getEnvironmentVariableValue("BLUESKY_TEST_PASSWORD");
  await agent.login({
    identifier: username,
    password: password,
  });

  console.log("Signed in.");

  await postTitleAndUrl(agent, "Hello World 2", "https://example.com");

  console.log("Done.");

  return new Response("Posted Hello World to Bluesky.", {
    status: 200,
  });
}

main();
