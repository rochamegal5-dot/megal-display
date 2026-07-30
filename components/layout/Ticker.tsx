'use client'

import { useEffect, useState } from 'react'

const mensajes = [

  '🎰 RESULTADOS OFICIALES DEL URUGUAY',

  '🔥 MEGAL ROCHA - DISTRIBUIDOR OFICIAL',

  '📞 PEDIDOS 091 434 630',

  '🚚 DELIVERY EN TODA LA CIUDAD DE ROCHA',

  '🎁 PROMOCIONES TODOS LOS DÍAS',

  '🏆 5 DE ORO • QUINIELA • TÓMBOLA',

  '📺 RESULTADOS ACTUALIZADOS AUTOMÁTICAMENTE'

]

export default function Ticker(){

const [texto,setTexto]=useState('')

useEffect(()=>{

setTexto(mensajes.join('      •      '))

},[])

return(

<div className="ticker">

<div className="ticker-track">

{texto}

&nbsp;&nbsp;&nbsp;&nbsp;

{texto}

</div>

</div>

)

}
