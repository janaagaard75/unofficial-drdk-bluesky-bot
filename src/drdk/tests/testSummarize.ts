import { summarizeDrdk } from "../summarizeDrdk";
import { testArticleTexts } from "./testArticlesTexts";

const testSummarize = async () => {
  let number = 1;
  for (const articleText of testArticleTexts) {
    const summary = await summarizeDrdk(articleText, "google/gemini-2.5-flash");
    console.log(
      `\n--- Summary ${number} --- (${summary.length} characters)\n${summary.substring(0, 400)}`,
    );
    number++;
  }
};

await testSummarize();
