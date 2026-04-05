import { fetchUrlsPostedOnBluesky } from "../fetchUrlsPostedOnBluesky/fetchUrlsPostedOnBluesky";
import { drdkProductionAgent } from "../shared/drdkProductionAgent";
import { setDifference } from "../shared/setDifference";
import { drdkFeedSize } from "./drdkFeedSize";
import { fetchTitlesAndUrlsFromRssFeed } from "./fetchTitlesAndUrlsFromRssFeed";
import { postLink } from "./postLink";

const postNewDrdkLinks = async () => {
  const postedUrls = await fetchUrlsPostedOnBluesky(
    drdkProductionAgent,
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
    await postLink(drdkProductionAgent, titleAndUrl.title, titleAndUrl.url);
  }

  console.log(`Posted ${newTitlesAndUrls.length} new URLs.`);
};

try {
  await postNewDrdkLinks();
} catch (error) {
  console.error(error);
  process.exit(1);
}
