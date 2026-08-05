import { NextResponse } from "next/server";
import { getResultados } from "@/services/providers/provider";

export async function GET() {
  const datos: any = await getResultados();

  return NextResponse.json({
    fecha: datos?.fecha ?? "",
    bolillas: datos?.fiveGold?.numeros ?? [],
    revancha: datos?.fiveGold?.revancha ?? [],
    extra: datos?.fiveGold?.extra ?? 0,
    pozoDeOro: datos?.fiveGold?.pozo ?? "",
    pozoRevancha: datos?.fiveGold?.pozoRevancha ?? "",
    ultimaActualizacion: new Date(),
    estado: "OK",
  });
}
