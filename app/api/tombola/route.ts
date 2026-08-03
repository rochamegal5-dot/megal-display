import { NextResponse } from "next/server";

import { getResultados } from "@/services/providers/provider";

export async function GET() {
  const datos: any = await getResultados();

    return NextResponse.json({

    fecha: datos.fecha,

    sorteo: datos.tombola,

    ultimaActualizacion: new Date(),

    estado: "OK"

  });

}
