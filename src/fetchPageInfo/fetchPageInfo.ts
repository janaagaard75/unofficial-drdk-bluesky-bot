import { JSDOM } from "jsdom";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { extractDescription } from "../drdk/extractDescription";
import { brand } from "../shared/brandedTypes/brand";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { UrlString } from "../shared/brandedTypes/UrlString";
import { fetchHtmlPage } from "./fetchHtmlPage";
import { getImageFromDomOrArticle } from "./getImageFromDomOrArticle";
import { getReadabilityArticle } from "./getReadabilityArticle";
import { getTextFromArticle } from "./getTextFromArticle";

puppeteerExtra.use(StealthPlugin());

interface PageInfo {
  description: PlainTextString | undefined;
  imageUrl: UrlString | undefined;
  text: PlainTextString | undefined;
  title: PlainTextString | undefined;
}

export const fetchPageInfo = async (url: UrlString): Promise<PageInfo> => {
  const htmlPage = await fetchHtmlPage(url);

  if (htmlPage === undefined) {
    return {
      description: undefined,
      imageUrl: undefined,
      text: undefined,
      title: undefined,
    };
  }

  const description = extractDescription(htmlPage);

  const dom = new JSDOM(htmlPage, { url: url });
  const article = getReadabilityArticle(dom);
  const imageUrl = await getImageFromDomOrArticle(url, dom, article);
  const text = getTextFromArticle(article);
  const title =
    article?.title === undefined || article.title === null
      ? undefined
      : brand<PlainTextString>(article.title);

  return {
    description: description,
    imageUrl: imageUrl,
    text: text,
    title: title,
  };
};
