import { getNews } from "./newsService.js";
import { formatNews } from "./formatter.js";
import { sendTelegram } from "./botService.js";

try {
  const news = await getNews();
  const messageList = formatNews(news);
  if (messageList.length === 0)
    throw new Error(`La lista de noticias esta vacia`);

  for (const message of messageList) {
    await sendTelegram(message); //dividir el mensjae en dos separados
  }
} catch (error) {
  console.error("Error Ocurred." + error);
  process.exit(1);
}
