import * as cheerio from "cheerio";

export async function obtenerHTML(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }

  return await res.text();
}

export async function cargarPagina(url: string) {
  const html = await obtenerHTML(url);
  return cheerio.load(html);
}
