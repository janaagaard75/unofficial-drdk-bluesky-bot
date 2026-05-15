import Parser from "rss-parser";
import { brand } from "../shared/brandedTypes/brand";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { PolitietUpdate } from "./PolitietUpdate";

export const fetchUpdatesFromRssFeed = async (): Promise<
  ReadonlyArray<PolitietUpdate>
> => {
  const parser = new Parser();
  const feed = await parser.parseURL(
    "https://via.ritzau.dk/rss/short-messages/latest",
  );

  const updates = feed.items.flatMap((item) => {
    if (item.link === undefined || item.link.trim() === "") {
      return [];
    }

    const description = brand<PlainTextString>(
      item.contentSnippet ?? item.title ?? "",
    );

    const imageUrl =
      item.enclosure?.url !== undefined
        ? new URL(item.enclosure.url)
        : undefined;

    return [
      {
        description,
        imageUrl,
        title: brand<PlainTextString>(item.title ?? ""),
        url: new URL(item.link),
      },
    ];
  });

  return updates;
};
