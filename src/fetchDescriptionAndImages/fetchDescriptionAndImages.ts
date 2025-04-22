import { extractImageUrl } from "../extractImageDescriptionsAndUrls/extractImageUrl";
import { HtmlString } from "../shared/HtmlString";
import { PlainTextString } from "../shared/PlainTextString";
import { UrlString } from "../shared/UrlString";
import { extractDescription } from "./extractDescription";

interface DescriptionAndImages {
  description: PlainTextString | undefined;
  images: Array<{
    description: PlainTextString | undefined;
    url: UrlString | undefined;
  }>;
}

export const fetchDescriptionAndImages = async (
  url: UrlString,
): Promise<DescriptionAndImages | undefined> => {
  try {
    const response = await fetch(url);
    const articleHtml = (await response.text()) as HtmlString;

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
