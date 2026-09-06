const TEL = process.env.TELEGRAM_CHAT_ID; //process.env lee las variables dentro de .env
const API = process.env.TELEGRAM_BOT_TOKEN;

export async function sendTelegram(message) {
  //usamos POST en vez de
  // GET (const url = `https://api.telegram.org/bot${API}/sendMessage?chat_id=${TEL}&text=${encodeURIComponent(message)}`;)
  const url = `https://api.telegram.org/bot${API}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TEL,
      text: message,
      parse_mode: "HTML",
    }),
  });
  if (response.ok) {
    console.log(`Exitoso ${response.status}`);
  } else {
    const errData = await response.json();
    throw new Error(`\nError: ${response.status}: ${errData.description}`);
  }
  const data = await response.json();
  return data;
}
