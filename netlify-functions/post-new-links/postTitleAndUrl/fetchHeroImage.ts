import { extract } from "@extractus/article-extractor";

export const fetchHeroImage = async (url: string) => {
  const article = await extract(url);

  if (article?.image === undefined) {
    return undefined;
  }

  const downloadedImage = await fetch(article.image);
  const imageBuffer = await downloadedImage.arrayBuffer();
  return imageBuffer;
};
