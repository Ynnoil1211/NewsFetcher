const dic = {
  world: "World",
  politics: "Politics",
  technology: "Technology",
  business: "Business",
  environment: "Environment",
  science: "Science",
  film: "Film",
  football: "Futchibol",
  money: "Money",
  colombia: "Colombia Local",
};
//export para que pueda ser usado en otros archivos
export function formatNews(results) {
  const filtered = results.filter((item) => item.status === "fulfilled"); //aqui filtered es un nuevo array con los items sin error
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
  const mid = Math.ceil(news.length / 2);
  const parte1 = news.slice(0, mid).join("\n");
  const parte2 = news.slice(mid).join("\n");
  const final = [parte1, parte2].filter((text) => text.trim().length !== 0);
  //almacenamos en final el mensaje final dividido en dos,
  // y antes de eso se verifica si luego de .trim() que elimina espacios el mensaje es vacio o no
  // solo retornamos mensajes con mensjaes.
  return final;
}
