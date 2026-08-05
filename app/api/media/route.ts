import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      type: "video",
      src: "/media/videos/promo1.mp4",
    },
    {
      type: "image",
      src: "/media/imagenes/imagen1.jpg",
      duration: 8000,
    },
    {
      type: "video",
      src: "/media/videos/promo2.mp4",
    },
    {
      type: "image",
      src: "/media/imagenes/imagen1.jpg",
      duration: 8000,
    },
    {
      type: "video",
      src: "/media/videos/promo3.mp4",
    },
    {
      type: "image",
      src: "/media/imagenes/imagen1.jpg",
      duration: 8000,
    },
  ]);
}
