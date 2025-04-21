import { AtpAgent } from "@atproto/api";
import { fetchDescriptionAndImages } from "../fetchDescriptionAndImages/fetchDescriptionAndImages";
import { fetchPostedUrlsOnBluesky } from "../fetchPostedUrlsOnBluesky/fetchPostedUrlsOnBluesky";
import { fetchTitlesAndUrlsFromRssFeed } from "../fetchTitlesAndUrlsFromRssFeed";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { postToBluesky } from "../postToBluesky/postToBluesky";
import { setDifference } from "../shared/setDifference";
import { summarizeWithAzure } from "../summarize/summarizeWithAzure";
import { extractArticleImageUrl } from "./extractArticleImageUrl";
import { fetchArticleHtml } from "./fetchArticleHtml";

export const postNewLinks = async (request: Request) => {
  const { next_run } = (await request.json()) as { next_run: string };
  console.log(`Triggered. Next invocation at: ${next_run}.`);

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
      const descriptionAndImageUrl = await fetchDescriptionAndImages(
        titleAndUrl.url,
      );
      const articleHtml = await fetchArticleHtml(titleAndUrl.url);
      const articleImage = extractArticleImageUrl(articleHtml);
      const imageUrl = articleImage ?? descriptionAndImageUrl?.images[0]?.url;
      const summary = await summarizeWithAzure(articleHtml);

      await postToBluesky(
        agent,
        descriptionAndImageUrl?.description ?? "",
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
