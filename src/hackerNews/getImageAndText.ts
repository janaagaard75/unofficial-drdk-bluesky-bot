import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { PlainTextString } from "../shared/brandedTypes/PlainTextString";
import { UrlString } from "../shared/brandedTypes/UrlString";
import { getDocumentObjectModel } from "./getDocumentObjectModel";
import { getImageFromDomOrArticle } from "./getImageFromDomOrArticle";
import { getReadabilityArticle } from "./getReadabilityArticle";
import { getTextFromArticle } from "./getTextFromArticle";

puppeteerExtra.use(StealthPlugin());

interface ImageAndText {
  imageUrl: UrlString | undefined;
  text: PlainTextString | undefined;
}

export const getImageAndText = async (
  url: UrlString,
): Promise<ImageAndText> => {
  const dom = await getDocumentObjectModel(url);
  const article = getReadabilityArticle(dom);

  const imageUrl = getImageFromDomOrArticle(dom, article);
  const text = getTextFromArticle(article);

  return {
    imageUrl: imageUrl,
    text: text,
  };
};
