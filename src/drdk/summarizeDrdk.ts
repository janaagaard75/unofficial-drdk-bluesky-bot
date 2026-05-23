import OpenAI from "openai";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { brand } from "../shared/brandedTypes/brand";
import { getEnvironmentVariableValue } from "../shared/getEnvironmentVariableValue";
import { model } from "../shared/model";

export const summarizeDrdk = async (
  articleText: PlainTextString,
  maxLength: number,
): Promise<PlainTextString> => {
  const openRouterApiKey = getEnvironmentVariableValue("OPEN_ROUTER_API_KEY");

  const openai = new OpenAI({
    apiKey: openRouterApiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://janaagaard.com/unofficial-drdk-bluesky-bot/",
      "X-Title": "Unofficial dr.dk news bot for Bluesky",
    },
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        content: `Opsummer venligst følgende nyhedsartikel i et par sætninger på maksimalt ${maxLength} tegn. Undgå linjeskift og markdown-formatering. Bevar en neutral og informativ tone, og fokuser på hovedbudskabet uden overflødige detaljer. Det er vigtigt at opsummeringen højst er på ${maxLength} tegn.`,
        role: "system",
      },
      {
        content: articleText,
        role: "user",
      },
    ],
    model: model,
  });

  const summary = completion.choices[0]?.message.content?.trim() ?? "";
  return brand<PlainTextString>(summary);
};
