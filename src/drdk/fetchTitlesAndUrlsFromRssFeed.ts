import Parser from "rss-parser";
import { brand } from "../shared/brandedTypes/brand";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";

interface TitleAndUrl {
  title: PlainTextString;
  url: URL;
}

export const fetchTitlesAndUrlsFromRssFeed = async (): Promise<
  ReadonlyArray<TitleAndUrl>
> => {
  const parser = new Parser();
  const newsFeed = await parser.parseURL(
    "https://www.dr.dk/nyheder/service/feeds/senestenyt",
  );

  const titlesAndUrls = newsFeed.items.flatMap((item) => {
    if (item.link === undefined || item.link.trim() === "") {
      return [];
    }

    return [
      {
        title: brand<PlainTextString>(item.title ?? ""),
        url: new URL(item.link),
      },
    ];
  });

  return titlesAndUrls;
};
