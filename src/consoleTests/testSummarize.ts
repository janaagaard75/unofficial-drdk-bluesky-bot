import { fetchArticleText } from "../summarizer/fetchArticleText";
import { summarize } from "../summarizer/summarize";

const testSummarize = async () => {
  const testUrls = [
    "https://www.dr.dk/nyheder/indland/regeringen-vil-nedlaegge-jobcentrene-en-stor-og-omfattende-oevelse",
    "https://www.dr.dk/nyheder/seneste/66-aarig-mand-faar-nyre-fra-en-genmodificeret-gris",
    "https://www.dr.dk/nyheder/seneste/donald-trump-vil-ikke-producere-flere-pennies",
    "https://www.dr.dk/nyheder/seneste/svensk-politi-efterlyser-video-og-billeder-i-forbindelse-med-efterforskning-af",
    "https://www.dr.dk/nyheder/seneste/sverige-flager-paa-halv-efter-skoleskyderi",
    "https://www.dr.dk/nyheder/udland/efter-meldinger-fra-usa-ser-mette-frederiksen-kun-en-loesning-paa-truslen-fra-rusland",
    "https://www.dr.dk/nyheder/udland/eu-kommissionen-oensker-opgoer-med-online-platforme-som-temu-told-og-afgifter-kan",
    "https://www.dr.dk/sporten/seneste-sport/esbjerg-og-odense-buldrer-videre-i-kvindeligaen",
  ];

  for (const url of testUrls) {
    console.log(`\n\n--\nURL: ${url}`);

    const articleText = await fetchArticleText(url);
    console.log(`\n${articleText.substring(0, 400)}`);

    const summary = await summarize(articleText);
    console.log(`\n${summary}`);
    console.log(`\nLength: ${summary.length}.`);
  }
};

await testSummarize();
