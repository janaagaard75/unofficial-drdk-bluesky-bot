import { JSDOM } from "jsdom";
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
        .replace(/<\/p>/gi, "</p>\n")
        .replace(/<\/span>/gi, "</span> ")
        .replace(/<\/strong>/gi, "</strong> ")
        .replace(/<\/em>/gi, "</em> ")
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/\n/gi, " ");

      const articleText = (JSDOM.fragment(articleHtml).textContent ?? "")
        .replace(/\s{2,}/gi, ". ")
        .replaceAll(":.", ":")
        .replaceAll("..", ".")
        .replace(/^. /, "")
        .trim();

      console.log(`\n${articleText.substring(0, 400)}`);

      const summary = await summarize(articleText);
      console.log(`\n${summary}`);
      console.log(`\nLength: ${summary.length}.`);
    } else {
      console.log("No article content found in the article.");
    }
  }
};

await testSummarize();
