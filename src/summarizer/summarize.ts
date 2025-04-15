import {
  AnalyzeBatchAction,
  AzureKeyCredential,
  TextAnalysisClient,
} from "@azure/ai-language-text";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { extractSummary } from "./extractSummary";

export const summarize = async (fullText: string): Promise<string> => {
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
  const poller = await client.beginAnalyzeBatch(actions, [fullText]);

  const actionResults = await poller.pollUntilDone();
  const summary = await extractSummary(actionResults);
  return summary;
};
