import { AtpAgent } from "@atproto/api";
import { fetchDescriptionAndImages } from "../fetchDescriptionAndImages/fetchDescriptionAndImages";
import { fetchPostedUrlsOnBluesky } from "../fetchPostedUrlsOnBluesky/fetchPostedUrlsOnBluesky";
import { fetchTitlesAndUrlsFromRssFeed } from "../fetchTitlesAndUrlsFromRssFeed";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { extractArticleImageUrl } from "../postNewLinks/extractArticleImageUrl";
import { fetchArticleHtml } from "../postNewLinks/fetchArticleHtml";
import { postToBluesky } from "../postToBluesky/postToBluesky";
import { setDifference } from "../shared/setDifference";
import { summarizeWithGemini } from "../summarize/summarizeWithGemini";

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
      `Fetched ${titlesAndUrlsFromFeed.length} titles and URLs from RSS feed.`,
    );

    const urlsFromFeed = new Set(titlesAndUrlsFromFeed.map((item) => item.url));
    const newUrls = setDifference(urlsFromFeed, postedUrls);

    const newTitlesAndUrls = titlesAndUrlsFromFeed.filter((titleAndUrl) =>
      newUrls.has(titleAndUrl.url),
    );

    for (const titleAndUrl of newTitlesAndUrls) {
      const descriptionAndImageUrl = await fetchDescriptionAndImages(
        titleAndUrl.url,
      );
      const articleHtml = await fetchArticleHtml(titleAndUrl.url);
      const articleImage = extractArticleImageUrl(articleHtml);
      const imageUrl = articleImage ?? descriptionAndImageUrl?.images[0]?.url;
      // const summary = await summarizeWithAzure(articleHtml);
      const summary = await summarizeWithGemini(articleHtml);

      await postToBluesky(
        agent,
        descriptionAndImageUrl?.description,
        imageUrl,
        summary,
        titleAndUrl.title,
        titleAndUrl.url,
      );
    }

    console.log(`Posted ${newTitlesAndUrls.length} new URLs.`);
  } catch (error) {
    console.error(error);
  }
};

await main();
