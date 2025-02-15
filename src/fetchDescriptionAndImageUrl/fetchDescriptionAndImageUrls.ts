import { extractImageDescriptionsAndUrls } from "../extractImageUrls/extractImageDescriptionsAndUrls";
import { extractDescription } from "./extractDescription";

export const fetchDescriptionAndImageUrls = async (url: string) => {
  try {
    const response = await fetch(url);
    const htmlDocument = await response.text();

    const description = extractDescription(htmlDocument);
    const imageDescriptionsAndUrls =
      extractImageDescriptionsAndUrls(htmlDocument);

    return {
      description: description,
      images: imageDescriptionsAndUrls,
    };
  } catch (error) {
    console.error("Failed to fetch description and image.", url, error);
    return undefined;
  }
};
