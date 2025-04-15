import { fetchArticleText } from "./fetchArticleText";
import { limitLength } from "./limitLength";
import { summarize } from "./summarize";

export const fetchAndSummarize = async (url: string): Promise<string> => {
  try {
    const articleText = await fetchArticleText(url);
    const summary = await summarize(articleText);
    return limitLength(summary);
  } catch (error) {
    console.error(`Error fetching or summarizing ${url}: ${error?.toString()}`);
    return "";
  }
};
