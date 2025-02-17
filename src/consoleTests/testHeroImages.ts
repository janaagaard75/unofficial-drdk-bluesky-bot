import { AtpAgent } from "@atproto/api";
import { fetchDescriptionAndImages } from "../fetchDescriptionAndImages/fetchDescriptionAndImages";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { downloadImage } from "../postToBluesky/downloadImage";
import { uploadImage } from "../postToBluesky/uploadImage";

async function main() {
  const testUrls = [
    "https://www.dr.dk/nyheder/seneste/svensk-politi-efterlyser-video-og-billeder-i-forbindelse-med-efterforskning-af",
    "https://www.dr.dk/nyheder/udland/eu-kommissionen-oensker-opgoer-med-online-platforme-som-temu-told-og-afgifter-kan",
    "https://www.dr.dk/nyheder/indland/regeringen-vil-nedlaegge-jobcentrene-en-stor-og-omfattende-oevelse",
    "https://www.dr.dk/sporten/seneste-sport/esbjerg-og-odense-buldrer-videre-i-kvindeligaen",
    "https://www.dr.dk/nyheder/seneste/sverige-flager-paa-halv-efter-skoleskyderi",
  ];

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
}

main();
