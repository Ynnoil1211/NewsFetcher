const TEL = process.env.WHATSAPP_PHONE; //process.env lee las variables dentro de .env
const API = process.env.CALLMEBOT_API_KEY;
let initM = "adivina quien soy";
let message = encodeURIComponent(initM); //ej: convierte espacio en "%20"
// los template literales usan  ` ${variable} `
const url = `https://api.callmebot.com/whatsapp.php?phone=${TEL}&text=${message}&apikey=${API}`;

//top-level await
// fetch hace peticion asincrona
const response = await fetch(url); //fetch retorna un Promise, resultado de una operacion asincrona, dara respuesta mas adelante
// await pausa la ejecucion hasta que fetch retorne algo, no bloquea el hilo
// response = de tipo Response

if (response.ok) {
  console.log("respuesta exitosa");
} else {
  console.log("no hay respuesta");
}
console.log(response.status);
console.log(await response.text());
