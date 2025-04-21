export const fetchArticleHtml = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const pageHtml = await response.text();
  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/;
  const articleMatch = articleRegex.exec(pageHtml);

  if (articleMatch === null || articleMatch[1] === undefined) {
    return "";
  }

  return articleMatch[1];
};
