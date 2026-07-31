import {loadDNLQ} from "@/services/providers/dnlq";

import {parseDNLQ} from "@/services/parsers/dnlqParser";

export async function getResultados(){

const html=await loadDNLQ();

return parseDNLQ(html);

}
