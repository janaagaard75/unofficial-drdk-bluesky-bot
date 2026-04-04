import { writeFile } from "fs/promises";
import { extractHtmlArticle } from "../../postLink/extractHtmlArticle";
import { fetchHtmlPage } from "../../postLink/fetchHtmlPage";
import { testUrls } from "./testUrls";

const testFetchArticle = async () => {
  let urlNumber = 1;
  for (const url of testUrls) {
    const htmlPage = await fetchHtmlPage(url);
    const htmlArticle = extractHtmlArticle(htmlPage);
    await writeFile(`article-${urlNumber}.html`, htmlArticle, {
      encoding: "utf-8",
    });
    urlNumber++;
  }
};

await testFetchArticle();
