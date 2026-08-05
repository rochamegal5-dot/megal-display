'use client'

import { useEffect, useState } from 'react'

interface Datos {
  fecha: string
  numeros: string[]
}

export default function TombolaPanel() {
  const [datos, setDatos] = useState<Datos | null>(null)

  useEffect(() => {
    async function cargar() {
      const r = await fetch('/api/tombola', { cache: 'no-store' })
      const d = await r.json()
      setDatos(d)
    }

    cargar()

    const id = setInterval(cargar, 60000)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="panel fade">
      <div className="panel-title">
        🎱 TÓMBOLA
      </div>

      <div className="panel-body">

        {!datos ? (
          <h2>Cargando...</h2>
        ) : (
          <div className="result-list">
            {(datos?.numeros ?? []).map((numero, index) => (
              <div
                key={index}
                className="result-item"
              >
                <div className="result-position">
                  {index + 1}
                </div>

                <div className="result-number">
                  {numero}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
