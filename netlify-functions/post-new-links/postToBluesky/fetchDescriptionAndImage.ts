import { extract } from "@extractus/article-extractor";

export const fetchDescriptionAndImage = async (url: string) => {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Find first image in a figure element
    const figureMatch = html.match(
      /<figure[^>]*?>.*?<img[^>]*src="([^"]*?)".*?<\/figure>/s
    );
    const imageUrl = figureMatch?.[1];

    const imageBuffer = await (async () => {
      if (imageUrl === undefined) {
        return undefined;
      }

      const downloadedImage = await fetch(imageUrl);
      return await downloadedImage.arrayBuffer();
    })();

    const article = await extract(url);
    if (!article) {
      return undefined;
    }

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
