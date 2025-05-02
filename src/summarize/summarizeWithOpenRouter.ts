import OpenAI from "openai";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { PlainTextString } from "../shared/PlainTextString";
import { createPlainTextString } from "../shared/createPlainTextString";

export const summarizeWithOpenRouter = async (
  articleText: PlainTextString,
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
    "Opsummer venligst følgende nyhedsartikel i et par sætninger på maksimalt 300 tegn. Undgå linjeskift og markdown-formatering. Bevar en neutral og informativ tone, og fokuser på hovedbudskabet uden overflødige detaljer. Det er vigtigt at opsummeringen højst er på 300 tegn. Her er teksten:";

  const completion = await openai.completions.create({
    model: model,
    prompt: `${prompt}\n\n${articleText}`,
  });

  const summary = completion.choices[0]?.text.trim() ?? "";
  return createPlainTextString(summary);
};
