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

/** Extract the description from the content of the <meta name="description"> element in htmlDocument. */
const extractDescription = (htmlDocument: string): string => {
  const descriptionMatch = htmlDocument.match(
    /<meta[^>]*name="description"[^>]*content="([^"]*)"/,
  );
  return descriptionMatch?.[1] ?? "";
};

/** Extract the image URL from the content of the <meta name="og:image"> element in htmlDocument. */
const extractImageUrl = (htmlDocument: string): string | undefined => {
  const imageMatch = htmlDocument.match(
    /<meta[^>]*property="og:image"[^>]*content="([^"]*)"/,
  );
  return imageMatch?.[1];
};
