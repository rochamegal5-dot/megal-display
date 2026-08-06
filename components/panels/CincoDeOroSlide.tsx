'use client'

import { useEffect, useState } from 'react'

interface FiveGoldData {
  fecha: string
  sorteo: {
    bolillas: number[]
    revancha: number[]
    pozoDeOro: string
  }
}

export default function CincoDeOroSlide() {
  const [data, setData] = useState<FiveGoldData | null>(null)

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch('/api/cinco-de-oro', { cache: 'no-store' })
        const json = await res.json()
        setData(json)
      } catch {
        setData(null)
      }
    }

    cargar()
    const id = setInterval(cargar, 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="panel panel-cinco">
      <div className="panel-title">🏆 5 de Oro</div>
      <div className="panel-body">
        {data ? (
          <>
            <div className="result-list-small">
              {data.sorteo.bolillas.map((numero, index) => (
                <div key={index} className="ball-big">
                  {numero}
                </div>
              ))}
            </div>
            <div className="pozo-info">Pozo: {data.sorteo.pozoDeOro}</div>
          </>
        ) : (
          <div className="panel-loading">Cargando resultados...</div>
        )}
      </div>
    </div>
  )
}
