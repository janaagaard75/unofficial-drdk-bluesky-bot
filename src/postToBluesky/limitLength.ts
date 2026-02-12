import { brand } from "../shared/brandedTypes/brand";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";

export const limitLength = (text: PlainTextString): PlainTextString => {
  const blueskyPostLengthLimit = 300;

  if (text.length > blueskyPostLengthLimit) {
    return brand<PlainTextString>(
      `${text.substring(0, blueskyPostLengthLimit - 3)}...`,
    );
  }

  return text;
};
