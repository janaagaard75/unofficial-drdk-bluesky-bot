import { AtpAgent } from "@atproto/api";
import { fetchHeroImage } from "./fetchHeroImage";

export const getHeroImageBlob = async (agent: AtpAgent, url: string) => {
  const imageBuffer = await fetchHeroImage(url);
  if (imageBuffer === undefined) {
    return undefined;
  }

  const uploadedImage = await agent.uploadBlob(new Uint8Array(imageBuffer));
  return uploadedImage?.data.blob;
};
