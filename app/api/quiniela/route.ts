import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

function extraerPremiosDesdeTabla($: cheerio.CheerioAPI, tabla: cheerio.Cheerio<any>) {
  const premios: Array<{ puesto: number; numero: string }> = [];

  tabla.find("tbody tr").each((_, fila) => {
    const celdas = $(fila).find("td");

    if (celdas.length < 4) return;

    const numero1 = $(celdas[1]).text().trim();
    const numero2 = $(celdas[3]).text().trim();

    const tieneNumeros = /^\d{3}$/.test(numero1) || /^\d{3}$/.test(numero2);
    if (!tieneNumeros) return;

    if (/^\d{3}$/.test(numero1)) {
      premios.push({ puesto: premios.length + 1, numero: numero1 });
    }

    if (/^\d{3}$/.test(numero2)) {
      premios.push({ puesto: premios.length + 1, numero: numero2 });
    }
  });

  return premios.slice(0, 20);
}

export async function GET() {
  try {
    const url = "https://quinielamontevideo.com/";

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!res.ok) {
      throw new Error(`El servicio externo respondió con ${res.status}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const fecha = $("body").text().match(/\d{2}\/\d{2}\/\d{4}/)?.[0] ?? new Date().toLocaleDateString("es-UY");

    const sorteos: Record<string, Array<{ puesto: number; numero: string }>> = {
      vespertina: [],
      nocturna: [],
    };

    $("div.shadow.alert")
      .has("h3")
      .each((_, contenedor) => {
        const titulo = $(contenedor).find("h3").text().trim().toLowerCase();
        const tabla = $(contenedor).find("table").first();

        if (!tabla.length) return;

        const premios = extraerPremiosDesdeTabla($, tabla);
        if (premios.length === 0) return;

        if (titulo.includes("nocturno")) {
          sorteos.nocturna = premios;
        } else if (titulo.includes("vespertino")) {
          sorteos.vespertina = premios;
        }
      });

    return NextResponse.json({
      fecha,
      sorteo: {
        vespertina: sorteos.vespertina,
        nocturna: sorteos.nocturna,
      },
      ultimaActualizacion: new Date().toLocaleTimeString("es-UY"),
      estado: "OK",
    });
  } catch (e) {
    console.error("Error al obtener quiniela", e);

    return NextResponse.json(
      {
        error: "No se pudieron obtener los resultados",
        fecha: new Date().toLocaleDateString("es-UY"),
        sorteo: {
          vespertina: [],
          nocturna: [],
        },
        ultimaActualizacion: new Date().toLocaleTimeString("es-UY"),
      },
      { status: 500 }
    );
  }
}
