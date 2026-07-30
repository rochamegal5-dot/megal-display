interface Props{

icon:string

title:string

subtitle:string

color:string

}

export default function PanelTitle({

icon,
title,
subtitle,
color

}:Props){

return(

<div className={`panel-header ${color}`}>

<div>

<h2>

{icon} {title}

</h2>

<p>

{subtitle}

</p>

</div>

</div>

)

}
