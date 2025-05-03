import { writeFile } from "fs/promises";
import { fetchArticleHtml } from "../postNewLinks/fetchArticleHtml";
import { testUrls } from "./testUrls";

const testFetchArticle = async () => {
  let urlNumber = 1;
  for (const url of testUrls) {
    const articleHtml = await fetchArticleHtml(url);
    await writeFile(`article-${urlNumber}.html`, articleHtml, {
      encoding: "utf-8",
    });
    urlNumber++;
  }
};

await testFetchArticle();
