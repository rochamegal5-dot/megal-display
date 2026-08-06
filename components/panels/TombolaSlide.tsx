'use client'

import { useEffect, useState } from 'react'

interface TombolaData {
  fecha: string
  numeros: string[]
}

export default function TombolaSlide() {
  const [data, setData] = useState<TombolaData | null>(null)

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch('/api/tombola', { cache: 'no-store' })
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
    <div className="panel panel-tombola">
      <div className="panel-title">🎱 Tómbola</div>
      <div className="panel-body">
        {data ? (
          <div className="result-list-small tombola-grid">
            {data.numeros.map((numero, index) => (
              <div key={index} className="ball-big">
                {numero}
              </div>
            ))}
          </div>
        ) : (
          <div className="panel-loading">Cargando resultados...</div>
        )}
      </div>
    </div>
  )
}
