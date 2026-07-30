'use client'

import { useEffect, useState } from 'react'

import Card from '@/components/ui/Card'
import Ball from '@/components/ui/Ball'
import Jackpot from '@/components/ui/Jackpot'
import PanelTitle from '@/components/ui/PanelTitle'

interface FiveGoldResponse {

  fecha:string

  sorteo:{

    bolillas:number[]

    bolillaExtra:number

    revancha:number[]

    pozoDeOro:string

    pozoRevancha:string

    pozoDePlata:string

  }

  ultimaActualizacion:string

}

export default function FiveGoldPanel(){

const[datos,setDatos]=useState<FiveGoldResponse|null>(null)

async function cargar(){

try{

const res=await fetch('/api/cinco-de-oro',{

cache:'no-store'

})

const json=await res.json()

setDatos(json)

}catch(e){

console.error(e)

}

}

useEffect(()=>{

cargar()

const id=setInterval(cargar,60000)

return()=>clearInterval(id)

},[])

if(!datos){

return(

<Card>

<div className="loading">

Cargando 5 de Oro...

</div>

</Card>

)

}

return(

<Card>

<PanelTitle

icon="🏆"

title="5 DE ORO"

subtitle={`Sorteo ${datos.fecha}`}

color="casino-gold"

/>

<div className="cinco-container">

<div className="titulo-bolillas">

BOLILLAS GANADORAS

</div>

<div className="bolillas-oro">

{datos.sorteo.bolillas.map((n,i)=>(

<Ball

key={i}

numero={String(n).padStart(2,'0')}

color="gold"

size="lg"

/>

))}

</div>

<div className="extra-area">

<div className="extra-label">

EXTRA

</div>

<Ball

numero={String(datos.sorteo.bolillaExtra).padStart(2,'0')}

color="red"

size="lg"

/>

</div>

<div className="titulo-bolillas">

REVANCHA

</div>

<div className="bolillas-oro">

{datos.sorteo.revancha.map((n,i)=>(

<Ball

key={i}

numero={String(n).padStart(2,'0')}

color="silver"

size="md"

/>

))}

</div>

<div className="pozos">

<Jackpot

title="POZO DE ORO"

amount={datos.sorteo.pozoDeOro}

/>

<Jackpot

title="REVANCHA"

amount={datos.sorteo.pozoRevancha}

/>

<Jackpot

title="POZO DE PLATA"

amount={datos.sorteo.pozoDePlata}

/>

</div>

</div>

<div className="panel-footer">

🟢 Última actualización

<strong>

{datos.ultimaActualizacion}

</strong>

</div>

</Card>

)

}
