import { fetchArticleHtml } from "../postNewLinks/fetchArticleHtml";
import { extractArticleText } from "../summarize/extractArticleText";
import { testUrls } from "./testUrls";

const testExtractArticleText = async () => {
  for (const url of testUrls) {
    const articleHtml = await fetchArticleHtml(url);
    const articleText = extractArticleText(articleHtml);

    console.log(articleText, "\n\n");
  }
};

await testExtractArticleText();
