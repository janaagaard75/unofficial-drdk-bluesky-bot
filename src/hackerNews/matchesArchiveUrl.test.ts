import { expect, test } from "vitest";
import { matchesArchiveUrlInText } from "./matchesArchiveUrl";

const archiveUrls = [
  "https://example.archive.com",
  "http://example.archive.com",
  "https://archive.com/",
  "https://example.archive.co.uk",
  "https://example.archive.com/some/path",
  "http://archive.today/I9MoI",
];

test.each(archiveUrls)(
  "matchesArchiveUrlInText(%s) returns true",
  (comment) => {
    expect(matchesArchiveUrlInText(comment)).toBe(true);
  },
);

const notArchiveUrls = [
  "https://example.com",
  undefined,
  "Some random comment with an archive URL: https://example.archive.com in it.",
];

test.each(notArchiveUrls)(
  "matchesArchiveUrlInText(%s) returns false",
  (comment) => {
    expect(matchesArchiveUrlInText(comment)).toBe(false);
  },
);
