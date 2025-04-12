import { JSDOM } from "jsdom";

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
    console.log(`\n\n--\nProcessing URL: ${url}`);
    const response = await fetch(url);
    const articleHtml = await response.text();
    const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/;
    const articleMatch = articleRegex.exec(articleHtml);

    if (articleMatch !== null && articleMatch[1] !== undefined) {
      const articleHtml = articleMatch[1]
        .trim()
        .replace(/<\/div>/gi, "</div> ")
        .replace(/<\/h[1-6]>/gi, "</h$1> ")
        .replace(/<\/li>/gi, "</li> ")
        .replace(/<\/p>/gi, "</p> ")
        .replace(/<\/span>/gi, "</p> ")
        .replace(/<br\s*\/?>/gi, " ");
      const articleText = (JSDOM.fragment(articleHtml).textContent ?? "")
        .replace(/\s+/g, " ")
        .trim();
      console.log(articleText.substring(0, 200));
    } else {
      console.log("No article content found in the article.");
    }
  }
};

await testSummarize();
