import { JSDOM } from "jsdom";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { UrlString } from "../shared/brandedTypes/UrlString";

puppeteerExtra.use(StealthPlugin());

export const getDocumentObjectModel = async (
  url: UrlString,
): Promise<JSDOM | undefined> => {
  const browser = await puppeteerExtra.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle0" });
  } catch (error) {
    console.error(`Error navigating to ${url}:`, error);
    await browser.close();
    return undefined;
  }

  const htmlContent = await page.content();
  await browser.close();

  const dom = new JSDOM(htmlContent, { url: url });
  return dom;
};
