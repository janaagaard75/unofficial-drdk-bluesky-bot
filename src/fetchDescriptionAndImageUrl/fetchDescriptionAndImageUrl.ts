import { extractDescription } from "./extractDescription";
import { extractImageUrl } from "./extractImageUrl";

export const fetchDescriptionAndImageUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    const htmlDocument = await response.text();

    const description = extractDescription(htmlDocument);
    const imageUrl = extractImageUrl(htmlDocument);

    return {
      description: description,
      imageUrl: imageUrl,
    };
  } catch (error) {
    console.error("Failed to fetch description and image.", url, error);
    return undefined;
  }
};
