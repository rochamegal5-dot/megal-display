'use client'

import { useEffect, useState } from 'react'
import MediaPlayer from './MediaPlayer'

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

      {/* PANEL IZQUIERDO */}

      <div className="ads-left">

        <div className={`ads-card ${anuncio.color}`}>

          <h2>{anuncio.titulo}</h2>

          <h3>{anuncio.texto}</h3>

        </div>

      </div>

      {/* VIDEO / IMÁGENES */}

      <div className="ads-center">

        <MediaPlayer />

      </div>

      {/* PANEL DERECHO */}

      <div className="ads-right">

        <div className="qr">

          QR

        </div>

        <h3>

          ESCANEÁ Y HACÉ TU PEDIDO

        </h3>

        <h2>

          091 434 630

        </h2>

      </div>

    </section>

  )

}
