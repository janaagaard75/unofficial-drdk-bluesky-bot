import Parser from "rss-parser";

export const fetchTitlesAndUrlsFromRssFeed = async (): Promise<
  Array<{
    title: string;
    url: string;
  }>
> => {
  const parser = new Parser();
  const newsFeed = await parser.parseURL(
    "https://www.dr.dk/nyheder/service/feeds/senestenyt"
  );

  const titlesAndUrls = newsFeed.items.map((item) => {
    return {
      title: item.title ?? "",
      url: item.link ?? "",
    };
  });

  return titlesAndUrls;
};
