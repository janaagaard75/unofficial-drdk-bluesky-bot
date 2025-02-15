import { extractImageDescriptionsAndUrls } from "../extractImageDescriptionsAndUrls/extractImageDescriptionsAndUrls";
import { extractDescription } from "./extractDescription";

export const fetchDescriptionAndImages = async (url: string) => {
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
