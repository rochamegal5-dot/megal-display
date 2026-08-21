'use client'

import { useEffect, useState } from 'react'

interface TombolaData {
  fecha: string
  vespertina: string[]
  nocturna: string[]
  numeros: string[]
  estado?: string
}

export default function TombolaSlide() {
  const [data, setData] = useState<TombolaData | null>(null)

  useEffect(() => {
    let activo = true

    async function cargar() {
      try {
        const res = await fetch('/api/tombola', { cache: 'no-store' })
        if (!res.ok) throw new Error('Error en Tómbola')
        const json = await res.json()
        if (activo) setData(json)
      } catch {
        if (activo) setData(null)
      }
    }

    cargar()
    const id = setInterval(cargar, 60000)
    return () => {
      activo = false
      clearInterval(id)
    }
  }, [])

  const vespertina = data?.vespertina ?? data?.numeros ?? []
  const nocturna = data?.nocturna ?? []

  return (
    <div className="panel panel-tombola">
      <div className="panel-title">🎱 Tómbola</div>
      <div className="panel-body tombola-panel-body">
        <section className="tombola-section">
          <div className="result-header">Vespertina</div>
          <div className="tombola-grid">
            {vespertina.length ? vespertina.map((numero, index) => (
              <div key={`v-${index}-${numero}`} className="ball-big">{numero}</div>
            )) : <div className="panel-loading">Esperando resultado vespertino...</div>}
          </div>
        </section>

        <section className="tombola-section">
          <div className="result-header">Nocturna</div>
          <div className="tombola-grid">
            {nocturna.length ? nocturna.map((numero, index) => (
              <div key={`n-${index}-${numero}`} className="ball-big">{numero}</div>
            )) : <div className="panel-loading">Esperando resultado nocturno...</div>}
          </div>
        </section>
      </div>
    </div>
  )
}
