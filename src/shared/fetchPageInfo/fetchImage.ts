export const fetchImage = async (imageUrl: URL) => {
  let imageResponse;
  try {
    imageResponse = await fetch(imageUrl);
  } catch (error) {
    console.error(`Error fetching image ${imageUrl}:`, error);
    return undefined;
  }

  if (!imageResponse.ok) {
    return undefined;
  }

  const contentType = imageResponse.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    return undefined;
  }

  try {
    return await imageResponse.bytes();
  } catch (error) {
    console.error(`Error reading image bytes from ${imageUrl}:`, error);
    return undefined;
  }
};
