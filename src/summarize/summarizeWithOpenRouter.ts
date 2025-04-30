import OpenAI from "openai";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { HtmlString } from "../shared/HtmlString";
import { PlainTextString } from "../shared/PlainTextString";
import { createPlainTextString } from "../shared/createPlainTextString";

export const summarizeWithOpenRouter = async (
  articleHtml: HtmlString,
  model:
    | "deepseek/deepseek-chat-v3-0324:free"
    | "google/gemini-2.5-flash-preview"
    | "openai/gpt-4o",
): Promise<PlainTextString> => {
  const openRouterApiKey = getEnvironmentVariableValue("OPEN_ROUTER_API_KEY");

  const openai = new OpenAI({
    apiKey: openRouterApiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://unofficial-drdk-bluesky-bot.netlify.app",
      "X-Title": "Unofficial dr.dk news bot for Bluesky",
    },
  });

  const prompt =
    "Opsummer følgende nyhedsartikel i et par sætninger. Brug op til 300 karakter.";

  const completion = await openai.completions.create({
    model: model,
    prompt: `${prompt}\n\n${articleHtml}`,
  });

  const summary = completion.choices[0]?.text.trim() ?? "";
  return createPlainTextString(summary);
};
