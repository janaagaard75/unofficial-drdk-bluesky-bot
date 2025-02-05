import { AtpAgent } from "@atproto/api";
import { extract } from "@extractus/article-extractor";
import { getEnvironmentVariableValue } from "./netlify-functions/post-new-links/getEnvironmentVariableValue";

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
    const article = await extract(url);

    if (article?.image !== undefined) {
      const downloadedImage = await fetch(article.image);
      const imageBuffer = await downloadedImage.arrayBuffer();
      const uploadedImage = await agent.uploadBlob(new Uint8Array(imageBuffer));

      const post = {
        embed: {
          $type: "app.bsky.embed.external",
          external: {
            description: "",
            title: "Title",
            uri: url,
            thumb: uploadedImage.data.blob,
          },
        },
        langs: ["da-DK"],
        text: "",
      };

      await agent.post(post);
    }
  }
}

main();
