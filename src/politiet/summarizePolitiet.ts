import OpenAI from "openai";
import { getEnvironmentVariableValue } from "../shared/getEnvironmentVariableValue";

export const summarizePolitiet = async (
  articleText: string,
  maxLength: number,
  model: "google/gemini-2.5-flash",
): Promise<string> => {
  const openRouterApiKey = getEnvironmentVariableValue("OPEN_ROUTER_API_KEY");

  const textBeforeSeparatorHeading = (
    articleText.split("Abonner på myndighedsmeddelelser fra").at(0) ?? ""
  ).trim();

  const openai = new OpenAI({
    apiKey: openRouterApiKey,
    baseURL: "https://openrouter.ai/api/v1",
  });

  const systemMessage = {
    content: `You are a concise news summarizer. IMPORTANT: Your response must be under ${maxLength} characters. Aim to use as much of the available space as possible (aim for 80-90% of the limit). No exceptions on the character limit.`,
    role: "system" as const,
  };

  const firstUserMessage = {
    content: `Summarize this news article in 1-3 sentences. Target: ${Math.round(maxLength * 0.85)} characters (aim for this length, max ${maxLength}). No line breaks, no markdown. Neutral tone. Same language as the article.\n\nArticle:\n${textBeforeSeparatorHeading}`,
    role: "user" as const,
  };

  console.log(
    `Summarizing ${textBeforeSeparatorHeading.length} characters with model ${model} (max ${maxLength} characters)...`,
  );

  const firstCompletion = await openai.chat.completions.create({
    messages: [systemMessage, firstUserMessage],
    model: model,
    temperature: 0.5,
  });

  const firstSummary =
    firstCompletion.choices[0]?.message.content?.trim() ?? "";

  if (firstSummary.length <= maxLength) {
    return firstSummary;
  }

  console.log(
    `Summary was ${firstSummary.length} characters (limit: ${maxLength}). Retrying...`,
  );

  const secondUserMessage = {
    content: `That was ${firstSummary.length} characters, which exceeds the limit of ${maxLength}. Please write a shorter version — aim for ${Math.round(maxLength * 0.75)} characters.`,
    role: "user" as const,
  };

  const secondCompletion = await openai.chat.completions.create({
    messages: [
      systemMessage,
      firstUserMessage,
      {
        content: firstSummary,
        role: "assistant" as const,
      },
      secondUserMessage,
    ],
    model: model,
    temperature: 0.5,
  });

  const secondSummary =
    secondCompletion.choices[0]?.message.content?.trim() ?? "";

  return secondSummary;
};
