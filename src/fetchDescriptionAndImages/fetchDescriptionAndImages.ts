import { extractImageUrl } from "../extractImageDescriptionsAndUrls/extractImageUrl";
import { createHtmlString } from "../shared/createHtmlString";
import { createPlainTextString } from "../shared/createPlainTextString";
import { PlainTextString } from "../shared/PlainTextString";
import { UrlString } from "../shared/UrlString";
import { extractDescription } from "./extractDescription";

interface DescriptionAndImages {
  readonly description: PlainTextString;
  readonly images: ReadonlyArray<{
    description: PlainTextString;
    url: UrlString | undefined;
  }>;
}

export const fetchDescriptionAndImages = async (
  url: UrlString,
): Promise<DescriptionAndImages | undefined> => {
  try {
    const response = await fetch(url);
    const articleHtml = createHtmlString(await response.text());

    const description = extractDescription(articleHtml);
    const imageUrl = extractImageUrl(articleHtml);

    return {
      description: description,
      images: [
        {
          description: createPlainTextString(""),
          url: imageUrl,
        },
      ],
    };
  } catch (error) {
    console.error("Failed to fetch description and image.", url, error);
    return undefined;
  }
};
