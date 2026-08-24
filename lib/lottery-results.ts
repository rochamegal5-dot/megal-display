import * as cheerio from 'cheerio'

const BASE_URL = 'https://www.loteria.gub.uy/ver_resultados.php'

type Premio = { puesto: number; numero: string }

export type QuinielaLado = {
  fecha: string
  premios: Premio[]
}

export type TombolaLado = {
  fecha: string
  numeros: string[]
}

export type ResultadoDia = {
  quiniela: Premio[]
  tombola: string[]
  fecha: string
}

const FALLBACK_QUINIELA_NOCTURNA = [
  '296','172','375','033','051','081','759','395','533','066',
  '143','369','650','779','059','558','779','584','717','804',
].map((numero, index) => ({ puesto: index + 1, numero }))

const FALLBACK_TOMBOLA_NOCTURNA = [
  '04','17','33','43','49','50','51','58','59','62',
  '66','69','72','75','76','79','81','84','95','96',
]

const FALLBACK_FECHA = 'Último resultado guardado'

function normalizar(texto: string) {
  return texto.replace(/\s+/g, ' ').trim()
}

function fechaDesdeTexto(texto: string) {
  return (
    texto.match(/(?:Lunes|Martes|Miércoles|Miercoles|Jueves|Viernes|Sábado|Sabado|Domingo)\s+\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚáéíóú]+\s+de\s+\d{4}/)?.[0] ??
    texto.match(/\b\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚáéíóú]+\s+de\s+\d{4}\b/)?.[0] ??
    ''
  )
}

export async function obtenerResultadoDia(fecha?: Date): Promise<ResultadoDia | null> {
  const url = fecha
    ? `${BASE_URL}?vano=${fecha.getFullYear()}&vdia=${String(fecha.getDate()).padStart(2, '0')}&vmes=${String(fecha.getMonth() + 1).padStart(2, '0')}`
    : BASE_URL

  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; MegalDisplay/1.0)',
      Accept: 'text/html,application/xhtml+xml',
    },
  })

  if (!res.ok) throw new Error(`DNLQ respondió ${res.status}`)

  const html = await res.text()
  const $ = cheerio.load(html)
  const valores = $('div.text_azul_3')
    .map((_, el) => normalizar($(el).text()))
    .get()
    .filter(Boolean)

  const quiniela = valores
    .filter((valor) => /^\d{3}$/.test(valor))
    .slice(0, 20)
    .map((numero, index) => ({ puesto: index + 1, numero }))

  const tombola = valores
    .filter((valor) => /^\d{2}$/.test(valor))
    .slice(0, 20)

  const fechaTexto = fechaDesdeTexto(normalizar($('body').text()))

  if (!quiniela.length && !tombola.length) return null

  return { quiniela, tombola, fecha: fechaTexto }
}

function fechaAnterior(base: Date, dias: number) {
  const copia = new Date(base)
  copia.setDate(copia.getDate() - dias)
  return copia
}

export async function obtenerUltimosResultados() {
  const hoy = new Date()
  let vespertina: QuinielaLado = { fecha: '', premios: [] }
  let nocturna: QuinielaLado = { fecha: '', premios: [] }
  let tombolaVespertina: TombolaLado = { fecha: '', numeros: [] }
  let tombolaNocturna: TombolaLado = { fecha: '', numeros: [] }

  for (let offset = 0; offset < 10; offset++) {
    try {
      const resultado = await obtenerResultadoDia(offset === 0 ? undefined : fechaAnterior(hoy, offset))
      if (!resultado) continue

      if (!vespertina.premios.length && resultado.quiniela.length) {
        vespertina = { fecha: resultado.fecha, premios: resultado.quiniela }
      }
      if (!tombolaVespertina.numeros.length && resultado.tombola.length) {
        tombolaVespertina = { fecha: resultado.fecha, numeros: resultado.tombola }
      }

      // La primera consulta puede contener solo el sorteo vespertino. Para el
      // nocturno buscamos el último día publicado completo en el histórico.
      if (offset > 0) {
        if (!nocturna.premios.length && resultado.quiniela.length) {
          nocturna = { fecha: resultado.fecha, premios: resultado.quiniela }
        }
        if (!tombolaNocturna.numeros.length && resultado.tombola.length) {
          tombolaNocturna = { fecha: resultado.fecha, numeros: resultado.tombola }
        }
      }

      if (
        vespertina.premios.length &&
        nocturna.premios.length &&
        tombolaVespertina.numeros.length &&
        tombolaNocturna.numeros.length
      ) break
    } catch (error) {
      console.error('Error consultando histórico DNLQ:', error)
    }
  }

  if (!vespertina.premios.length && FALLBACK_QUINIELA_NOCTURNA.length) {
    vespertina = { fecha: FALLBACK_FECHA, premios: FALLBACK_QUINIELA_NOCTURNA }
  }
  if (!nocturna.premios.length && FALLBACK_QUINIELA_NOCTURNA.length) {
    nocturna = { fecha: FALLBACK_FECHA, premios: FALLBACK_QUINIELA_NOCTURNA }
  }
  if (!tombolaVespertina.numeros.length) {
    tombolaVespertina = { fecha: FALLBACK_FECHA, numeros: FALLBACK_TOMBOLA_NOCTURNA }
  }
  if (!tombolaNocturna.numeros.length) {
    tombolaNocturna = { fecha: FALLBACK_FECHA, numeros: FALLBACK_TOMBOLA_NOCTURNA }
  }

  return { vespertina, nocturna, tombolaVespertina, tombolaNocturna }
}
