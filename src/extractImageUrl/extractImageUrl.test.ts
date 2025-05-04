import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { createHtmlArticleString } from "../shared/brandedTypes/createHtmlArticleString";
import { createUrlString } from "../shared/brandedTypes/createUrlString";
import { extractImageUrl } from "./extractImageUrl";

const testCases = [
  {
    articleFileName: "article-1.html",
    expectedImageUrl: createUrlString(
      "https://asset.dr.dk/drdk/drupal-images/other/2025/02/05/scanpix-20210121-112144-7.jpg?AspectCrop=(1200,627),xPosition=.5,yPosition=.5;Resize=(1200,627)&impolicy=low",
    ),
  },
  {
    articleFileName: "article-2.html",
    expectedImageUrl: createUrlString(
      "https://asset.dr.dk/drdk/drupal-images/other/2025/02/07/scanpix-20240321-155341-3.jpg?AspectCrop=(1200,627),xPosition=.5,yPosition=.5;Resize=(1200,627)&impolicy=low",
    ),
  },
  {
    articleFileName: "article-3.html",
    expectedImageUrl: createUrlString(
      "https://asset.dr.dk/drdk/drupal-images/crop/2025/02/10/1739179597_scanpix-070815016889.jpg?AspectCrop=(1200,627),xPosition=.5,yPosition=.5;Resize=(1200,627)&impolicy=low",
    ),
  },
  {
    articleFileName: "article-4.html",
    expectedImageUrl: createUrlString(
      "https://asset.dr.dk/drdk/freja-images/328?AspectCrop=(1200,627),xPosition=.5,yPosition=.5;Resize=(1200,627)&impolicy=low",
    ),
  },
  {
    articleFileName: "article-5.html",
    expectedImageUrl: createUrlString(
      "https://asset.dr.dk/drdk/drupal-images/other/2025/02/05/scanpix-20250205-094256-l.jpg?AspectCrop=(1200,627),xPosition=.5,yPosition=.5;Resize=(1200,627)&impolicy=low",
    ),
  },
  {
    articleFileName: "article-6.html",
    expectedImageUrl: createUrlString(
      "https://asset.dr.dk/drdk/drupal-images/crop/2025/02/15/1739637825_20241114-130746-1-1920x1280web.jpg?AspectCrop=(1200,627),xPosition=.5,yPosition=.5;Resize=(1200,627)&impolicy=low",
    ),
  },
  {
    articleFileName: "article-7.html",
    expectedImageUrl: createUrlString(
      "https://asset.dr.dk/drdk/drupal-images/other/2025/02/05/scanpix-20250205-102211-7.jpg?AspectCrop=(1200,627),xPosition=.5,yPosition=.5;Resize=(1200,627)&impolicy=low",
    ),
  },
  {
    articleFileName: "article-8.html",
    expectedImageUrl: createUrlString(
      "https://asset.dr.dk/drdk/drupal-images/crop/2025/03/02/1740916794_scanpix-20230824-220945-3.jpg?AspectCrop=(1200,627),xPosition=.5,yPosition=.5;Resize=(1200,627)&impolicy=low",
    ),
  },
  {
    articleFileName: "article-9.html",
    expectedImageUrl: createUrlString(
      "https://asset.dr.dk/drdk/drupal-images/crop/2025/02/05/1738784396_scanpix-20241229-184741-l.jpg?AspectCrop=(1200,627),xPosition=.5,yPosition=.5;Resize=(1200,627)&impolicy=low",
    ),
  },
];

test.each(testCases)(
  "extractImageUrl extracts $expectedImageUrl from $articleFileName",
  async ({ articleFileName, expectedImageUrl }) => {
    const articleFullName = path.join(__dirname, "articles", articleFileName);
    const articleHtml = createHtmlArticleString(
      await readFile(articleFullName, {
        encoding: "utf-8",
      }),
    );

    const extractedImageUrl = extractImageUrl(articleHtml);

    expect(extractedImageUrl).toEqual(expectedImageUrl);
  },
);

// test("downloaded image is smaller than 1 million bytes", async () => {
//   const articleFileName = "article-1.html";
//   const articleFullName = path.join(__dirname, "articles", articleFileName);
//   const articleHtml = createHtmlArticleString(
//     await readFile(articleFullName, {
//       encoding: "utf-8",
//     }),
//   );
//   const imageUrl = extractImageUrl(articleHtml);

//   if (imageUrl === undefined) {
//     throw new Error("imageUrl is undefined.");
//   }

//   const response = await fetch(imageUrl);
//   const imageBuffer = await response.bytes();
//   expect(imageBuffer.length).toBeLessThan(1_000_000);
// });
