import { extractHtmlArticle } from "../../postLink/extractHtmlArticle";
import { fetchHtmlPage } from "../../postLink/fetchHtmlPage";
import { extractArticleText } from "../../summarize/extractArticleText";
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
