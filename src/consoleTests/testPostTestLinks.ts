import { AtpAgent } from "@atproto/api";
import { fetchDescriptionAndImages } from "../fetchDescriptionAndImages/fetchDescriptionAndImages";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { extractArticleImageUrl } from "../postNewLinks/extractArticleImageUrl";
import { fetchArticleHtml } from "../postNewLinks/fetchArticleHtml";
import { postToBluesky } from "../postToBluesky/postToBluesky";
import { summarizeWithAzure } from "../summarize/summarizeWithAzure";

const main = async () => {
  const testUrls = [
    "https://www.dr.dk/nyheder/indland/regeringen-vil-nedlaegge-jobcentrene-en-stor-og-omfattende-oevelse",
    "https://www.dr.dk/nyheder/seneste/66-aarig-mand-faar-nyre-fra-en-genmodificeret-gris",
    "https://www.dr.dk/nyheder/seneste/donald-trump-vil-ikke-producere-flere-pennies",
    "https://www.dr.dk/nyheder/seneste/svensk-politi-efterlyser-video-og-billeder-i-forbindelse-med-efterforskning-af",
    "https://www.dr.dk/nyheder/seneste/sverige-flager-paa-halv-efter-skoleskyderi",
    "https://www.dr.dk/nyheder/udland/efter-meldinger-fra-usa-ser-mette-frederiksen-kun-en-loesning-paa-truslen-fra-rusland",
    "https://www.dr.dk/nyheder/udland/eu-kommissionen-oensker-opgoer-med-online-platforme-som-temu-told-og-afgifter-kan",
    "https://www.dr.dk/sporten/seneste-sport/dansk-doublespiller-foerer-i-turneringssejr-i-german-open",
    "https://www.dr.dk/sporten/seneste-sport/esbjerg-og-odense-buldrer-videre-i-kvindeligaen",
  ];

  const testAgent = new AtpAgent({
    service: "https://bsky.social",
  });
  await testAgent.login({
    identifier: getEnvironmentVariableValue("BLUESKY_TEST_USERNAME"),
    password: getEnvironmentVariableValue("BLUESKY_TEST_PASSWORD"),
  });

  let number = 1;
  for (const url of testUrls) {
    const descriptionAndImageUrl = await fetchDescriptionAndImages(url);
    const articleHtml = await fetchArticleHtml(url);
    const articleImage = extractArticleImageUrl(articleHtml);
    const imageUrl = articleImage ?? descriptionAndImageUrl?.images[0]?.url;
    const summary = await summarizeWithAzure(articleHtml);

    await postToBluesky(
      testAgent,
      descriptionAndImageUrl?.description ?? "",
      imageUrl,
      summary,
      `Dummy title ${number}`,
      url,
    );

    number++;
  }
};

await main();
