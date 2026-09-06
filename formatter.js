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
    //for each item in filtered news
    const { category, articles } = item.value; //get category and articles from item
    const categoryName = dic[category]; //change display name
    const articlesText = articles
      .slice(0, 2) //only selecting 2 of them
      .map((art) => {
        //for each article of those 2 selected
        return `*${art.title}*\n  ${art.url}`; //get the article's title + url
      })
      .join("\n"); //join each article together and save them into articlesText
    return `*${categoryName}*\n${articlesText}`; //return display name + articlesText
  });
  return news.join("\n");
}
