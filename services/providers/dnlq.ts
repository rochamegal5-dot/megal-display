import axios from "axios";

const URL =
  "https://www.loteria.gub.uy/movil/24_25_resultados.php";

export async function loadDNLQ(): Promise<string> {
  const { data } = await axios.get(URL, {
    timeout: 15000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) MegalDisplay/2.0",
      Accept:
        "text/html,application/xhtml+xml",
    },
  });

  return String(data);
}
