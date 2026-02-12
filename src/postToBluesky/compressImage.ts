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

  const originalSize = metadata.size;

  let quality = 85;

  do {
    const compressedBuffer = await sharpImage
      .webp({ quality: quality })
      .toBuffer();

    const compressedSize = compressedBuffer.byteLength;
    if (compressedSize <= maximumImageSizeOnBlueskyInBytes) {
      console.log(
        `Compressed the image from ${originalSize} bytes to ${compressedSize} bytes with quality ${quality}.`,
      );

      return new Blob([new Uint8Array(compressedBuffer)], {
        type: "image/webp",
      });
    }

    quality -= 5;
  } while (quality > 0);

  return undefined;
};
