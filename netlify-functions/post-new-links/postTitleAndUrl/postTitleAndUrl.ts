import { AtpAgent } from "@atproto/api";
import { getHeroImageBlob } from "./getHeroImageBlob";

export const postTitleAndUrl = async (
  agent: AtpAgent,
  title: string,
  url: string
) => {
  const heroImageBlob = await getHeroImageBlob(agent, url);

  const post = {
    embed: {
      $type: "app.bsky.embed.external",
      external: {
        description: "",
        thumb: heroImageBlob,
        title: title,
        uri: url,
      },
    },
    langs: ["da-DK"],
    text: "",
  };

  await agent.post(post);
};
