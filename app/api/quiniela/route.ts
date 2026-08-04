import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET() {
  try {
    const url =
      "https://megal-display.vercel.app/api/ver_resultados.php";

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = await res.text();

    const $ = cheerio.load(html);

    const numeros: string[] = [];

    $("div.text_azul_3").each((_, el) => {
      const txt = $(el).text().trim();

      if (/^\d{3}$/.test(txt)) {
        numeros.push(txt);
      }
    });

    const premios = numeros.slice(0, 20).map((numero, i) => ({
      puesto: i + 1,
      numero,
    }));

    return NextResponse.json({
      fecha: new Date().toLocaleDateString("es-UY"),
      premios,
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: "No se pudieron obtener los resultados",
      },
      { status: 500 }
    );
  }
}
