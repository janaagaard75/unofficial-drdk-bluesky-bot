import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { HtmlString } from "../shared/HtmlString";
import { UrlString } from "../shared/UrlString";
import { extractImageDescriptionsAndUrls } from "./extractImageDescriptionsAndUrls";

test("extractImageUrls", async () => {
  const articlePath = path.join(__dirname, "articleWithMultipleImages.html");
  const articleHtml = (await readFile(articlePath, {
    encoding: "utf-8",
  })) as HtmlString;
  const expectedUrls = [
    "https://www.dr.dk/images/other/2025/02/07/scanpix-20240321-155341-3.jpg",
    "https://www.dr.dk/images/other/2025/02/07/scanpix-000_9q34yz.jpg",
    "https://www.dr.dk/images/other/2025/02/07/scanpix-20241217-161646-6.jpg",
  ] as Array<UrlString>;

  const extractedUrls = extractImageDescriptionsAndUrls(articleHtml).map(item => item.url);
  expect(extractedUrls).toEqual(expectedUrls);
});
