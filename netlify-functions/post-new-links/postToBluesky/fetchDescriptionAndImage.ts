export const fetchDescriptionAndImage = async (url: string) => {
  try {
    const response = await fetch(url);
    const htmlDocument = await response.text();

    const description = extractDescription(htmlDocument);
    const imageUrl = extractImageUrl(htmlDocument);

    const imageBuffer = await (async () => {
      if (imageUrl === undefined) {
        return undefined;
      }

      const downloadedImage = await fetch(imageUrl);
      return await downloadedImage.arrayBuffer();
    })();

    return {
      description: description,
      image: imageBuffer,
    };
  } catch (error) {
    console.error("Failed to fetch description and image.", url, error);
    return undefined;
  }
};

/** Extract the description from the content of the <meta name="description"> element in htmlDocument. */
const extractDescription = (htmlDocument: string): string => {
  const descriptionMatch = htmlDocument.match(
    /<meta[^>]*name="description"[^>]*content="([^"]*)"/
  );
  return descriptionMatch?.[1] ?? "";
};

/** Extract the image URL from the content of the <meta name="og:image"> element in htmlDocument. */
const extractImageUrl = (htmlDocument: string): string | undefined => {
  const imageMatch = htmlDocument.match(
    /<meta[^>]*property="og:image"[^>]*content="([^"]*)"/
  );
  return imageMatch?.[1];
};
