import { extractImageDescriptionsAndUrls } from "../extractImageDescriptionsAndUrls/extractImageDescriptionsAndUrls";
import { createHtmlString } from "../shared/createHtmlString";
import { testUrls } from "./testUrls";

const main = async () => {
  for (const url of testUrls) {
    const downloadedArticle = await fetch(url);
    const articleHtml = createHtmlString(await downloadedArticle.text());
    const extractedImageUrls = extractImageDescriptionsAndUrls(articleHtml);
    console.log(url, extractedImageUrls);
  }
};

await main();
