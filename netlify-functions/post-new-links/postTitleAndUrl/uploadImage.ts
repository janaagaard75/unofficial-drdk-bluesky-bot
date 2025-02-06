import { AtpAgent } from "@atproto/api";

export const uploadImage = async (
  agent: AtpAgent,
  imageBuffer: ArrayBuffer | undefined
) => {
  if (imageBuffer === undefined) {
    return undefined;
  }

  const uploadedImage = await agent.uploadBlob(new Uint8Array(imageBuffer));
  return uploadedImage?.data.blob;
};
