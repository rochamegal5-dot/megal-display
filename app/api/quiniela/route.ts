import { NextResponse } from 'next/server'
import { obtenerUltimosResultados } from '@/lib/lottery-results'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const resultados = await obtenerUltimosResultados()

  return NextResponse.json(
    {
      fecha: resultados.vespertina.fecha || resultados.nocturna.fecha,
      fechaVespertina: resultados.vespertina.fecha,
      fechaNocturna: resultados.nocturna.fecha,
      sorteo: {
        vespertina: resultados.vespertina.premios,
        nocturna: resultados.nocturna.premios,
      },
      ultimaActualizacion: new Date().toLocaleTimeString('es-UY'),
      estado: 'OK',
    },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  )
}
