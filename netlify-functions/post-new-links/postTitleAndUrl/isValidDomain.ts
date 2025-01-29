import { parse } from "tldts";

export const isValidDomain = (str: string): boolean => {
  const parsed = parse(str);

  return parsed.isIcann === true;
};
