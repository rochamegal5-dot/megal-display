'use client'

import { useEffect,useState } from 'react'

interface Datos{

fecha:string

bolillas:number[]

revancha:number[]

pozoDeOro:number[]

}

export default function FiveGoldPanel(){

const[datos,setDatos]=useState<Datos|null>(null)

useEffect(()=>{

async function cargar(){

const r=await fetch('/api/fivegold',{cache:'no-store'})

const d=await r.json()

setDatos(d)

}

cargar()

const id=setInterval(cargar,60000)

return()=>clearInterval(id)

},[])

return(

<div className="panel fade">

<div className="panel-title">

🏆 5 DE ORO

</div>

<div className="panel-body">

{

!datos?

<h2>Cargando...</h2>

:

<>

<div className="bolillas">

{

(datos?.bolillas ?? []).map((b,i)=>(

<div
key={i}
className="ball">

{b}

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
