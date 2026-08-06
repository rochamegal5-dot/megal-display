import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      type: "video",
      src: "/media/videos/megal.mp4"
    }
  ]);
}
