'use client'

import { useEffect, useState } from 'react'

export default function LastUpdate(){

const[now,setNow]=useState("")

useEffect(()=>{

const id=setInterval(()=>{

setNow(

new Date().toLocaleTimeString("es-UY")

)

},1000)

return()=>clearInterval(id)

},[])

return(

<div className="last-update">

🟢 Última actualización

{now}

</div>

)

}
