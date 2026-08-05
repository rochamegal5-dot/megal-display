'use client'

import { useEffect, useState } from 'react'

interface Datos {
  fecha: string
  bolillas: number[]
  revancha: number[]
  extra: number
  pozoDeOro: string
  pozoRevancha: string
}

export default function FiveGoldPanel() {
  const [datos, setDatos] = useState<Datos | null>(null)

  useEffect(() => {
    async function cargar() {
      try {
        const r = await fetch('/api/fivegold', { cache: 'no-store' })
        const d = await r.json()
        setDatos(d)
      } catch (e) {
        console.error(e)
      }
    }

    cargar()
    const id = setInterval(cargar, 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="panel fade">
      <div className="panel-title">🏆 5 DE ORO</div>

      <div className="panel-body">
        {!datos ? (
          <h2>Cargando...</h2>
        ) : (
          <>
            <div className="panel-meta">Fecha: {datos.fecha}</div>

            <div className="bolillas">
              {(datos.bolillas ?? []).map((b, i) => (
                <div key={`b-${i}`} className="ball">
                  {b}
                </div>
              ))}
            </div>

            <div className="panel-subtitle">Revancha</div>
            <div className="bolillas">
              {(datos.revancha ?? []).map((b, i) => (
                <div key={`r-${i}`} className="ball">
                  {b}
                </div>
              ))}
            </div>

            <div className="panel-meta">Extra: {datos.extra}</div>
            <div className="panel-meta">Pozo de Oro: {datos.pozoDeOro}</div>
            <div className="panel-meta">Pozo Revancha: {datos.pozoRevancha}</div>
          </>
        )}
      </div>
    </div>
  )
}
