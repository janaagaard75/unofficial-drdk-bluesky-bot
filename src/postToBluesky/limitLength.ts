import { PlainTextString } from "../shared/PlainTextString";

export const limitLength = (text: PlainTextString): PlainTextString => {
  const blueskyPostLengthLimit = 300;

  if (text.length > blueskyPostLengthLimit) {
    return `${text.substring(0, blueskyPostLengthLimit - 3)}...` as PlainTextString;
  }

  return text;
};
