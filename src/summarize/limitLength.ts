export const limitLength = (text: string): string => {
  const blueskyPostLengthLimit = 300;

  if (text.length > blueskyPostLengthLimit) {
    return `${text.substring(0, blueskyPostLengthLimit - 3)}...`;
  }

  return text;
};
