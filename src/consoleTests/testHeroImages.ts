import { AtpAgent } from "@atproto/api";
import { extractImageUrl } from "../extractImageUrl/extractImageUrl";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { extractHtmlArticle } from "../postNewLinks/extractHtmlArticle";
import { fetchHtmlPage } from "../postNewLinks/fetchHtmlPage";
import { downloadImage } from "../postToBluesky/downloadImage";
import { uploadImage } from "../postToBluesky/uploadImage";
import { testUrls } from "./testUrls";

const testHeroImages = async () => {
  const agent = new AtpAgent({
    service: "https://bsky.social",
  });
  await agent.login({
    identifier: getEnvironmentVariableValue("BLUESKY_TEST_USERNAME"),
    password: getEnvironmentVariableValue("BLUESKY_TEST_PASSWORD"),
  });

  for (const url of testUrls) {
    const htmlPage = await fetchHtmlPage(url);
    const htmlArticle = extractHtmlArticle(htmlPage);
    const imageUrl = extractImageUrl(htmlArticle);
    const downloadedImage = await downloadImage(imageUrl);
    const heroImageBlob = await uploadImage(agent, downloadedImage);

    const post = {
      embed: {
        $type: "app.bsky.embed.external",
        external: {
          description: "",
          thumb: heroImageBlob,
          title: "Title",
          uri: url,
        },
      },
      langs: ["da-DK"],
      text: "",
    };

    await agent.post(post);
  }
};

await testHeroImages();
