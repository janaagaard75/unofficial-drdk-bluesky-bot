import { fetchTitlesAndUrlsFromRssFeed } from "../../fetchTitlesAndUrlsFromRssFeed";
import { fetchUrlsPostedOnBluesky } from "../../fetchUrlsPostedOnBluesky/fetchUrlsPostedOnBluesky";
import { postLink } from "../../postLink/postLink";
import { setDifference } from "../../shared/setDifference";
import { testAgent } from "../../shared/testAgent";
import { drdkFeedSize } from "../drdkFeedSize";

const testPostNewLinks = async () => {
  try {
    const postedUrls = await fetchUrlsPostedOnBluesky(
      testAgent,
      2 * drdkFeedSize,
    );
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
      await postLink(testAgent, titleAndUrl.title, titleAndUrl.url);
    }

    console.log(`Posted ${newTitlesAndUrls.length} new URLs.`);
  } catch (error) {
    console.error(error);
  }
};

await testPostNewLinks();
