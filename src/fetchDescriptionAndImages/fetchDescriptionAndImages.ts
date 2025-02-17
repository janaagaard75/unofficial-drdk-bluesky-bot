import { extractImageUrl } from "../extractImageDescriptionsAndUrls/extractImageUrl";
import { extractDescription } from "./extractDescription";

export const fetchDescriptionAndImages = async (url: string) => {
  try {
    const response = await fetch(url);
    const articleHtml = await response.text();

    const description = extractDescription(articleHtml);
    const imageUrl = extractImageUrl(articleHtml);

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
