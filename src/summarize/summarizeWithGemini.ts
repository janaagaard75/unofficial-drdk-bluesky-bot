import { GoogleGenAI } from "@google/genai";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { createPlainTextString } from "../shared/createPlainTextString";
import { PlainTextString } from "../shared/PlainTextString";
import { sleep } from "../shared/sleep";

export const summarizeWithGemini = async (
  articleText: PlainTextString,
): Promise<PlainTextString> => {
  const ai = new GoogleGenAI({
    apiKey: getEnvironmentVariableValue("GEMINI_API_KEY"),
  });

  const systemPrompt =
    "Please summarize this text. Use a maximum of 300 characters.";
  const inputText = `${systemPrompt}\n\n${articleText}`;

  const response = await ai.models.generateContent({
    config: {
      maxOutputTokens: 512,
      responseMimeType: "text/plain",
    },
    contents: inputText,
    model: "gemini-2.5-flash-preview-04-17",
  });

  // Add a delay to adhere to rate limits.
  await sleep(400);

  const summary = response.text ?? "";
  return createPlainTextString(summary);
};
