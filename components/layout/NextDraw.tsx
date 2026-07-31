'use client'

import { useEffect, useState } from 'react'

export default function NextDraw(){

const[target]=useState(new Date())

const[time,setTime]=useState("")

useEffect(()=>{

target.setHours(21)

target.setMinutes(0)

target.setSeconds(0)

const id=setInterval(()=>{

const diff=target.getTime()-Date.now()

const h=Math.floor(diff/3600000)

const m=Math.floor(diff%3600000/60000)

const s=Math.floor(diff%60000/1000)

setTime(

`${h}h ${m}m ${s}s`

)

},1000)

return()=>clearInterval(id)

},[])

return(

<div className="nextdraw">

⏳ Próximo sorteo

<strong>

{time}

</strong>

</div>

)

}
