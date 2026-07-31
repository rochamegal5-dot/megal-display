'use client'

import { useEffect, useState } from 'react'

export default function SystemStatus(){

const[online,setOnline]=useState(true)

useEffect(()=>{

const id=setInterval(async()=>{

try{

const r=await fetch("/api/status")

setOnline(r.ok)

}catch{

setOnline(false)

}

},10000)

return()=>clearInterval(id)

},[])

return(

<div className="server-status">

{

online

?

"🟢 SERVIDOR ONLINE"

:

"🔴 SIN CONEXIÓN"

}

</div>

)

}
