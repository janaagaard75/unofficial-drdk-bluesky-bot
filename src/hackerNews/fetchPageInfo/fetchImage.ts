export const fetchImage = async (imageUrl: URL) => {
  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    return undefined;
  }

  const contentType = imageResponse.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    return undefined;
  }

  return await imageResponse.bytes();
};
