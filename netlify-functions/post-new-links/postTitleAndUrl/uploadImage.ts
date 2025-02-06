import { AtpAgent } from "@atproto/api";

export const uploadImage = async (
  agent: AtpAgent,
  imageBuffer: ArrayBuffer | undefined
) => {
  try {
    if (imageBuffer === undefined) {
      return undefined;
    }

    const uploadedImage = await agent.uploadBlob(new Uint8Array(imageBuffer));
    return uploadedImage?.data.blob;
  } catch (error) {
    console.error("Failed to upload image", error);
    return undefined;
  }
};
