import { PlainTextString } from "./shared/brandedTypes/PlainTextString";

export const getEnvironmentVariableValue = (
  variableName: string,
): PlainTextString => {
  const value = process.env[variableName];
  if (value === undefined) {
    throw new Error(`${variableName} must be defined.`);
  }

  return value as PlainTextString;
};
