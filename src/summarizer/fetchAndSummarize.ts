import { fetchArticleText } from "./fetchArticleText";
import { limitLength } from "./limitLength";
import { summarize } from "./summarize";

export const fetchAndSummarize = async (url: string): Promise<string> => {
  try {
    const articleText = await fetchArticleText(url);
    const summary = await summarize(articleText);
    const limitedSummary = limitLength(summary);
    console.log(`Summarized article into ${limitedSummary.length} characters.`);
    return limitedSummary;
  } catch (error) {
    console.error(`Error fetching or summarizing ${url}: ${error?.toString()}`);
    return "";
  }
};
