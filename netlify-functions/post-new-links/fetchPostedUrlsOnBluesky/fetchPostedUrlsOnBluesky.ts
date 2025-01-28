import { AtpAgent } from "@atproto/api";
import { Record } from "./Record";

export const fetchPostedUrlsOnBluesky = async (
  agent: AtpAgent
): Promise<Set<string>> => {
  await agent.login({
    identifier: process.env["BLUESKY_USERNAME"]!,
    password: process.env["BLUESKY_PASSWORD"]!,
  });

  const feedSize = 20;
  const timeline = await agent.getTimeline({
    limit: 2 * feedSize,
  });

  const feedViewPosts = timeline.data.feed;

  const postedUrls = feedViewPosts
    // Filter out posts that aren't from the bot. Don't know why this is necessary.
    .filter(
      (feedViewPost) =>
        feedViewPost.post.author.did === "did:plc:dlxnthdtaz7qdflht47dpst6"
    )
    .map((feedViewPost) => feedViewPost.post.record as Record)
    .filter(isDefined)
    .flatMap((record) => record.facets)
    .flatMap((facet) => facet.features)
    .filter((feature) => feature.$type === "app.bsky.richtext.facet#link")
    .map((link) => link.uri as string);

  return new Set(postedUrls);
};

function isDefined(value: any, index: number, array: any[]): value is any {
  throw new Error("Function not implemented.");
}
