import Parser from "rss-parser";
import { createPlainTextString } from "./shared/brandedTypes/createPlainTextString";
import { createUrlString } from "./shared/brandedTypes/createUrlString";
import { PlainTextString } from "./shared/brandedTypes/PlainTextString";
import { UrlString } from "./shared/brandedTypes/UrlString";

interface TitleAndUrl {
  title: PlainTextString;
  url: UrlString;
}

export const fetchTitlesAndUrlsFromRssFeed = async (): Promise<
  ReadonlyArray<TitleAndUrl>
> => {
  const parser = new Parser();
  const newsFeed = await parser.parseURL(
    "https://www.dr.dk/nyheder/service/feeds/senestenyt",
  );

  const titlesAndUrls = newsFeed.items.map((item) => {
    return {
      title: createPlainTextString(item.title ?? ""),
      url: createUrlString(item.link ?? ""),
    };
  });

  return titlesAndUrls;
};
