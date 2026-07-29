'use client'

import { useEffect, useState } from 'react'

interface Resultado {
  puesto: number
  numero: string
}

interface QuinielaResponse {
  fecha: string
  sorteo: {
    vespertina: Resultado[]
    nocturna: Resultado[]
  }
  ultimaActualizacion: string
}

export default function QuinielaPanel() {
  const [datos, setDatos] = useState<QuinielaResponse | null>(null)

  async function cargar() {
    try {
      const res = await fetch('/api/quiniela', {
        cache: 'no-store',
      })

      const json = await res.json()

      setDatos(json)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    cargar()

    const id = setInterval(cargar, 60000)

    return () => clearInterval(id)
  }, [])

  if (!datos) {
    return (
      <section className="panel panel-loading">
        <h2>QUINIELA</h2>

        <div className="loading-text">
          Cargando resultados...
        </div>
      </section>
    )
  }

  return (
    <section className="panel">

      <div className="panel-header casino-green">

        <div>

          <h2>🎰 QUINIELA</h2>

          <p>Resultados Oficiales</p>

        </div>

        <div className="fecha-panel">

          {datos.fecha}

        </div>

      </div>

      <div className="quiniela-grid">

        <div className="sorteo">

          <div className="titulo-vespertina">

            🌞 VESPERTINA

          </div>

          {datos.sorteo.vespertina.map((r) => (

            <div
              key={r.puesto}
              className="fila"
            >

              <div className="puesto">

                {r.puesto}

              </div>

              <div className="numero amarillo">

                {r.numero}

              </div>

            </div>

          ))}

        </div>

        <div className="sorteo">

          <div className="titulo-nocturna">

            🌙 NOCTURNA

          </div>

          {datos.sorteo.nocturna.map((r) => (

            <div
              key={r.puesto}
              className="fila"
            >

              <div className="puesto">

                {r.puesto}

              </div>

              <div className="numero cyan">

                {r.numero}

              </div>

            </div>

          ))}

        </div>

      </div>

      <div className="panel-footer">

        <span>

          🟢 Actualizado:

        </span>

        <strong>

          {datos.ultimaActualizacion}

        </strong>

      </div>

    </section>
  )
}
