import { AtpAgent } from "@atproto/api";
import { Record } from "./Record";
import { isDefined } from "./isDefined";

export const fetchPostedUrlsOnBluesky = async (
  agent: AtpAgent
): Promise<Set<string>> => {
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
    .flatMap((record) => {
      if (record.embed !== undefined) {
        return [record.embed.external.uri];
      }

      if (record.facets !== undefined) {
        return record.facets.flatMap((facet) =>
          facet.features.flatMap((feature) => feature.uri as string)
        );
      }

      return [];
    });

  console.log("Posted URLs:", JSON.stringify(postedUrls, undefined, 2));

  // return new Set(postedUrls);
  return new Set("");
};
