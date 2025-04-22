import {
  AnalyzeBatchAction,
  AzureKeyCredential,
  PagedAnalyzeBatchResult,
  TextAnalysisClient,
} from "@azure/ai-language-text";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { HtmlString } from "../shared/HtmlString";
import { PlainTextString } from "../shared/PlainTextString";
import { extractArticleText } from "./extractArticleText";

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

const extractSummary = async (
  actionResults: PagedAnalyzeBatchResult,
): Promise<PlainTextString> => {
  const sentences: Array<PlainTextString> = [];

  for await (const actionResult of actionResults) {
    if (actionResult.kind !== "ExtractiveSummarization") {
      throw new Error(
        `Expected extractive summarization results but got: ${actionResult.kind}.`,
      );
    }

    if (actionResult.error !== undefined) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }

    for (const result of actionResult.results) {
      if (result.error !== undefined) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }

      for (const sentence of result.sentences) {
        sentences.push(sentence.text as PlainTextString);
      }
    }
  }

  return sentences.join(" ") as PlainTextString;
};
