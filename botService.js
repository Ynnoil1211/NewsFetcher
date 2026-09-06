const TEL = process.env.WHATSAPP_PHONE; //process.env lee las variables dentro de .env
const API = process.env.CALLMEBOT_API_KEY;

export async function sendWhatsApp(message) {
  const url = `https://api.callmebot.com/whatsapp.php?phone=${TEL}&text=${encodeURIComponent(message)}&apikey=${API}`;
  const response = await fetch(url);
  if (response.ok) {
    console.log(`Exitoso ${response.status}`);
  } else {
    console.log(`Error: ${response.status}`);
  }
  console.log(`\n${await response.text()}`);
}
