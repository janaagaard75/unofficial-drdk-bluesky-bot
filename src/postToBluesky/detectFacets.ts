import { Facet, UnicodeString } from "@atproto/api";
import { isValidDomain } from "./isValidDomain";

export const detectFacets = (stringText: string): Array<Facet> => {
  const facets: Array<Facet> = [];

  const linkMatcher =
    /(^|\s|\()((https?:\/\/[\S]+)|((?<domain>[a-z][a-z0-9]*(\.[a-z0-9]+)+)[\S]*))/gim;
  const unicodeText = new UnicodeString(stringText);

  let match: RegExpExecArray | null;
  while ((match = linkMatcher.exec(unicodeText.utf16)) !== null) {
    if (match[2] === undefined) {
      continue;
    }

    let uri = match[2];
    if (!uri.startsWith("http")) {
      const domain = match.groups?.["domain"];
      if (!domain || !isValidDomain(domain)) {
        continue;
      }
      uri = `https://${uri}`;
    }
    const start = unicodeText.utf16.indexOf(match[2], match.index);
    const index = {
      start,
      end: start + match[2].length,
    };
    // Strip ending punctuation.
    if (/[.,;!?]$/.test(uri)) {
      uri = uri.slice(0, -1);
      index.end--;
    }
    if (/[)]$/.test(uri) && !uri.includes("(")) {
      uri = uri.slice(0, -1);
      index.end--;
    }
    facets.push({
      index: {
        byteStart: unicodeText.utf16IndexToUtf8Index(index.start),
        byteEnd: unicodeText.utf16IndexToUtf8Index(index.end),
      },
      features: [
        {
          $type: "app.bsky.richtext.facet#link",
          uri,
        },
      ],
    });
  }

  return facets;
};
