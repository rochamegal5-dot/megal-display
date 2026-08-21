'use client'

import { useEffect, useState } from 'react'

interface FiveGoldData {
  fecha?: string

  sorteo?: {
    bolillas?: number[]
    bolillaExtra?: number | null
    revancha?: number[]
    pozoDeOro?: string
    pozoRevancha?: string
    pozoDePlata?: string
  }

  ultimaActualizacion?: string
  estado?: string
}

export default function CincoDeOroSlide() {

  const [data, setData] = useState<FiveGoldData | null>(null)

  useEffect(() => {

    async function cargar() {

      try {

        const res = await fetch('/api/cinco-de-oro', {
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error('Error en API 5 de Oro')
        }

        const json = await res.json()

        console.log('5 DE ORO API:', json)

        setData(json)

      } catch (error) {

        console.error('Error cargando 5 de Oro:', error)

        setData(null)

      }

    }

    cargar()

    const id = setInterval(cargar, 60000)

    return () => clearInterval(id)

  }, [])

  const bolillas = data?.sorteo?.bolillas ?? []

  const revancha = data?.sorteo?.revancha ?? []

  const pozoDeOro =
    data?.sorteo?.pozoDeOro ?? ''

  return (

    <div className="panel panel-cinco">

      <div className="panel-title">

        🏆 5 DE ORO

      </div>

      <div className="panel-body">

        {!data ? (

          <div className="panel-loading">

            Cargando resultados...

          </div>

        ) : (

          <>

            <div className="result-date">

              {data.fecha ?? ''}

            </div>

            {bolillas.length > 0 ? (

              <>

                <div className="result-list-small">

                  {bolillas.map((numero, index) => (

                    <div
                      key={`oro-${index}-${numero}`}
                      className="ball-big"
                    >

                      {String(numero).padStart(2, '0')}

                    </div>

                  ))}

                </div>

                {pozoDeOro && (

                  <div className="pozo-info">

                    Pozo: {pozoDeOro}

                  </div>

                )}

              </>

            ) : (

              <div className="panel-loading">

                Resultados aún no disponibles

              </div>

            )}

            {revancha.length > 0 && (

              <>

                <div className="result-subtitle">

                  REVANCHA

                </div>

                <div className="result-list-small">

                  {revancha.map((numero, index) => (

                    <div
                      key={`rev-${index}-${numero}`}
                      className="ball-big silver"
                    >

                      {String(numero).padStart(2, '0')}

                    </div>

                  ))}

                </div>

              </>

            )}

            {data.ultimaActualizacion && (

              <div className="last-update">

                Última actualización: {data.ultimaActualizacion}

              </div>

            )}

          </>

        )}

      </div>

    </div>

  )

}
