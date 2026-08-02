import type { CheerioAPI } from "cheerio";

export interface Premio {
  puesto: number;
  numero: string;
}

export interface QuinielaResponse {
  fecha: string;
  vespertina: Premio[];
  nocturna: Premio[];
}

function leerBloque($: CheerioAPI, titulo: string): Premio[] {

  const premios: Premio[] = [];

  const logo = $(`img[src*="${titulo}"]`).first();

  if (!logo.length) return premios;

  const tabla = logo.closest("table").nextAll("table").first();

  tabla.find(".text_azul_3").each((i, el) => {

    const numero = $(el).text().trim();

    if (/^\d{3}$/.test(numero)) {

      premios.push({

        puesto: premios.length + 1,

        numero

      });

    }

  });

  return premios.slice(0,20);

}

export function parseQuiniela($: CheerioAPI): QuinielaResponse {

  const fecha =
    $("body").text().match(/\d{2}\/\d{2}\/\d{4}/)?.[0] ?? "";

  return {

    fecha,

    vespertina: leerBloque($, "logo_quiniela"),

    nocturna: leerBloque($, "logo_quiniela"),

  };

}
