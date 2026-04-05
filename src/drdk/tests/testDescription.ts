import { extractDescription } from "../../shared/extractDescription";
import { fetchHtmlPage } from "../fetchHtmlPage";
import { testUrls } from "./testUrls";

const testDescription = async () => {
  for (const url of testUrls) {
    const htmlPage = await fetchHtmlPage(url);
    const description = extractDescription(htmlPage);
    console.log();
    console.log(description);
  }
};

await testDescription();
