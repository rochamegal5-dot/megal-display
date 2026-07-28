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

    const timer = setInterval(actualizar, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <header className="w-full bg-gradient-to-r from-green-800 via-green-700 to-green-800 border-b-4 border-yellow-400 shadow-xl">

      <div className="flex items-center justify-between px-8 py-5">

        <div>

          <h1 className="text-5xl font-black tracking-wide text-white">
            MEGAL ROCHA
          </h1>

          <p className="text-green-100 text-xl">
            Resultados Oficiales del Uruguay
          </p>

        </div>

        <div className="flex gap-10 items-center">

          <div className="text-center">

            <div className="text-sm uppercase text-green-200">
              Hora
            </div>

            <div className="text-4xl font-bold text-white">
              {hora}
            </div>

          </div>

          <div className="text-center">

            <div className="text-sm uppercase text-green-200">
              Fecha
            </div>

            <div className="text-lg font-semibold text-white">
              {fecha}
            </div>

          </div>

          <div className="text-center">

            <div className="text-sm uppercase text-green-200">
              Clima
            </div>

            <div className="text-2xl font-bold text-white">
              --°
            </div>

          </div>

          <div className="text-center">

            <div className="text-sm uppercase text-green-200">
              Estado
            </div>

            <div className="text-green-300 font-bold">
              ● ONLINE
            </div>

          </div>

        </div>

      </div>

    </header>
  )
}
