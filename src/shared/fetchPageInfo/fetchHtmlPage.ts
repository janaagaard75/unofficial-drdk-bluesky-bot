import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { HtmlString } from "../../shared/brandedTypes/HtmlString";
import { brand } from "../../shared/brandedTypes/brand";

puppeteerExtra.use(StealthPlugin());

export const fetchHtmlPage = async (
  url: URL,
): Promise<HtmlString | undefined> => {
  const browser = await puppeteerExtra.launch({
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  try {
    await page.goto(url.href, { waitUntil: "domcontentloaded" });
  } catch (error) {
    console.error(`Error navigating to ${url}:`, error);
    await browser.close();
    return undefined;
  }

  const htmlContent = await page.content();
  await browser.close();

  return brand<HtmlString>(htmlContent);
};
