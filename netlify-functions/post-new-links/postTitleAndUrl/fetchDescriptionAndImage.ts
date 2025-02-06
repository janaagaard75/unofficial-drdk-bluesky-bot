import { extract } from "@extractus/article-extractor";

export const fetchDescriptionAndImage = async (url: string) => {
  const article = await extract(url);

  if (article?.image === undefined) {
    return undefined;
  }

  const downloadedImage = await fetch(article.image);
  const imageBuffer = await downloadedImage.arrayBuffer();

  return {
    description: article.description,
    image: imageBuffer,
  };
};
