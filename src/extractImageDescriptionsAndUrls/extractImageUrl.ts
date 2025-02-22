/** Extract the image URL from the content of the <meta name="og:image"> element in htmlDocument. */
export const extractImageUrl = (htmlDocument: string): string | undefined => {
  const imageMatch = /<meta[^>]*property="og:image"[^>]*content="([^"]*)"/.exec(
    htmlDocument,
  );
  return imageMatch?.[1];
};
