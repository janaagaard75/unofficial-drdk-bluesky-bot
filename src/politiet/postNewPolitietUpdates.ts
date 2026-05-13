import { fetchUrlsPostedOnBluesky } from "../bluesky/fetchUrlsPostedOnBluesky/fetchUrlsPostedOnBluesky";
import { setDifference } from "../shared/setDifference";
import { fetchUpdatesFromRssFeed } from "./fetchUpdatesFromRssFeed";
import { politietProductionAgent } from "./politietProductionAgent";
import { postUpdate } from "./postUpdate";

const postNewPolitietUpdates = async () => {
  const politietFeedSize = 25;
  const postedUrls = await fetchUrlsPostedOnBluesky(
    politietProductionAgent,
    2 * politietFeedSize,
  );
  console.log(`Fetched ${postedUrls.size} posted URLs.`);

  const updatesFromFeed = await fetchUpdatesFromRssFeed();
  console.log(`Fetched ${updatesFromFeed.length} updates from RSS feed.`);

  const urlsFromFeed = new Set(updatesFromFeed.map((update) => update.url));
  const newUrls = setDifference(urlsFromFeed, postedUrls);

  const newUpdates = updatesFromFeed.filter((update) =>
    newUrls.has(update.url),
  );

  for (const update of newUpdates) {
    await postUpdate(politietProductionAgent, update);
  }

  console.log(`Posted ${newUpdates.length} new updates.`);
};

try {
  await postNewPolitietUpdates();
} catch (error) {
  console.error(error);
  process.exit(1);
}
