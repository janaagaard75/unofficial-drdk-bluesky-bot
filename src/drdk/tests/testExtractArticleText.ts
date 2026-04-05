import { extractArticleText } from "../extractArticleText";
import { extractHtmlArticle } from "../extractHtmlArticle";
import { fetchHtmlPage } from "../fetchHtmlPage";
import { testUrls } from "./testUrls";

const testExtractArticleText = async () => {
  for (const url of testUrls) {
    const htmlPage = await fetchHtmlPage(url);
    const htmlArticle = extractHtmlArticle(htmlPage);
    const articleText = extractArticleText(htmlArticle);

    console.log(articleText, "\n\n");
  }
};

await testExtractArticleText();
