'use client'

import { useEffect, useState } from 'react'

interface Premio {
  puesto: number
  numero: string
}

interface QuinielaData {
  fecha: string
  sorteo: {
    vespertina: Premio[]
    nocturna: Premio[]
  }
}

export default function QuinielaSlide() {
  const [data, setData] = useState<QuinielaData | null>(null)

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch('/api/quiniela', { cache: 'no-store' })
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
    <div className="panel panel-quiniela">
      <div className="panel-title">🎰 Quiniela</div>
      <div className="panel-body">
        {data ? (
          <>
            <div className="result-column">
              <div className="result-header">Vespertina</div>
              {data.sorteo.vespertina.slice(0, 10).map((item) => (
                <div key={item.puesto} className="result-row">
                  <span>{item.puesto}</span>
                  <strong>{item.numero}</strong>
                </div>
              ))}
            </div>
            <div className="result-column">
              <div className="result-header">Nocturna</div>
              {data.sorteo.nocturna.slice(0, 10).map((item) => (
                <div key={item.puesto} className="result-row">
                  <span>{item.puesto}</span>
                  <strong>{item.numero}</strong>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="panel-loading">Cargando resultados...</div>
        )}
      </div>
    </div>
  )
}
