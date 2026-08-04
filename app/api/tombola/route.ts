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

    const dosDigitos: string[] = [];

    $("div.text_azul_3").each((_, el) => {
      const txt = $(el).text().trim();

      if (/^\d{2}$/.test(txt)) {
        dosDigitos.push(txt);
      }
    });

    const tombola = dosDigitos.slice(0, 20);

    return NextResponse.json({
      fecha: new Date().toLocaleDateString("es-UY"),
      numeros: tombola,
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
