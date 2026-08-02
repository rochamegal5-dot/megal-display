import { NextResponse } from "next/server";
import { getDocument } from "@/services/providers/dnlq";
import { parseQuiniela } from "@/services/parsers/quiniela";

export async function GET(){

    try{

        const $=await getDocument();

        return NextResponse.json(
            parseQuiniela($)
        );

    }catch(e){

        return NextResponse.json(
            {error:"No se pudo leer la DNLQ"},
            {status:500}
        );

    }

}
