import { extract } from "@extractus/article-extractor";

export const fetchDescriptionAndImage = async (url: string) => {
  try {
    const article = await extract(url);

    if (article?.image === undefined) {
      return undefined;
    }

    const downloadedImage = await fetch(article.image);
    const imageBuffer = await downloadedImage.arrayBuffer();

    return {
      description:
        article.content
          ?.replaceAll(/<figcaption>.*?<\/figcaption>/g, "")
          .split(/<[^>]*>/)
          .flatMap((text) => {
            if (text === "") {
              return [];
            }

            return [text];
          })
          .splice(0, 3)
          .join(" ") ?? "",
      image: imageBuffer,
    };
  } catch (error) {
    console.error("Failed to fetch description and image.", url, error);
    return undefined;
  }
};
