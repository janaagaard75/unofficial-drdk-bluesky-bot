import sharp from "sharp";

const maximumImageSizeOnBlueskyInBytes = 1_000_000;

export const compressImage = async (
  image: Blob | undefined,
): Promise<Blob | undefined> => {
  if (image === undefined) {
    return undefined;
  }

  const sharpImage = sharp(await image.arrayBuffer());
  const metadata = await sharpImage.metadata();

  if (metadata.size === undefined) {
    return undefined;
  }

  let quality = 85;

  do {
    const compressedBuffer = await sharpImage
      .webp({ quality: quality })
      .toBuffer();

    if (compressedBuffer.byteLength <= maximumImageSizeOnBlueskyInBytes) {
      return new Blob([compressedBuffer], { type: "image/webp" });
    }

    quality -= 5;
  } while (quality > 0);

  return undefined;
};
