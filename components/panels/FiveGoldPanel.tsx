'use client'

import { useEffect, useState } from 'react'

import {
  getFiveGold,
  FiveGoldResponse,
} from '@/services/fiveGold'

export default function FiveGoldPanel() {

  const [datos, setDatos] =
    useState<FiveGoldResponse | null>(null)

  async function cargar() {

    try {

      const data = await getFiveGold()

      setDatos(data)

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

      <section className="panel">

        <h2>5 DE ORO</h2>

        <p>Cargando...</p>

      </section>

    )

  }

  return (

    <section className="panel">

      <div className="panel-title">

        5 DE ORO

      </div>

      <div className="panel-date">

        {datos.fecha}

      </div>

      <div className="fivegold">

        {datos.sorteo.numeros.map((n) => (

          <div
            className="bola"
            key={n}
          >

            {n}

          </div>

        ))}

      </div>

      <div className="extra">

        EXTRA

        <span>

          {datos.sorteo.bolillaExtra}

        </span>

      </div>

      <div className="pozos">

        <p>

          Pozo de Oro

          <strong>

            {datos.sorteo.pozoDeOro}

          </strong>

        </p>

        <p>

          Revancha

          <strong>

            {datos.sorteo.pozoRevancha}

          </strong>

        </p>

      </div>

    </section>

  )

}
