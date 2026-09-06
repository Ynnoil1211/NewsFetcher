const dic = {
  technology: "Tech",
  science: "Science",
  business: "Business",
  world: "World",
  sports: "Sports",
};

export function formatNews(results) {
  const filtered = results.filter((item) => item.status === "fulfilled");
  const news = filtered.map((item) => {
    const { category, articles } = item.value;
    const categoryName = dic[category];
    const articlesText = articles
      .slice(0, 2)
      .map((art) => {
        return `*${art.title}*\n  ${art.url}`;
      })
      .join("\n");
    return `*${categoryName}*\n${articlesText}`;
  });
  return news.join("\n");
}
