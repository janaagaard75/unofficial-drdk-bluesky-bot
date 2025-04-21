import { PagedAnalyzeBatchResult } from "@azure/ai-language-text";
import { PlainTextString } from "../shared/PlainTextString";

export const extractSummary = async (
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
