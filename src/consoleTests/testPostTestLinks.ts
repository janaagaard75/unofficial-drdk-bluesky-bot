import { AtpAgent } from "@atproto/api";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { postLink } from "../postNewLinks/postLink";
import { createPlainTextString } from "../shared/createPlainTextString";
import { createUrlString } from "../shared/createUrlString";

const main = async () => {
  const testUrls = [
    createUrlString(
      "https://www.dr.dk/nyheder/indland/regeringen-vil-nedlaegge-jobcentrene-en-stor-og-omfattende-oevelse",
    ),
    createUrlString(
      "https://www.dr.dk/nyheder/seneste/66-aarig-mand-faar-nyre-fra-en-genmodificeret-gris",
    ),
    createUrlString(
      "https://www.dr.dk/nyheder/seneste/donald-trump-vil-ikke-producere-flere-pennies",
    ),
    createUrlString(
      "https://www.dr.dk/nyheder/seneste/svensk-politi-efterlyser-video-og-billeder-i-forbindelse-med-efterforskning-af",
    ),
    createUrlString(
      "https://www.dr.dk/nyheder/seneste/sverige-flager-paa-halv-efter-skoleskyderi",
    ),
    createUrlString(
      "https://www.dr.dk/nyheder/udland/efter-meldinger-fra-usa-ser-mette-frederiksen-kun-en-loesning-paa-truslen-fra-rusland",
    ),
    createUrlString(
      "https://www.dr.dk/nyheder/udland/eu-kommissionen-oensker-opgoer-med-online-platforme-som-temu-told-og-afgifter-kan",
    ),
    createUrlString(
      "https://www.dr.dk/sporten/seneste-sport/dansk-doublespiller-foerer-i-turneringssejr-i-german-open",
    ),
    createUrlString(
      "https://www.dr.dk/sporten/seneste-sport/esbjerg-og-odense-buldrer-videre-i-kvindeligaen",
    ),
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
    await postLink(
      testAgent,
      createPlainTextString(`Dummy title ${number}`),
      url,
    );
    number++;
  }
};

await main();
