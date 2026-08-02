'use client'

import { useEffect, useState } from 'react'

import NextDraw from './NextDraw'
import LastUpdate from './LastUpdate'
import SystemStatus from './SystemStatus'

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
          second: '2-digit'
        })
      )

      setFecha(
        ahora.toLocaleDateString('es-UY', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      )

    }

    actualizar()

    const id = setInterval(actualizar, 1000)

    return () => clearInterval(id)

  }, [])

  return (

    <header className="header">

      <div className="header-top">

        <div className="brand">

          <h1>MEGAL ROCHA</h1>

          <p>RESULTADOS OFICIALES DEL URUGUAY</p>

        </div>

        <div className="header-status">

          <div className="status-box">

            <span>HORA</span>

            <strong>{hora}</strong>

          </div>

          <div className="status-box">

            <span>FECHA</span>

            <strong>{fecha}</strong>

          </div>

          <div className="status-box">

            <span>CLIMA</span>

            <strong>--°</strong>

          </div>

          <div className="status-box">

            <span>ESTADO</span>

            <strong className="online">

              ● ONLINE

            </strong>

          </div>

        </div>

      </div>

      <div className="header-bottom">

        <NextDraw />

        <LastUpdate />

        <SystemStatus />

      </div>

    </header>

  )

}
