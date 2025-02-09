import { AtpAgent } from "@atproto/api";
import { fetchPostedUrlsOnBluesky } from "./netlify-functions/post-new-links/fetchPostedUrlsOnBluesky/fetchPostedUrlsOnBluesky";
import { fetchTitlesAndUrlsFromRssFeed } from "./netlify-functions/post-new-links/fetchTitlesAndUrlsFromRssFeed";
import { getEnvironmentVariableValue } from "./netlify-functions/post-new-links/getEnvironmentVariableValue";
import { postToBluesky } from "./netlify-functions/post-new-links/postToBluesky/postToBluesky";
import { setDifference } from "./netlify-functions/post-new-links/setDifference";

const main = async () => {
  try {
    const username = getEnvironmentVariableValue("BLUESKY_TEST_USERNAME");
    const password = getEnvironmentVariableValue("BLUESKY_TEST_PASSWORD");
    const agent = new AtpAgent({
      service: "https://bsky.social",
    });
    await agent.login({
      identifier: username,
      password: password,
    });
    console.log(`Signed in to Bluesky as ${username}.`);

    const postedUrls = await fetchPostedUrlsOnBluesky(agent);
    console.log(`Fetched ${postedUrls.size} posted URLs.`);

    const titlesAndUrlsFromFeed = await fetchTitlesAndUrlsFromRssFeed();
    console.log(
      `Fetched ${titlesAndUrlsFromFeed.length} titles and URLs from RSS feed.`
    );

    const urlsFromFeed = new Set(titlesAndUrlsFromFeed.map((item) => item.url));
    const newUrls = setDifference(urlsFromFeed, postedUrls);

    const newTitlesAndUrls = titlesAndUrlsFromFeed.filter((titleAndUrl) =>
      newUrls.has(titleAndUrl.url)
    );

    for (const titleAndUrl of newTitlesAndUrls) {
      await postToBluesky(agent, titleAndUrl.title, titleAndUrl.url);
    }

    console.log(`Posted ${newTitlesAndUrls.length} new URLs.`);
  } catch (error) {
    console.error(error);
  }
};

main();
