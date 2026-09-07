const API = process.env.GUARDIAN_API_KEY;
//una funcion async retorna Promise
async function getCategoryNews(category) {
  const url = `https://content.guardianapis.com/search?section=${category}&order-by=newest&page-size=5&api-key=${API}`;
  const response = await fetch(url); //esperar hasta que el servidor responda con fetch
  //fetch retorna Promise
  if (!response.ok) {
    throw new Error(`Error en categoria ${category}: HTTP${response.status}`); //.ok y .status son propiedades de una Promise
  } //early exit

  const data = await response.json(); //Parseamos el fetch a json
  const articles = data.response.results.map((art) => {
    //acceso al json->response(resultado del fetch)->results(contenido del response)
    //.map() para acceder a cada elemento dentro del json
    return {
      title: art.webTitle,
      url: art.webUrl,
    }; //aqui empaquetamos el title y url en un objeto, y se retorna a un array de objeto llamado articles
  });
  //
  // aqui tambien se puede usar const {articles} = await response.json(); para obtner directamente los articles, sin el .map
  return { category, articles }; //retornamos la categoria entregada y los articles en un objeto
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

//export para que pueda ser usado en otros archivos
export async function getNews() {
  const categories = ["world", "politics", "technology", "business"];

  //const promises = categories.map(getCategoryNews);
  //
  //obtengo un array de 5 Promises
  //lista.map(funcionNombre) aplica la funcion a cada elemento de la lista y retorna la nueva lista
  //como async retorna Promise, promises = array de Promise
  //equivalente a const promises = categories.map((cat) => getCategoryNews(cat));
  //aqui promises contiene los promise obtenido mediante el fetch en la funcion getCategoryNews
  // Descartado: GNews solo acepta un api call por cada segundo
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
        value: await getCategoryNews(cat), // siempre se usa await cuando desea obtener el resultado de la ejecucion primero
      };
      //guardamos en x el resultado del fetch y el status, si no fue exitosa, simplemente se catchea el error
      results.push(x);
      // o results.push({status: 'fulfilled', value: x});
      await delay(1500);
    } catch (error) {
      results.push({ status: "rejected", reason: error }); //si hubo error, se incluye en result tambien para mostrarlo
    }
  }
  return results;
}
