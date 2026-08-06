import { NextResponse } from "next/server";

const API_USD = "https://api.exchangerate.host/latest?base=USD&symbols=UYU";
const API_EUR = "https://api.exchangerate.host/latest?base=EUR&symbols=UYU";

export async function GET() {
  try {
    const [usdRes, eurRes] = await Promise.all([
      fetch(API_USD, { cache: "no-store" }),
      fetch(API_EUR, { cache: "no-store" }),
    ]);

    if (!usdRes.ok || !eurRes.ok) {
      throw new Error(`Error en la consulta de cotizaciones: ${usdRes.status} / ${eurRes.status}`);
    }

    const usdJson = await usdRes.json();
    const eurJson = await eurRes.json();

    const dolar = usdJson.rates?.UYU;
    const euro = eurJson.rates?.UYU;

    if (typeof dolar !== "number" || typeof euro !== "number") {
      throw new Error("Respuesta inesperada del servicio de cotización");
    }

    return NextResponse.json({
      fecha: new Date().toLocaleDateString("es-UY"),
      dolar: `UYU ${dolar.toFixed(2)}`,
      euro: `UYU ${euro.toFixed(2)}`,
      uy: `UYU 1.00`,
      origen: "exchangerate.host",
    });
  } catch (error) {
    console.error("Error al obtener cotizaciones reales", error);

    return NextResponse.json(
      {
        fecha: new Date().toLocaleDateString("es-UY"),
        dolar: "$ 42.50",
        euro: "$ 45.80",
        uy: "$ 1.00",
        origen: "fallback",
      },
      { status: 500 }
    );
  }
}
