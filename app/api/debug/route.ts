import { NextResponse } from "next/server";
import { loadDNLQ } from "@/services/providers/dnlq";

export async function GET() {

  const html = await loadDNLQ();

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html"
    }
  });

}
