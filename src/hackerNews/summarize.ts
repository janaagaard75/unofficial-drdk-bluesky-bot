import OpenAI from "openai";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";

export const summarize = async (
  articleText: string,
  maxLength: number,
  model: "google/gemini-2.5-flash" | "openai/gpt-4o",
): Promise<string> => {
  const openRouterApiKey = getEnvironmentVariableValue("OPEN_ROUTER_API_KEY");

  const openai = new OpenAI({
    apiKey: openRouterApiKey,
    baseURL: "https://openrouter.ai/api/v1",
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        content: `You are a concise news summarizer. IMPORTANT: Your response must be under ${maxLength} characters. Aim to use as much of the available space as possible (aim for 80-90% of the limit). No exceptions on the character limit.`,
        role: "system",
      },
      {
        content: `Summarize this news article in 1-3 sentences. Target: ${Math.round(maxLength * 0.85)} characters (aim for this length, max ${maxLength}). No line breaks, no markdown. Neutral tone. Same language as the article.\n\nArticle:\n${articleText}`,
        role: "user",
      },
    ],
    model: model,
    temperature: 0.5,
  });

  const summary = completion.choices[0]?.message.content?.trim() ?? "";
  return summary;
};
