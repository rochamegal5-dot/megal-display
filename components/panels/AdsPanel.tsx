'use client'

import { useEffect, useState } from 'react'

const anuncios = [
  {
    titulo: '🔥 PROMOCIÓN',
    texto: 'Recarga tu garrafa Megal Rocha',
  },
  {
    titulo: '📞 PEDIDOS',
    texto: 'WhatsApp 091 434 630',
  },
  {
    titulo: '🚚 DELIVERY',
    texto: 'Reparto rápido en toda Rocha',
  },
  {
    titulo: '🎁 PROMOCIONES',
    texto: 'Consultá por nuestras ofertas',
  },
]

export default function AdsPanel() {
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndice((i) => (i + 1) % anuncios.length)
    }, 5000)

    return () => clearInterval(id)
  }, [])

  const anuncio = anuncios[indice]

  return (
    <section className="rounded-2xl overflow-hidden border border-green-700 bg-slate-900 shadow-2xl">

      <div className="bg-green-700 px-6 py-4">

        <h2 className="text-3xl font-black">
          PUBLICIDAD MEGAL ROCHA
        </h2>

      </div>

      <div className="grid grid-cols-3">

        {/* Publicidad */}

        <div className="col-span-2 flex flex-col justify-center items-center p-10">

          <h3 className="text-5xl font-black text-yellow-400 mb-6 text-center">
            {anuncio.titulo}
          </h3>

          <p className="text-3xl text-white text-center">
            {anuncio.texto}
          </p>

        </div>

        {/* QR */}

        <div className="border-l border-slate-700 flex flex-col items-center justify-center p-8">

          <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">

            <span className="text-black font-bold">
              QR
            </span>

          </div>

          <p className="mt-5 text-xl text-center">
            Escanee para realizar su pedido
          </p>

        </div>

      </div>

    </section>
  )
}
