import { fetchHrefsPostedOnBluesky } from "../../bluesky/fetchHrefsPostedOnBluesky/fetchHrefsPostedOnBluesky";
import { setDifference } from "../../shared/setDifference";
import { testAgent } from "../../shared/testAgent";
import { drdkFeedSize } from "../drdkFeedSize";
import { fetchTitlesAndUrlsFromRssFeed } from "../fetchTitlesAndUrlsFromRssFeed";
import { postLink } from "../postLink";

const testPostNewLinks = async () => {
  try {
    const postedUrls = await fetchHrefsPostedOnBluesky(
      testAgent,
      2 * drdkFeedSize,
    );
    console.log(`Fetched ${postedUrls.size} posted URLs.`);

    const titlesAndUrlsFromFeed = await fetchTitlesAndUrlsFromRssFeed();
    console.log(
      `Fetched ${titlesAndUrlsFromFeed.length} titles and URLs from RSS feed.`,
    );

    const hrefsFromFeed = new Set(
      titlesAndUrlsFromFeed.map((item) => item.url.href),
    );
    const newHrefs = setDifference(hrefsFromFeed, postedUrls);

    const newTitlesAndUrls = titlesAndUrlsFromFeed.filter((titleAndUrl) =>
      newHrefs.has(titleAndUrl.url.href),
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
