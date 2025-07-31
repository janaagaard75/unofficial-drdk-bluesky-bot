import { AtpAgent } from "@atproto/api";
import { fetchPostedUrlsOnBluesky } from "../fetchPostedUrlsOnBluesky/fetchPostedUrlsOnBluesky";
import { fetchTitlesAndUrlsFromRssFeed } from "../fetchTitlesAndUrlsFromRssFeed";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { setDifference } from "../shared/setDifference";
import { postLink } from "./postLink";

const postNewLinks = async () => {
  try {
    const username = getEnvironmentVariableValue("BLUESKY_USERNAME");
    const password = getEnvironmentVariableValue("BLUESKY_PASSWORD");
    const agent = new AtpAgent({
      service: "https://bsky.social",
    });
    await agent.login({
      identifier: username,
      password: password,
    });
    console.log(`Signed in to Bluesky as ${username}.`);

    // This assumes that the bot isn't following anyone.
    const mostRecentPost = await agent.getTimeline({ limit: 1 });
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const hasVeryRecentPost = mostRecentPost.data.feed.some((post) => {
      const postDate = new Date(post.post.indexedAt);
      return postDate > twoMinutesAgo && post.post.author.handle === username;
    });

    if (hasVeryRecentPost) {
      console.log(
        "Found posts from the last 2 minutes. Another instance likely completed. Exiting.",
      );
      return;
    }

    const postedUrls = await fetchPostedUrlsOnBluesky(agent);
    console.log(`Fetched ${postedUrls.size} posted URLs.`);

    const titlesAndUrlsFromFeed = await fetchTitlesAndUrlsFromRssFeed();
    console.log(
      `Fetched ${titlesAndUrlsFromFeed.length} titles and URLs from RSS feed.`,
    );

    const urlsFromFeed = new Set(titlesAndUrlsFromFeed.map((item) => item.url));
    const newUrls = setDifference(urlsFromFeed, postedUrls);

    const newTitlesAndUrls = titlesAndUrlsFromFeed.filter((titleAndUrl) =>
      newUrls.has(titleAndUrl.url),
    );

    for (const titleAndUrl of newTitlesAndUrls) {
      await postLink(agent, titleAndUrl.title, titleAndUrl.url);
    }

    console.log(`Posted ${newTitlesAndUrls.length} new URLs.`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void postNewLinks();
