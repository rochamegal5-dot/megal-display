import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      type: "video",
      src: "/media/videos/promo1.mp4"
    }
  ]);
}
