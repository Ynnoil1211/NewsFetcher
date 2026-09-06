import { getNews } from "./newsService.js";
import { formatNews } from "./formatter.js";
import { sendTelegram } from "./botService.js";

try {
  const news = await getNews();
  const final = formatNews(news);
  if (!final.trim())
    throw new Error(`La lista de noticias esta vacia, ${news.length}`);
  await sendTelegram(final);
} catch (error) {
  console.error("Error Ocurred." + error);
  process.exit(1);
}
