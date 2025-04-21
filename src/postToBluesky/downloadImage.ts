import { UrlString } from "../shared/UrlString";

export const downloadImage = async (imageUrl: UrlString | undefined) => {
  if (imageUrl === undefined) {
    return undefined;
  }

  try {
    const downloadedImage = await fetch(imageUrl);
    return await downloadedImage.arrayBuffer();
  } catch (error) {
    console.error("Failed to download image.", imageUrl, error);
    return undefined;
  }
};
