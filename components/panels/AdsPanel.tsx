'use client'

import { useEffect, useState } from 'react'

const anuncios = [

  {
    titulo:"🔥 PROMOCIÓN ESPECIAL",
    texto:"Recargá tu garrafa Megal Rocha",
    color:"verde"
  },

  {
    titulo:"🚚 DELIVERY",
    texto:"Reparto rápido en toda Rocha",
    color:"azul"
  },

  {
    titulo:"🎁 PROMOCIONES",
    texto:"Consultá las promociones vigentes",
    color:"rojo"
  },

  {
    titulo:"📞 PEDIDOS",
    texto:"091 434 630",
    color:"amarillo"
  }

]

export default function AdsPanel(){

  const[indice,setIndice]=useState(0)

  useEffect(()=>{

    const id=setInterval(()=>{

      setIndice((i)=>(i+1)%anuncios.length)

    },7000)

    return()=>clearInterval(id)

  },[])

  const anuncio=anuncios[indice]

  return(

    <section className="ads-panel">

      <div className="ads-left">

        <div className={`ads-card ${anuncio.color}`}>

          <h2>

            {anuncio.titulo}

          </h2>

          <h3>

            {anuncio.texto}

          </h3>

        </div>

      </div>

      <div className="ads-center">

        <div className="video-placeholder">

          🎥

          <span>

            AQUÍ SE REPRODUCIRÁN
            VIDEOS PROMOCIONALES

          </span>

        </div>

      </div>

      <div className="ads-right">

        <div className="qr">

          QR

        </div>

        <h3>

          ESCANEÁ Y
          HACÉ TU PEDIDO

        </h3>

        <h2>

          091 434 630

        </h2>

      </div>

    </section>

  )

}
