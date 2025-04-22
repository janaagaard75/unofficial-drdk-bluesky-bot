import { PlainTextString } from "./shared/PlainTextString";
import { UrlString } from "./shared/UrlString";

export const getEnvironmentVariableValue = (
  variableName: string,
): PlainTextString | UrlString => {
  const value = process.env[variableName];
  if (value === undefined) {
    throw new Error(`${variableName} must be defined.`);
  }

  return value as PlainTextString | UrlString;
};
