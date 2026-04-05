import { AtpAgent } from "@atproto/api";

export const uploadImage = async (agent: AtpAgent, image: Blob | undefined) => {
  if (image === undefined) {
    return undefined;
  }

  try {
    const uploadedImageResponse = await agent.uploadBlob(image);
    const uploadedImageReference = uploadedImageResponse.data.blob;
    return uploadedImageReference;
  } catch (error) {
    console.error("Failed to upload image.", error);
    return undefined;
  }
};
