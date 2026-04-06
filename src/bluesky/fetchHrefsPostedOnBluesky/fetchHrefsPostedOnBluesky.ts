import { AtpAgent, FacetLink } from "@atproto/api";
import { BlueskyPostRecord } from "./BlueskyPostRecord";

export const fetchHrefsPostedOnBluesky = async (
  agent: AtpAgent,
  numberOfPostsToFetch: number,
): Promise<Set<string>> => {
  const timeline = await agent.getTimeline({
    limit: numberOfPostsToFetch,
  });

  const feedViewPosts = timeline.data.feed;

  const postedHrefs = feedViewPosts
    .map((feedViewPost) => feedViewPost.post.record as BlueskyPostRecord)
    .flatMap((record) => {
      if (record.embed?.external?.uri !== undefined) {
        return [record.embed.external.uri];
      }

      if (record.facets !== undefined) {
        return record.facets.flatMap((facet) =>
          facet.features
            .filter(
              (feature) => feature.$type === "app.bsky.richtext.facet#link",
            )
            .map((link) => (link as FacetLink).uri),
        );
      }

      return [];
    });

  return new Set(postedHrefs);
};
