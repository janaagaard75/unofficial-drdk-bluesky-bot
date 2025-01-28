import TLDs from "tlds";

export const isValidDomain = (str: string): boolean => {
    return !!TLDs.find((tld) => {
      const i = str.lastIndexOf(tld);
      if (i === -1) {
        return false;
      }
      return str.charAt(i - 1) === "." && i === str.length - tld.length;
    });
  };
  