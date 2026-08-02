import axios from "axios";
import * as cheerio from "cheerio";

const URL = "https://www.loteria.gub.uy/ver_resultados.php";

export async function getDocument() {
  const { data } = await axios.get(URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    },
    timeout: 15000,
  });

  return cheerio.load(data);
}
