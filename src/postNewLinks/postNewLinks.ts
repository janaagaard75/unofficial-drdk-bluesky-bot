import { AtpAgent } from "@atproto/api";
import { fetchPostedUrlsOnBluesky } from "../fetchPostedUrlsOnBluesky/fetchPostedUrlsOnBluesky";
import { fetchTitlesAndUrlsFromRssFeed } from "../fetchTitlesAndUrlsFromRssFeed";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { setDifference } from "../shared/setDifference";
import { sleep } from "../shared/sleep";
import { postLink } from "./postLink";

export const postNewLinks = async (request: Request) => {
  const { next_run } = (await request.json()) as { next_run: string };
  console.log(`Triggered. Next invocation at: ${next_run}.`);

  // Add random delay 0-59 seconds to reduce the risk of simultaneous execution.
  const randomDelay = Math.floor(Math.random() * 60 * 1000); // 0-60 seconds
  console.log(
    `Waiting ${Math.round(randomDelay / 1000)} seconds before proceeding...`,
  );
  await sleep(randomDelay);

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
  }
};
