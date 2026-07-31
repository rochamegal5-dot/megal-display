import axios from "axios";
import * as cheerio from "cheerio";

const URL =
  "https://www.loteria.gub.uy/ver_resultados.php";

export async function loadDNLQ() {

  const { data } = await axios.get(URL, {

    timeout: 15000,

    headers: {

      "User-Agent":
        "Mozilla/5.0 MegalDisplay",

    },

  });

  return cheerio.load(data);

}
