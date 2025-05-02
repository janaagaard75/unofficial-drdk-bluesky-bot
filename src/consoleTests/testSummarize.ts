import { summarizeWithOpenRouter } from "../summarize/summarizeWithOpenRouter";
import { testArticleTexts } from "./testArticlesTexts";

const testSummarize = async () => {
  let number = 1;
  for (const articleText of testArticleTexts) {
    const summary = await summarizeWithOpenRouter(
      articleText,
      // "deepseek/deepseek-chat-v3-0324:free",
      "google/gemini-2.5-flash-preview",
      // "openai/gpt-4o",
    );
    console.log(
      `\n--- Summary ${number} --- (${summary.length} characters)\n${summary.substring(0, 400)}`,
    );
    number++;
  }
};

await testSummarize();
