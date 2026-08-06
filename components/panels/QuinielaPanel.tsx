'use client'

import { useEffect, useState } from 'react'

interface Premio {
  puesto: number
  numero: string
}

interface Datos {
  fecha: string
  sorteo?: {
    vespertina: Premio[]
    nocturna: Premio[]
  }
  vespertina?: Premio[]
  nocturna?: Premio[]
  error?: string
}

export default function QuinielaPanel() {
  const [datos, setDatos] = useState<Datos | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function cargar() {
      try {
        const r = await fetch('/api/quiniela', {
          cache: 'no-store'
        })

        const d = await r.json()

        if (!r.ok) {
          throw new Error(d.error || 'No se pudieron obtener los resultados')
        }

        setDatos(d)
        setError(null)
      } catch (e) {
        console.error(e)
        setError(e instanceof Error ? e.message : 'No se pudieron obtener los resultados')
        setDatos(null)
      }
    }

    cargar()

    const id = setInterval(cargar, 60000)

    return () => clearInterval(id)
  }, [])

  const vespertina = datos?.sorteo?.vespertina ?? datos?.vespertina ?? []
  const nocturna = datos?.sorteo?.nocturna ?? datos?.nocturna ?? []

  return (
    <div className="panel fade">
      <div className="panel-title">
        🎰 QUINIELA
      </div>

      <div className="panel-body">
        {!datos ? (
          <h2>{error || 'Cargando...'}</h2>
        ) : (
          <>
            <h3 style={{ marginBottom: 10 }}>Vespertina</h3>
            <div className="result-list">
              {vespertina.length > 0 ? (
                vespertina.map((p) => (
                  <div key={p.puesto} className="result-item">
                    <div className="result-position">{p.puesto}</div>
                    <div className="result-number">{p.numero}</div>
                  </div>
                ))
              ) : (
                <p>No hay resultados disponibles.</p>
              )}
            </div>

            <h3 style={{ marginTop: 16, marginBottom: 10 }}>Nocturna</h3>
            <div className="result-list">
              {nocturna.length > 0 ? (
                nocturna.map((p) => (
                  <div key={p.puesto} className="result-item">
                    <div className="result-position">{p.puesto}</div>
                    <div className="result-number">{p.numero}</div>
                  </div>
                ))
              ) : (
                <p>No hay resultados disponibles.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
