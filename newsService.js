const API = process.env.GUARDIAN_API_KEY;
//una funcion async retorna Promise
async function getCategoryNews(category) {
  const url = `https://content.guardianapis.com/search?section=${category}&order-by=newest&page-size=5&api-key=${API}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error en categoria ${category}: HTTP${response.status}`);
  }
  const data = await response.json(); //Promise parseado en JSON.
  const articles = data.response.results.map((art) => {
    //accedo a los results de la response del JSON
    return {
      title: art.webTitle,
      url: art.webUrl,
    };
  });
  //const { articles } = await response.json(); //response guarda lo que retorna fetch
  // response.json() lee el stream guardado en response, y lo parsea a un objeto de JavaScript
  // const { articles } desestructura toda la entrada, y solo extrae los datos con nombre articles
  return { category, articles };
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
//equivalente a const delay = (ms) => new Promise( (resolve) => setTimeout(resolve, ms) );
//lo que hace delay es "pausar" la ejecucion del codigo (no del hilo) por x cantidad de tiempo
// crea una promise, que se cumple cuando setTimeout termine de ejecutar (llama a resolve);
// el motivo de esto es, para no pausar el hilo (perdidad de informacion por fetch), hay que pausar el codigo
// y se instancia una nueva promise para reaccionar con el await
// asi se puedo usar await delay(1000) para pausar el codigo por 1s.
//

export async function getNews() {
  const categories = ["world", "politics", "technology", "business"];
  //const promises = categories.map(getCategoryNews);
  //
  //obtengo un array de 5 Promises
  //lista.map(funcionNombre) aplica la funcion a cada elemento de la lista y retorna la nueva lista
  //como async retorna Promise, promises = array de Promise
  //equivalente a const promises = categories.map((cat) => getCategoryNews(cat));
  //aqui promises contiene los promise obtenido mediante el fetch en la funcion getCategoryNews
  // Descartado: GNews solo acepta un api call por cada segundo.
  // Usamos Delay(ms) para pausar el hilo por 1s
  //Event Loop:
  //Promise.allSettled espera a que los fetch terminen, y lo guarda en results.
  // .allSettled() = retornar cuando termine, sin importa si fallo o no,
  // Promise.all() = Modo estricto, solo retorna si las peticiones fueron exitosas
  // const results = await Promise.allSettled(promises);

  //2da version del codigo:
  const results = [];
  for (const cat of categories) {
    try {
      const x = {
        status: "fulfilled",
        value: await getCategoryNews(cat),
      };
      // siempre se usa await cuando desea obtener el resultado de la ejecucion primero
      results.push(x);
      // o results.push({status: 'fulfilled', value: x});
      await delay(1500);
    } catch (error) {
      results.push({ status: "rejected", reason: error });
    }
  }
  return results;
}
// console.log(await getNews());

/*
 * ============================================================================
 * 📚 SÍNTESIS TEÓRICA - LO QUE APRENDÍ EN ESTE MÓDULO (FASE 2)
 * ============================================================================
 *
 * 1. Naturaleza de las Promesas y Asincronía:
 *    - Toda función marcada con `async` siempre retorna implícitamente una `Promise`.
 *    - La palabra clave `await` suspende la ejecución local de la función sin
 *      bloquear el hilo del sistema operativo, permitiendo que el Event Loop siga activo.
 *
 * 2. Desestructuración de Objetos (Object Destructuring):
 *    - `response.json()` lee el stream de datos y lo parsea a un objeto en memoria.
 *    - La sintaxis `{ articles } = await response.json()` extrae directamente la propiedad
 *      `articles` sin requerir getters ni clases intermedias (POJOs en Java o structs en C++).
 *
 * 3. Rate Limiting en APIs del Mundo Real (HTTP 429):
 *    - Una API puede otorgar cuota diaria holgada (ej. 100 req/día), pero aplicar límites
 *      estrictos de frecuencia por segundo (ej. 1 req/seg). Disparar peticiones simultáneas
 *      desencadena errores 429 ("Too Many Requests").
 *
 * 4. El Event Loop vs Hilos del SO (Creación de Promesas y Temporizadores):
 *    - En C++ (`std::this_thread::sleep_for`) o Java (`Thread.sleep`), pausar implica
 *      congelar el hilo del sistema operativo.
 *    - En JS, `new Promise(resolve => setTimeout(resolve, ms))` delega la temporización al
 *      reloj interno de Node (`libuv`) y libera el hilo principal, despertando la función
 *      únicamente cuando se cumple el tiempo (`resolve()`).
 *
 * 5. Iteración Resiliente y Tolerancia a Fallos:
 *    - Envolver cada llamada asíncrona dentro de un `try...catch` en un bucle `for...of`
 *      permite aislar fallos individuales, emulando el comportamiento de `Promise.allSettled`:
 *      si una categoría falla, se registra como rechazada pero el proceso continúa para las demás.
 * ============================================================================
 */
