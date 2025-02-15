import { extractDescription } from "./extractDescription";
import { extractImageUrl } from "./extractImageUrl";

export const fetchDescriptionAndImageUrls = async (url: string) => {
  try {
    const response = await fetch(url);
    const htmlDocument = await response.text();

    const description = extractDescription(htmlDocument);
    const imageUrl = extractImageUrl(htmlDocument);

    return {
      description: description,
      images: [
        {
          description: undefined,
          url: imageUrl,
        },
      ],
    };
  } catch (error) {
    console.error("Failed to fetch description and image.", url, error);
    return undefined;
  }
};
