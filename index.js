import { getNews } from "./newsService.js";
import { formatNews } from "./formatter.js";
import { sendTelegram } from "./botService.js";

try {
  const news = await getNews();
  const final = formatNews(news);
  if (!final.trim())
    //.trim() borra los espacios, si luego de eso resulta ser un string vacio (null en js), hay error
    throw new Error(`La lista de noticias esta vacia`);
  await sendTelegram(final); //aqui puede lanzar error
} catch (error) {
  console.error("Error Ocurred." + error);
  process.exit(1);
}
