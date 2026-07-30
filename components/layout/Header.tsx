'use client'

import { useEffect, useState } from 'react'

interface WeatherData {
  temperatura: string
  ciudad: string
}

export default function Header() {
  const [hora, setHora] = useState('')
  const [fecha, setFecha] = useState('')
  const [weather, setWeather] = useState<WeatherData>({
    temperatura: '--°',
    ciudad: 'Rocha',
  })

  useEffect(() => {
    const actualizarHora = () => {
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

    actualizarHora()

    const reloj = setInterval(actualizarHora, 1000)

    return () => clearInterval(reloj)
  }, [])

  useEffect(() => {
    async function cargarClima() {
      try {
        const res = await fetch('/api/weather', {
          cache: 'no-store',
        })

        if (!res.ok) return

        const data = await res.json()

        setWeather({
          temperatura: `${data.temperatura}°`,
          ciudad: data.ciudad,
        })
      } catch (e) {
        console.error(e)
      }
    }

    cargarClima()

    const id = setInterval(cargarClima, 600000)

    return () => clearInterval(id)
  }, [])

  return (
    <header className="header">

      <div className="logo-area">

        <div>

          <h1>MEGAL ROCHA</h1>

          <h2>RESULTADOS OFICIALES DEL URUGUAY</h2>

        </div>

      </div>

      <div className="status-area">

        <div className="status-box">

          <span>🕒 HORA</span>

          <strong>{hora}</strong>

        </div>

        <div className="status-box">

          <span>📅 FECHA</span>

          <strong>{fecha}</strong>

        </div>

        <div className="status-box">

          <span>🌤 CLIMA</span>

          <strong>

            {weather.temperatura}

          </strong>

          <small>{weather.ciudad}</small>

        </div>

        <div className="status-box">

          <span>🟢 SISTEMA</span>

          <strong className="online">

            ● ONLINE

          </strong>

        </div>

      </div>

    </header>
  )
}
