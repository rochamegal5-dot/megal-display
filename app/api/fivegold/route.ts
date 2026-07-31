import { NextResponse } from "next/server";

import { getResultados } from "@/services/providers/provider";

export async function GET() {

  const datos = await getResultados();

  return NextResponse.json({

    fecha: datos.fecha,

    sorteo: datos.fiveGold,

    ultimaActualizacion: new Date(),

    estado: "OK"

  });

}
