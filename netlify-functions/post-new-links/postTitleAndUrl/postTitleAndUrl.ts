import { AtpAgent } from "@atproto/api";
import { detectFacets } from "./detectFacets";

export const postTitleAndUrl = async (
  agent: AtpAgent,
  title: string,
  url: string
) => {
  const strippedUrl = url.replace(/https?:\/\//, "");
  const text = `${title}\n\n${strippedUrl}`;
  const facets = detectFacets(text);
  const post = {
    facets: facets,
    langs: ["da-DK"],
    text: text,
  };

  // console.dir(post, { depth: undefined });
  await agent.post(post);
};
