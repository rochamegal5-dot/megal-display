'use client'

import { useEffect, useState } from 'react'

import {
  getTombola,
  TombolaResponse,
} from '@/services/tombola'

export default function TombolaPanel() {

  const [datos, setDatos] = useState<TombolaResponse | null>(null)

  async function cargar() {
    try {
      const data = await getTombola()
      setDatos(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    cargar()

    const id = setInterval(cargar, 60000)

    return () => clearInterval(id)
  }, [])

  if (!datos) {
    return (
      <section className="panel">
        <h2>TÓMBOLA</h2>
        <p>Cargando resultados...</p>
      </section>
    )
  }

  return (
    <section className="panel">

      <div className="panel-title">
        TÓMBOLA URUGUAYA
      </div>

      <div className="panel-date">
        {datos.fecha}
      </div>

      <div className="panel-grid">

        <div>

          <h3>VESPERTINA</h3>

          {datos.sorteo.vespertina.map((r) => (

            <div
              className="resultado"
              key={r.puesto}
            >

              <span>{r.puesto}°</span>

              <strong>{r.numero}</strong>

            </div>

          ))}

        </div>

        <div>

          <h3>NOCTURNA</h3>

          {datos.sorteo.nocturna.map((r) => (

            <div
              className="resultado"
              key={r.puesto}
            >

              <span>{r.puesto}°</span>

              <strong>{r.numero}</strong>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}
