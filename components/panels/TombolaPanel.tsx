'use client'

import { useEffect,useState } from 'react'

interface Numero{

puesto:number

numero:string

}

interface Datos{

fecha:string

vespertina:Numero[]

nocturna:Numero[]

}

export default function TombolaPanel(){

const[datos,setDatos]=useState<Datos|null>(null)

useEffect(()=>{

async function cargar(){

const r=await fetch('/api/tombola',{cache:'no-store'})

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

🎱 TÓMBOLA

</div>

<div className="panel-body">

{

!datos?

<h2>Cargando...</h2>

:

<div className="result-list">

{

datos.vespertina.map((n)=>(

<div
key={n.puesto}
className="result-item">

<div className="result-position">

{n.puesto}°

</div>

<div className="result-number">

{n.numero}

</div>

</div>

))

}

</div>

}

</div>

</div>

)

}
