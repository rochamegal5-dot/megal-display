'use client'

import { useEffect, useState } from 'react'

interface FiveGoldResponse {
  fecha: string
  sorteo: {
    bolillas: number[]
    bolillaExtra: number
    revancha: number[]
    pozoDeOro: string
    pozoRevancha: string
    pozoDePlata: string
  }
  ultimaActualizacion: string
}

export default function FiveGoldPanel() {
  const [datos, setDatos] = useState<FiveGoldResponse | null>(null)

  async function cargar() {
    try {
      const res = await fetch('/api/cinco-de-oro', {
        cache: 'no-store',
      })

      const json = await res.json()

      setDatos(json)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    cargar()

    const id = setInterval(cargar, 60000)

    return () => clearInterval(id)
  }, [])

  if (!datos) {
    return (
      <section className="rounded-2xl bg-slate-900 border border-yellow-600 p-8">
        <h2 className="text-3xl font-black text-white">
          5 DE ORO
        </h2>

        <p className="mt-5 text-gray-300">
          Cargando resultados...
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl overflow-hidden border border-yellow-500 bg-slate-900 shadow-2xl">

      <div className="bg-yellow-500 px-6 py-4">

        <h2 className="text-4xl font-black text-black">
          5 DE ORO
        </h2>

        <p className="text-black font-semibold">
          Fecha del sorteo: {datos.fecha}
        </p>

      </div>

      <div className="p-8">

        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          Bolillas
        </h3>

        <div className="flex gap-4 justify-center mb-8">

          {datos.sorteo.bolillas.map((n) => (

            <div
              key={n}
              className="w-20 h-20 rounded-full bg-yellow-400 text-black flex items-center justify-center text-3xl font-black shadow-xl"
            >
              {n}
            </div>

          ))}

        </div>

        <div className="text-center mb-8">

          <span className="text-lg text-gray-300">
            Bolilla Extra
          </span>

          <div className="mt-3 inline-flex w-20 h-20 rounded-full bg-red-600 text-white items-center justify-center text-3xl font-black">
            {datos.sorteo.bolillaExtra}
          </div>

        </div>

        <h3 className="text-xl font-bold text-green-400 mb-4">
          Revancha
        </h3>

        <div className="flex gap-4 justify-center mb-8">

          {datos.sorteo.revancha.map((n) => (

            <div
              key={n}
              className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold"
            >
              {n}
            </div>

          ))}

        </div>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-slate-800 rounded-xl p-5 text-center">

            <p className="text-gray-400">
              Pozo de Oro
            </p>

            <p className="text-2xl font-black text-yellow-400">
              {datos.sorteo.pozoDeOro}
            </p>

          </div>

          <div className="bg-slate-800 rounded-xl p-5 text-center">

            <p className="text-gray-400">
              Revancha
            </p>

            <p className="text-2xl font-black text-green-400">
              {datos.sorteo.pozoRevancha}
            </p>

          </div>

          <div className="bg-slate-800 rounded-xl p-5 text-center">

            <p className="text-gray-400">
              Pozo de Plata
            </p>

            <p className="text-2xl font-black text-cyan-400">
              {datos.sorteo.pozoDePlata}
            </p>

          </div>

        </div>

      </div>

      <div className="bg-slate-800 px-6 py-3 text-sm text-green-300">
        Última actualización: {datos.ultimaActualizacion}
      </div>

    </section>
  )
}
