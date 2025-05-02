import { AtpAgent } from "@atproto/api";
import { fetchDescriptionAndImages } from "../fetchDescriptionAndImages/fetchDescriptionAndImages";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
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
    const descriptionAndImageUrl = await fetchDescriptionAndImages(url);
    const downloadedImage = await downloadImage(
      descriptionAndImageUrl?.images[0]?.url,
    );
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
