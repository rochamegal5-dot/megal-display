'use client'

import { useEffect, useState } from 'react'

interface Resultado {
  puesto: number
  numero: string
}

interface TombolaResponse {
  fecha: string
  sorteo: {
    vespertina: Resultado[]
    nocturna: Resultado[]
  }
  ultimaActualizacion: string
}

export default function TombolaPanel() {
  const [datos, setDatos] = useState<TombolaResponse | null>(null)

  async function cargar() {
    try {
      const res = await fetch('/api/tombola', {
        cache: 'no-store',
      })

      const json = await res.json()

      setDatos(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    cargar()

    const id = setInterval(cargar, 60000)

    return () => clearInterval(id)
  }, [])

  if (!datos) {
    return (
      <section className="rounded-2xl bg-slate-900 border border-cyan-700 p-8">
        <h2 className="text-3xl font-black text-white">
          TÓMBOLA
        </h2>

        <p className="mt-5 text-gray-300">
          Cargando resultados...
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl overflow-hidden border border-cyan-700 bg-slate-900 shadow-2xl">

      <div className="bg-cyan-700 px-6 py-4">

        <h2 className="text-3xl font-black text-white">
          TÓMBOLA
        </h2>

        <p className="text-cyan-100">
          Fecha del sorteo: {datos.fecha}
        </p>

      </div>

      <div className="grid grid-cols-2">

        <div className="border-r border-slate-700">

          <div className="bg-slate-800 py-3 text-center text-xl font-bold text-yellow-400">
            VESPERTINA
          </div>

          <table className="w-full">
            <tbody>

              {datos.sorteo.vespertina.map((r) => (

                <tr
                  key={r.puesto}
                  className="border-b border-slate-700"
                >

                  <td className="px-4 py-2 font-bold text-yellow-300 w-16">
                    {r.puesto}°
                  </td>

                  <td className="px-4 py-2 text-right text-2xl font-black text-white">
                    {r.numero}
                  </td>

                </tr>

              ))}

            </tbody>
          </table>

        </div>

        <div>

          <div className="bg-slate-800 py-3 text-center text-xl font-bold text-cyan-300">
            NOCTURNA
          </div>

          <table className="w-full">
            <tbody>

              {datos.sorteo.nocturna.map((r) => (

                <tr
                  key={r.puesto}
                  className="border-b border-slate-700"
                >

                  <td className="px-4 py-2 font-bold text-cyan-300 w-16">
                    {r.puesto}°
                  </td>

                  <td className="px-4 py-2 text-right text-2xl font-black text-white">
                    {r.numero}
                  </td>

                </tr>

              ))}

            </tbody>
          </table>

        </div>

      </div>

      <div className="bg-slate-800 px-6 py-3 text-green-300 text-sm">
        Última actualización: {datos.ultimaActualizacion}
      </div>

    </section>
  )
}
