import { NextResponse } from "next/server";

interface Resultado {
  puesto: number;
  numero: string;
}

function generarResultados(): Resultado[] {
  return Array.from({ length: 20 }, (_, i) => ({
    puesto: i + 1,
    numero: String(Math.floor(Math.random() * 100)).padStart(2, "0"),
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

    estado: "OK",
  });
}
