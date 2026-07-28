'use client'

import { useEffect, useState } from 'react'

export default function Header() {
  const [hora, setHora] = useState('--:--:--')
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
    <header className="bg-gradient-to-r from-green-900 via-green-700 to-green-900 shadow-2xl border-b-4 border-yellow-400">

      <div className="max-w-[1900px] mx-auto px-8 py-5">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-black tracking-widest text-white">
              MEGAL ROCHA
            </h1>

            <p className="text-green-100 text-xl mt-1">
              RESULTADOS OFICIALES DEL URUGUAY
            </p>

          </div>

          <div className="flex items-center gap-12">

            <div className="text-center">

              <div className="text-green-200 uppercase text-sm">
                Hora
              </div>

              <div className="text-5xl font-bold text-white">
                {hora}
              </div>

            </div>

            <div className="text-center">

              <div className="text-green-200 uppercase text-sm">
                Fecha
              </div>

              <div className="text-lg font-semibold text-white max-w-xs">
                {fecha}
              </div>

            </div>

            <div className="text-center">

              <div className="text-green-200 uppercase text-sm">
                Clima
              </div>

              <div className="text-4xl font-bold text-white">
                --°
              </div>

            </div>

            <div className="text-center">

              <div className="text-green-200 uppercase text-sm">
                Estado
              </div>

              <div className="text-green-300 font-bold text-xl">
                ● ONLINE
              </div>

            </div>

          </div>

        </div>

      </div>

    </header>
  )
}
