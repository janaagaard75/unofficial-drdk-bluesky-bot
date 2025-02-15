import { fetchDescriptionAndImageUrls } from "../fetchDescriptionAndImageUrl/fetchDescriptionAndImageUrls";

async function main() {
  const testUrls = [
    "https://www.dr.dk/nyheder/seneste/svensk-politi-efterlyser-video-og-billeder-i-forbindelse-med-efterforskning-af",
    "https://www.dr.dk/nyheder/udland/eu-kommissionen-oensker-opgoer-med-online-platforme-som-temu-told-og-afgifter-kan",
    "https://www.dr.dk/nyheder/indland/regeringen-vil-nedlaegge-jobcentrene-en-stor-og-omfattende-oevelse",
    "https://www.dr.dk/sporten/seneste-sport/esbjerg-og-odense-buldrer-videre-i-kvindeligaen",
    "https://www.dr.dk/nyheder/seneste/sverige-flager-paa-halv-efter-skoleskyderi",
    "https://www.dr.dk/nyheder/seneste/donald-trump-vil-ikke-producere-flere-pennies",
  ];

  for (const url of testUrls) {
    const descriptionAndImage = await fetchDescriptionAndImageUrls(url);
    console.log();
    console.log(descriptionAndImage);
  }
}

main();
