import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    fecha: new Date().toLocaleDateString("es-UY"),
    dolar: "$ 42.50",
    euro: "$ 45.80",
    uy: "$ 1.00",
  });
}
