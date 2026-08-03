'use client'

import { useEffect, useState } from 'react'

interface Premio {

  puesto:number

  numero:string

}

interface Datos {

  fecha:string

  vespertina:Premio[]

  nocturna:Premio[]

}

export default function QuinielaPanel(){

  const [datos,setDatos]=useState<Datos|null>(null)

  useEffect(()=>{

    async function cargar(){

      try{

        const r=await fetch('/api/quiniela',{

          cache:'no-store'

        })

        const d=await r.json()

        setDatos(d)

      }

      catch(e){

        console.error(e)

      }

    }

    cargar()

    const id=setInterval(cargar,60000)

    return()=>clearInterval(id)

  },[])

  return(

    <div className="panel fade">

      <div className="panel-title">

        🎰 QUINIELA

      </div>

      <div className="panel-body">

        {

          !datos

          ?

          <h2>Cargando...</h2>

          :

          <>

            <h3 style={{marginBottom:10}}>

              Vespertina

            </h3>

            <div className="result-list">

              {

                datos.vespertina.map((p)=>(

                  <div

                    key={p.puesto}

                    className="result-item"

                  >

                    <div className="result-position">

                      {p.puesto}

                    </div>

                    <div className="result-number">

                      {p.numero}

                    </div>

                  </div>

                ))

              }

            </div>

          </>

        }

      </div>

    </div>

  )

}
