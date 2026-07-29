import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    fecha: "28/07/2026",

    sorteo: {
      bolillas: [3, 12, 18, 25, 41],
      bolillaExtra: 7,

      revancha: [2, 9, 15, 27, 46],

      pozoDeOro: "$ 35.600.000",
      pozoRevancha: "$ 12.400.000",
      pozoDePlata: "$ 2.800.000",
    },

    ultimaActualizacion: new Date().toLocaleTimeString("es-UY", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),

    estado: "OK",
  });
}
