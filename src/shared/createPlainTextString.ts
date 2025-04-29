import { PlainTextString } from "./PlainTextString";

export const createPlainTextString = (value: string): PlainTextString => {
  return value as PlainTextString;
};

// TODO: Extend this so that if value is undefined, then undefined is returned.
