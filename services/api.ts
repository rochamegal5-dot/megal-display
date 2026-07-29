import { API } from "@/lib/constants";

import type { QuinielaResponse } from "@/types/quiniela";
import type { TombolaResponse } from "@/types/tombola";
import type { FiveGoldResponse } from "@/types/fiveGold";
import type { WeatherResponse } from "@/types/weather";

async function request<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }

  return res.json();
}

export function obtenerQuiniela() {
  return request<QuinielaResponse>(API.QUINIELA);
}

export function obtenerTombola() {
  return request<TombolaResponse>(API.TOMBOLA);
}

export function obtenerCincoDeOro() {
  return request<FiveGoldResponse>(API.FIVE_GOLD);
}

export function obtenerClima() {
  return request<WeatherResponse>(API.WEATHER);
}
