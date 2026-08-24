import { NextResponse } from 'next/server'
import { obtenerUltimosResultados } from '@/lib/lottery-results'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const resultados = await obtenerUltimosResultados()

  return NextResponse.json(
    {
      fecha: resultados.tombolaVespertina.fecha || resultados.tombolaNocturna.fecha,
      fechaVespertina: resultados.tombolaVespertina.fecha,
      fechaNocturna: resultados.tombolaNocturna.fecha,
      vespertina: resultados.tombolaVespertina.numeros,
      nocturna: resultados.tombolaNocturna.numeros,
      numeros: resultados.tombolaVespertina.numeros,
      ultimaActualizacion: new Date().toLocaleTimeString('es-UY'),
      estado: 'OK',
    },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  )
}
