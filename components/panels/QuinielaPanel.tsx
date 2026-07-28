'use client'

import { useEffect, useState } from 'react'

interface Resultado {
  puesto: number
  numero: string
}

export default function QuinielaPanel() {
  const [resultados, setResultados] = useState<Resultado[]>([])
  const [ultimaActualizacion, setUltimaActualizacion] = useState('--:--')

  async function cargarResultados() {
    try {
      const res = await fetch('/api/quiniela', {
        cache: 'no-store',
      })

      const data = await res.json()

      setResultados(data)

      setUltimaActualizacion(
        new Date().toLocaleTimeString('es-UY', {
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    cargarResultados()

    const intervalo = setInterval(cargarResultados, 60000)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <section className="rounded-2xl overflow-hidden border border-green-600 bg-slate-900 shadow-2xl">

      <div className="bg-green-700 px-5 py-4">
        <h2 className="text-3xl font-black text-white">
          QUINIELA
        </h2>

        <p className="text-green-100">
          Resultados Oficiales
        </p>
      </div>

      <div className="p-5">

        <table className="w-full">

          <tbody>

            {resultados.map((r) => (

              <tr
                key={r.puesto}
                className="border-b border-slate-700"
              >
                <td className="py-2 w-16 font-bold text-yellow-400">
                  {r.puesto}°
                </td>

                <td className="py-2 text-right text-2xl font-black tracking-widest text-white">
                  {r.numero}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="bg-slate-800 px-5 py-3 text-sm text-slate-300">

        Última actualización

        <span className="ml-2 text-green-400">
          {ultimaActualizacion}
        </span>

      </div>

    </section>
  )
}
