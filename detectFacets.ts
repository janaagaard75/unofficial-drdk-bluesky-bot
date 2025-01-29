import { AppBskyRichtextFacet } from "@atproto/api";

type Facet = AppBskyRichtextFacet.Main;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export class UnicodeString {
  constructor(utf16: string) {
    this.utf16 = utf16;
    this.utf8 = encoder.encode(utf16);
  }

  utf16: string;
  utf8: Uint8Array;

  // helper to convert utf16 code-unit offsets to utf8 code-unit offsets
  utf16IndexToUtf8Index(i: number) {
    return encoder.encode(this.utf16.slice(0, i)).byteLength;
  }
}

export const detectFacets = (text: UnicodeString): Array<Facet> => {
  const facets: Array<Facet> = [];

  const linkMatcher =
    /(^|\s|\()((https?:\/\/[\S]+)|((?<domain>[a-z][a-z0-9]*(\.[a-z0-9]+)+)[\S]*))/gim;
  let match: RegExpExecArray | null;
  while ((match = linkMatcher.exec(text.utf16)) !== null) {
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
    const start = text.utf16.indexOf(match[2], match.index);
    const index = {
      start,
      end: start + match[2].length,
    };
    // Strip ending puncuation.
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
        byteStart: text.utf16IndexToUtf8Index(index.start),
        byteEnd: text.utf16IndexToUtf8Index(index.end),
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

const isValidDomain = (str: string): boolean => {
  return true;
};
