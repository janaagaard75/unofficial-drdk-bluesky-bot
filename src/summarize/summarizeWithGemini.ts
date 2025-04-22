import { GoogleGenAI } from "@google/genai";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { HtmlString } from "../shared/HtmlString";
import { PlainTextString } from "../shared/PlainTextString";
import { extractArticleText } from "./extractArticleText";

export const summarizeWithGemini = async (
  articleHtml: HtmlString,
): Promise<PlainTextString> => {
  const ai = new GoogleGenAI({
    apiKey: getEnvironmentVariableValue("GEMINI_API_KEY"),
  });

  const articleText = extractArticleText(articleHtml);
  const response = await ai.models.generateContent({
    config: {
      maxOutputTokens: 512,
      responseMimeType: "text/plain",
    },
    contents: `Please summarize this text. Use a maximum of 300 characters.\n\n${articleText}`,
    model: "gemini-2.5-flash-preview-04-17",
  });
  const summary = (response.text ?? "") as PlainTextString;
  console.log(`Gemini summary (${summary.length} characters): ${summary}`);

  return summary;
};
