const dic = {
  world: "World",
  politics: "Politics",
  technology: "Technology",
  business: "Business",
  environment: "Environment",
  science: "Science",
  film: "Film",
  football: "Football",
  money: "Money",
};

export function formatNews(results) {
  const filtered = results.filter((item) => item.status === "fulfilled");
  const news = filtered.map((item) => {
    //for each item in filtered news
    const { category, articles } = item.value; //get category and articles from item
    const categoryName = dic[category]; //change display name
    const articlesText = articles
      .slice(0, 3) //only selecting 3 of them
      .map((art) => {
        //for each article of those 3 selected
        return `<b>${art.title}</b>\n${art.url}\n`; //get the article's title + url
      })
      .join("\n"); //join each article together and save them into articlesText
    return `<b>${categoryName}</b>\n${articlesText}`; //return display name + articlesText
  });
  return news.join("\n");
}
