import { AtpAgent } from "@atproto/api";

export const postTitleAndUrl = async (
  agent: AtpAgent,
  title: string,
  url: string
) => {
  const post = {
    embed: {
      $type: "app.bsky.embed.external",
      external: {
        description: "",
        title: title,
        uri: url,
      },
    },
    langs: ["da-DK"],
    text: "",
  };

  await agent.post(post);
};
