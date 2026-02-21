const matchesArchiveUrl = /^https?:\/\/([^ ]*\.)?archive\./i;

export const matchesArchiveUrlInText = (text: string | undefined): boolean => {
  if (text === undefined) {
    return false;
  }

  return matchesArchiveUrl.test(text);
};
