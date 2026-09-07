const TEL = process.env.TELEGRAM_CHAT_ID; //process.env lee las variables dentro de .env
const API = process.env.TELEGRAM_BOT_TOKEN;
//export para que pueda ser usado en otros archivos
export async function sendTelegram(message) {
  //usamos POST en vez de
  // GET (const url = `https://api.telegram.org/bot${API}/sendMessage?chat_id=${TEL}&text=${encodeURIComponent(message)}`;)
  const url = `https://api.telegram.org/bot${API}/sendMessage`;
  const response = await fetch(url, {
    //para POST es necesario enviar un body con los datos a enviar
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TEL,
      text: message,
      parse_mode: "HTML",
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`\nError: ${response.status}: ${data.description}`); //json.atributo
  }
  console.log(`Exitoso ${response.status}`);
  return data;
}
