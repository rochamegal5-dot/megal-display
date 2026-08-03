import { NextResponse } from "next/server";
import { getResultados } from "@/services/providers/provider";

export async function GET() {

  try {

    const datos = await getResultados();

    return NextResponse.json({
      fecha: datos.fecha,
      vespertina: datos.quiniela.vespertina,
      nocturna: datos.quiniela.nocturna,
      ultimaActualizacion: new Date(),
      estado: "OK"
    });

  } catch (error) {

    return NextResponse.json(
      {
        error: "No se pudieron obtener los resultados."
      },
      {
        status: 500
      }
    );

  }

}
