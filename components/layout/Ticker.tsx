'use client'

import { useEffect, useMemo, useState } from 'react'

export default function Ticker() {

  const [hora, setHora] = useState('')

  useEffect(() => {

    const actualizar = () => {
      setHora(
        new Date().toLocaleTimeString('es-UY', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    }

    actualizar()

    const id = setInterval(actualizar, 1000)

    return () => clearInterval(id)

  }, [])

  const texto = useMemo(() => [

    '🎰 RESULTADOS OFICIALES DEL URUGUAY',

    '🔥 MEGAL ROCHA - DISTRIBUIDOR OFICIAL',

    '📞 PEDIDOS 091 434 630',

    '🚚 DELIVERY EN TODA ROCHA',

    '🎁 PROMOCIONES TODOS LOS DÍAS',

    '🏆 QUINIELA • TÓMBOLA • 5 DE ORO',

    `🕒 ${hora}`,

  ].join('        ✦        '), [hora])

  return (

    <div className="ticker">

      <div className="ticker-track">

        {texto}

        &nbsp;&nbsp;&nbsp;&nbsp;

        {texto}

      </div>

    </div>

  )

}
