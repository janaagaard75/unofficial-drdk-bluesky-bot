import { JSDOM } from "jsdom";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { extractDescription } from "../postNewLinks/extractDescription";
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
}

export const fetchPageInfo = async (url: UrlString): Promise<PageInfo> => {
  const htmlPage = await fetchHtmlPage(url);

  if (htmlPage === undefined) {
    return {
      description: undefined,
      imageUrl: undefined,
      text: undefined,
    };
  }

  const description = extractDescription(htmlPage);

  const dom = new JSDOM(htmlPage, { url: url });
  const article = getReadabilityArticle(dom);
  const imageUrl = await getImageFromDomOrArticle(dom, article);
  const text = getTextFromArticle(article);

  return {
    description: description,
    imageUrl: imageUrl,
    text: text,
  };
};
