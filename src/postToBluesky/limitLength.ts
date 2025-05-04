import { createPlainTextString } from "../shared/brandedTypes/createPlainTextString";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";

export const limitLength = (text: PlainTextString): PlainTextString => {
  const blueskyPostLengthLimit = 300;

  if (text.length > blueskyPostLengthLimit) {
    return createPlainTextString(
      `${text.substring(0, blueskyPostLengthLimit - 3)}...`,
    );
  }

  return text;
};
