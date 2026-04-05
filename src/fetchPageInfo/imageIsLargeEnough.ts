import imageSize from "image-size";

export const imageIsLargeEnough = (
  image: Uint8Array<ArrayBuffer>,
  minimumSize: number,
): boolean => {
  const dimensions = imageSize(image);
  return dimensions.width >= minimumSize && dimensions.height >= minimumSize;
};
