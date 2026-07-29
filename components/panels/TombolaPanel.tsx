'use client'

import { useEffect, useState } from 'react'

interface Resultado {
  puesto: number
  numero: string
}

interface TombolaResponse {
  fecha: string
  sorteo: {
    vespertina: Resultado[]
    nocturna: Resultado[]
  }
  ultimaActualizacion: string
}

export default function TombolaPanel() {
  const [datos, setDatos] = useState<TombolaResponse | null>(null)

  async function cargar() {
    try {
      const res = await fetch('/api/tombola', {
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
        <h2>TÓMBOLA</h2>

        <div className="loading-text">
          Cargando resultados...
        </div>
      </section>
    )
  }

  return (
    <section className="panel">

      <div className="panel-header casino-red">

        <div>

          <h2>🎯 TÓMBOLA</h2>

          <p>Resultados Oficiales</p>

        </div>

        <div className="fecha-panel">

          {datos.fecha}

        </div>

      </div>

      <div className="quiniela-grid">

        <div>

          <div className="titulo-vespertina">
            🌞 VESPERTINA
          </div>

          <div className="bolillas">

            {datos.sorteo.vespertina.map((b) => (

              <div
                key={b.puesto}
                className="bola verde"
              >
                {b.numero}
              </div>

            ))}

          </div>

        </div>

        <div>

          <div className="titulo-nocturna">
            🌙 NOCTURNA
          </div>

          <div className="bolillas">

            {datos.sorteo.nocturna.map((b) => (

              <div
                key={b.puesto}
                className="bola roja"
              >
                {b.numero}
              </div>

            ))}

          </div>

        </div>

      </div>

      <div className="panel-footer">

        🟢 Actualizado

        <strong>

          {datos.ultimaActualizacion}

        </strong>

      </div>

    </section>
  )
}
