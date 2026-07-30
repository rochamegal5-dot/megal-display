import { cargarPagina } from "./scraper";

const URL =
  "https://www.loteria.gub.uy/ver_resultados.php";

export async function obtenerQuiniela() {

  const $ = await cargarPagina(URL);

  // Aquí iremos leyendo la estructura real
  // del HTML oficial.

  console.log($.html());

  return {
    fecha: "",
    vespertina: [],
    nocturna: [],
  };
}
