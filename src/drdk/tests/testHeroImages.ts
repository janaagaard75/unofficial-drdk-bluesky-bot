import { downloadImage } from "../../bluesky/postToBluesky/downloadImage";
import { uploadImage } from "../../bluesky/postToBluesky/uploadImage";
import { testAgent } from "../../shared/testAgent";
import { extractHtmlArticle } from "../extractHtmlArticle";
import { extractImageUrl } from "../extractImageUrl/extractImageUrl";
import { fetchHtmlPage } from "../fetchHtmlPage";
import { testUrls } from "./testUrls";

const testHeroImages = async () => {
  for (const url of testUrls) {
    const htmlPage = await fetchHtmlPage(url);
    const htmlArticle = extractHtmlArticle(htmlPage);
    const imageUrl = extractImageUrl(htmlArticle);
    const downloadedImage = await downloadImage(imageUrl);
    const heroImageBlob = await uploadImage(testAgent, downloadedImage);

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

    await testAgent.post(post);
  }
};

await testHeroImages();
