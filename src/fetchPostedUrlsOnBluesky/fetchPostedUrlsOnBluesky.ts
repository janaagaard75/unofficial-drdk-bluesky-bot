import { AtpAgent, FacetLink } from "@atproto/api";
import { Record } from "./Record";

export const fetchPostedUrlsOnBluesky = async (
  agent: AtpAgent,
): Promise<Set<string>> => {
  const feedSize = 20;
  const timeline = await agent.getTimeline({
    limit: 2 * feedSize,
  });

  const feedViewPosts = timeline.data.feed;

  const postedUrls = feedViewPosts
    .map((feedViewPost) => feedViewPost.post.record as Record)
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

  return new Set(postedUrls);
};
