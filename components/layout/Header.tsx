'use client'

import { useEffect, useState } from 'react'

export default function Header() {
  const [hora, setHora] = useState('')
  const [fecha, setFecha] = useState('')

  useEffect(() => {
    const actualizar = () => {
      const ahora = new Date()

      setHora(
        ahora.toLocaleTimeString('es-UY', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )

      setFecha(
        ahora.toLocaleDateString('es-UY', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      )
    }

    actualizar()

    const id = setInterval(actualizar, 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <header className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 border-b-4 border-yellow-400 shadow-2xl">

      <div className="max-w-[1900px] mx-auto px-8 py-6 flex justify-between items-center">

        <div>

          <h1 className="text-5xl font-black tracking-wide text-white">
            MEGAL ROCHA
          </h1>

          <p className="text-xl text-green-100 font-semibold">
            RESULTADOS OFICIALES DEL URUGUAY
          </p>

        </div>

        <div className="flex gap-10">

          <div className="text-center">

            <div className="text-sm uppercase text-green-100">
              Hora
            </div>

            <div className="text-4xl font-black">
              {hora}
            </div>

          </div>

          <div className="text-center">

            <div className="text-sm uppercase text-green-100">
              Fecha
            </div>

            <div className="text-lg font-bold capitalize">
              {fecha}
            </div>

          </div>

          <div className="text-center">

            <div className="text-sm uppercase text-green-100">
              Clima
            </div>

            <div className="text-3xl font-black">
              --°
            </div>

          </div>

          <div className="text-center">

            <div className="text-sm uppercase text-green-100">
              Estado
            </div>

            <div className="text-green-300 font-black text-lg">
              ● ONLINE
            </div>

          </div>

        </div>

      </div>

    </header>
  )
}
