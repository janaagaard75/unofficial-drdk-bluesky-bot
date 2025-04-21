import { extractImageDescriptionsAndUrls } from "../extractImageDescriptionsAndUrls/extractImageDescriptionsAndUrls";
import { HtmlString } from "../shared/HtmlString";
import { UrlString } from "../shared/UrlString";

const main = async () => {
  const testUrls = [
    "https://www.dr.dk/nyheder/indland/regeringen-vil-nedlaegge-jobcentrene-en-stor-og-omfattende-oevelse",
    "https://www.dr.dk/nyheder/seneste/66-aarig-mand-faar-nyre-fra-en-genmodificeret-gris",
    "https://www.dr.dk/nyheder/seneste/donald-trump-vil-ikke-producere-flere-pennies",
    "https://www.dr.dk/nyheder/seneste/svensk-politi-efterlyser-video-og-billeder-i-forbindelse-med-efterforskning-af",
    "https://www.dr.dk/nyheder/seneste/sverige-flager-paa-halv-efter-skoleskyderi",
    "https://www.dr.dk/nyheder/udland/efter-meldinger-fra-usa-ser-mette-frederiksen-kun-en-loesning-paa-truslen-fra-rusland",
    "https://www.dr.dk/nyheder/udland/eu-kommissionen-oensker-opgoer-med-online-platforme-som-temu-told-og-afgifter-kan",
    "https://www.dr.dk/sporten/seneste-sport/esbjerg-og-odense-buldrer-videre-i-kvindeligaen",
  ] as Array<UrlString>;

  for (const url of testUrls) {
    const downloadedArticle = await fetch(url);
    const articleHtml = (await downloadedArticle.text()) as HtmlString;
    const extractedImageUrls = extractImageDescriptionsAndUrls(articleHtml);
    console.log(url, extractedImageUrls);
  }
};

await main();
