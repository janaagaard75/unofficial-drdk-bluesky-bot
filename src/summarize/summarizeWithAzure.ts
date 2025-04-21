import {
  AnalyzeBatchAction,
  AzureKeyCredential,
  TextAnalysisClient,
} from "@azure/ai-language-text";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { HtmlString } from "../shared/HtmlString";
import { PlainTextString } from "../shared/PlainTextString";
import { extractArticleText } from "./extractArticleText";
import { extractSummary } from "./extractSummary";

export const summarizeWithAzure = async (
  articleHtml: HtmlString,
): Promise<PlainTextString> => {
  const azureAiLanguageKey = getEnvironmentVariableValue(
    "AZURE_AI_LANGUAGE_KEY",
  );
  const azureAiLanguageEndpoint = getEnvironmentVariableValue(
    "AZURE_AI_LANGUAGE_ENDPOINT",
  );
  const client = new TextAnalysisClient(
    azureAiLanguageEndpoint,
    new AzureKeyCredential(azureAiLanguageKey),
  );
  const actions: Array<AnalyzeBatchAction> = [
    {
      kind: "ExtractiveSummarization",
      maxSentenceCount: 2,
    },
  ];

  const articleText = extractArticleText(articleHtml);
  const poller = await client.beginAnalyzeBatch(actions, [articleText]);
  const actionResults = await poller.pollUntilDone();
  const summary = await extractSummary(actionResults);
  console.log(`Azure summary (${summary.length} characters): ${summary}`);

  return summary;
};
