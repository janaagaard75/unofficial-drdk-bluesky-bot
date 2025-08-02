import { fromBlob } from "image-resize-compress";

export const compressImage = async (
  image: Blob | undefined,
  maxSizeBytes: number,
): Promise<Blob | undefined> => {
  if (image === undefined) {
    return undefined;
  }

  if (image.size <= maxSizeBytes) {
    return image;
  }

  let quality = 80;

  do {
    const compressedImage = await fromBlob(
      image,
      quality,
      "auto",
      "auto",
      "webp",
    );

    if (compressedImage.size <= maxSizeBytes) {
      return compressedImage;
    }

    quality -= 5;
  } while (quality > 0);

  return undefined;
};
