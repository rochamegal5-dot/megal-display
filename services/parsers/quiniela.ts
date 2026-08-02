import type { CheerioAPI } from "cheerio";

export interface Premio {

    puesto:number;

    numero:string;

}

export interface QuinielaResponse{

    fecha:string;

    vespertina:Premio[];

    nocturna:Premio[];

}

function leerTabla(tab:any){

    const resultados:Premio[]=[];

    tab.find("tr").each((_:number,row:any)=>{

        const td=tab(row).find("td");

        if(td.length>=2){

            const puesto=parseInt(tab(td[0]).text().trim());

            const numero=tab(td[1]).text().trim();

            if(!isNaN(puesto)){

                resultados.push({

                    puesto,

                    numero

                });

            }

        }

    });

    return resultados;

}

export function parseQuiniela($:CheerioAPI):QuinielaResponse{

    const tablas=$("table");

    let fecha="";

    $("body")
        .text()
        .split("\n")
        .forEach(line=>{

            if(/\d{2}\/\d{2}\/\d{4}/.test(line)){

                fecha=line.trim();

            }

        });

    const respuesta:QuinielaResponse={

        fecha,

        vespertina:[],

        nocturna:[]

    };

    tablas.each((i,el)=>{

        const texto=$(el).text().toUpperCase();

        if(texto.includes("VESPERTINA")){

            respuesta.vespertina=leerTabla($(el));

        }

        if(texto.includes("NOCTURNA")){

            respuesta.nocturna=leerTabla($(el));

        }

    });

    return respuesta;

}
