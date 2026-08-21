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

const STORAGE_KEY = 'megal-ultimo-5-de-oro'

export default function CincoDeOroSlide() {

  const [data, setData] = useState<FiveGoldData | null>(null)

  const [cargando, setCargando] = useState(true)

  useEffect(() => {

    /*
     * PRIMERO:
     * recuperamos el último resultado guardado.
     */

    try {

      const guardado = localStorage.getItem(STORAGE_KEY)

      if (guardado) {

        const anterior = JSON.parse(guardado)

        if (
          anterior?.sorteo?.bolillas &&
          anterior.sorteo.bolillas.length > 0
        ) {

          setData(anterior)

        }

      }

    } catch (error) {

      console.error(
        'Error recuperando último 5 de Oro:',
        error
      )

    }

    /*
     * DESPUÉS:
     * consultamos la API.
     */

    async function cargar() {

      try {

        const res = await fetch('/api/cinco-de-oro', {
          cache: 'no-store',
        })

        if (!res.ok) {

          throw new Error(
            'Error en API 5 de Oro'
          )

        }

        const json: FiveGoldData = await res.json()

        console.log(
          '5 DE ORO API:',
          json
        )

        /*
         * SOLAMENTE reemplazamos los resultados
         * si realmente recibimos números.
         */

        const nuevosNumeros =
          json?.sorteo?.bolillas ?? []

        if (nuevosNumeros.length > 0) {

          setData(json)

          try {

            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify(json)
            )

          } catch (error) {

            console.error(
              'No se pudo guardar 5 de Oro:',
              error
            )

          }

        }

      } catch (error) {

        console.error(
          'Error cargando 5 de Oro:',
          error
        )

      } finally {

        setCargando(false)

      }

    }

    cargar()

    /*
     * Actualizamos cada minuto.
     */

    const id = setInterval(
      cargar,
      60000
    )

    return () => clearInterval(id)

  }, [])

  const bolillas =
    data?.sorteo?.bolillas ?? []

  const revancha =
    data?.sorteo?.revancha ?? []

  const pozoDeOro =
    data?.sorteo?.pozoDeOro ?? ''

  /*
   * Si es la primera vez que se abre
   * y todavía nunca hubo resultados guardados.
   */

  if (cargando && !data) {

    return (

      <div className="panel panel-cinco">

        <div className="panel-title">

          🏆 5 DE ORO

        </div>

        <div className="panel-body">

          <div className="panel-loading">

            Cargando resultados...

          </div>

        </div>

      </div>

    )

  }

  return (

    <div className="panel panel-cinco">

      <div className="panel-title">

        🏆 5 DE ORO

      </div>

      <div className="panel-body">

        {data ? (

          <>

            <div className="result-date">

              {data.fecha ?? ''}

            </div>

            {bolillas.length > 0 ? (

              <>

                <div className="result-list-small">

                  {bolillas.map(
                    (numero, index) => (

                      <div
                        key={`oro-${index}-${numero}`}
                        className="ball-big"
                      >

                        {String(numero)
                          .padStart(2, '0')}

                      </div>

                    )
                  )}

                </div>

                {pozoDeOro && (

                  <div className="pozo-info">

                    Pozo: {pozoDeOro}

                  </div>

                )}

              </>

            ) : (

              <div className="panel-loading">

                Sin resultados

              </div>

            )}

            {revancha.length > 0 && (

              <>

                <div className="result-subtitle">

                  REVANCHA

                </div>

                <div className="result-list-small">

                  {revancha.map(
                    (numero, index) => (

                      <div
                        key={`rev-${index}-${numero}`}
                        className="ball-big silver"
                      >

                        {String(numero)
                          .padStart(2, '0')}

                      </div>

                    )
                  )}

                </div>

              </>

            )}

            <div className="last-update">

              Último resultado:

              {' '}

              {data.fecha ?? '—'}

            </div>

          </>

        ) : (

          <div className="panel-loading">

            Esperando primer resultado...

          </div>

        )}

      </div>

    </div>

  )

}
