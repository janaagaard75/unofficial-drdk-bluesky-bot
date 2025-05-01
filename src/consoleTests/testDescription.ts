import { fetchDescriptionAndImages } from "../fetchDescriptionAndImages/fetchDescriptionAndImages";
import { testUrls } from "./testUrls";

const main = async () => {
  for (const url of testUrls) {
    const descriptionAndImage = await fetchDescriptionAndImages(url);
    console.log();
    console.log(descriptionAndImage);
  }
};

await main();
