import { AtpAgent } from "@atproto/api";
import { Context } from "@netlify/functions";
import { getEnvironmentVariableValue } from "../post-new-links/getEnvironmentVariableValue";

export default async (_request: Request, _context: Context) => {
  try {
    const agent = new AtpAgent({
      service: "https://bsky.social",
    });
    const username = getEnvironmentVariableValue("BLUESKY_TEST_USERNAME");
    const password = getEnvironmentVariableValue("BLUESKY_TEST_PASSWORD");
    await agent.login({
      identifier: username,
      password: password,
    });

    const post = {
      embed: {
        $type: "app.bsky.embed.external",
        external: {
          description: "See what's next.",
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
      text: "Hello World!",
    };

    // console.dir(post, { depth: undefined });
    await agent.post(post);

    return new Response("Posted Hello World to Bluesky.", {
      status: 200,
    });
  } catch (error) {
    return new Response(error?.toString(), {
      status: 500,
    });
  }
};
