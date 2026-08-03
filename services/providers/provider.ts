import { getDocument } from "./dnlq";
import { parseDNLQ } from "@/services/parsers/dnlqParser";
import { get, put } from "@/services/cache/cache";

const CACHE_KEY = "dnlq";

export async function getResultados() {

  const cache = get(CACHE_KEY);

  try {

    const $ = await getDocument();

    const datos = parseDNLQ($);

    put(CACHE_KEY, datos, 60000);

    return datos;

  } catch (error) {

    console.log("Usando caché...");

    if (cache) return cache;

    throw error;

  }

}
