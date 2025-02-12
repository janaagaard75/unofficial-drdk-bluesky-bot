import { AtpAgent } from "@atproto/api";
import { getEnvironmentVariableValue } from "./netlify-functions/post-new-links/getEnvironmentVariableValue";
import { downloadImage } from "./netlify-functions/post-new-links/postToBluesky/downloadImage";
import { fetchDescriptionAndImageUrl } from "./netlify-functions/post-new-links/postToBluesky/fetchDescriptionAndImageUrl";
import { uploadImage } from "./netlify-functions/post-new-links/postToBluesky/uploadImage";

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
    const descriptionAndImageUrl = await fetchDescriptionAndImageUrl(url);
    const downloadedImage = await downloadImage(
      descriptionAndImageUrl?.imageUrl,
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
