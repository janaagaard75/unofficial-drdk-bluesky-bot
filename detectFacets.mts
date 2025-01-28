import { AppBskyRichtextFacet } from "@atproto/api";
import TLDs from "tlds";

type Facet = AppBskyRichtextFacet.Main;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

class UnicodeString {
  utf16: string;
  utf8: Uint8Array;

  constructor(utf16: string) {
    this.utf16 = utf16;
    this.utf8 = encoder.encode(utf16);
  }

  // helper to convert utf16 code-unit offsets to utf8 code-unit offsets
  utf16IndexToUtf8Index(i: number) {
    return encoder.encode(this.utf16.slice(0, i)).byteLength;
  }
}

export function detectFacets(text: UnicodeString): Array<Facet> {
  let match;
  const facets: Facet[] = [];
  const re =
    /(^|\s|\()((https?:\/\/[\S]+)|((?<domain>[a-z][a-z0-9]*(\.[a-z0-9]+)+)[\S]*))/gim;
  while ((match = re.exec(text.utf16))) {
    let uri = match[2];
    if (!uri.startsWith("http")) {
      const domain = match.groups?.domain;
      if (!domain || !isValidDomain(domain)) {
        continue;
      }
      uri = `https://${uri}`;
    }
    const start = text.utf16.indexOf(match[2], match.index);
    const index = { start, end: start + match[2].length };
    // strip ending puncuation
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
}

function isValidDomain(str: string): boolean {
  return !!TLDs.find((tld) => {
    const i = str.lastIndexOf(tld);
    if (i === -1) {
      return false;
    }
    return str.charAt(i - 1) === "." && i === str.length - tld.length;
  });
}
