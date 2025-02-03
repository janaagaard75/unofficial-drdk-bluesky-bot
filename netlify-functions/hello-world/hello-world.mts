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
