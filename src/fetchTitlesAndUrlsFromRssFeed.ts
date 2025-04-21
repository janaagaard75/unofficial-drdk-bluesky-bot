import Parser from "rss-parser";
import { PlainTextString } from "./shared/PlainTextString";
import { UrlString } from "./shared/UrlString";

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
      title: (item.title ?? "") as PlainTextString,
      url: (item.link ?? "") as UrlString,
    };
  });

  return titlesAndUrls;
};
