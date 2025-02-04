import { AtpAgent } from "@atproto/api";
import { getEnvironmentVariableValue } from "./netlify-functions/post-new-links/getEnvironmentVariableValue";

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

  const post = {
    embed: {
      $type: "app.bsky.embed.external",
      external: {
        description: "Hello World",
        // thumb: {
        //   $type: "blob",
        //   mimeType: "image/png",
        //   ref: {
        //     $link:
        //       "bafkreiash5eihfku2jg4skhyh5kes7j5d5fd6xxloaytdywcvb3r3zrzhu",
        //   },
        //   size: 23527,
        // },
        title: "External embed",
        uri: "https://example.com",
      },
    },
    langs: ["da-DK"],
    text: "",
  };

  // console.dir(post, { depth: undefined });
  await agent.post(post);

  console.log("Done.");

  return new Response("Posted Hello World to Bluesky.", {
    status: 200,
  });
}

main();
