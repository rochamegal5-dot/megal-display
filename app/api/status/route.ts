import { NextResponse } from "next/server";

export async function GET() {

  return NextResponse.json({

    servidor: "ONLINE",

    hora: new Date(),

    cache: true,

    version: "2.0"

  });

}
