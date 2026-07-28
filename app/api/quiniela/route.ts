import { NextResponse } from "next/server";

function generarResultados() {
  return Array.from({ length: 20 }, (_, i) => ({
    puesto: i + 1,
    numero: String(Math.floor(Math.random() * 10000)).padStart(4, "0"),
  }));
}

export async function GET() {
  return NextResponse.json({
    fecha: "28/07/2026",

    sorteo: {
      vespertina: generarResultados(),
      nocturna: generarResultados(),
    },

    ultimaActualizacion: new Date().toLocaleTimeString("es-UY", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  });
}
