import * as cheerio from 'cheerio'

const BASE_URL = 'https://www.loteria.gub.uy/ver_resultados.php'

type Premio = {
  puesto: number
  numero: string
}

export type QuinielaLado = {
  fecha: string
  premios: Premio[]
}

export type TombolaLado = {
  fecha: string
  numeros: string[]
}

export type ResultadoDia = {
  quinielaVespertina: Premio[]
  quinielaNocturna: Premio[]
  tombolaVespertina: string[]
  tombolaNocturna: string[]
  fechaVespertina: string
  fechaNocturna: string
}

/* =====================================================
   UTILIDADES
===================================================== */

function normalizar(texto: string) {
  return texto.replace(/\s+/g, ' ').trim()
}

function fechaDesdeTexto(texto: string) {
  const patrones = [
    /(?:Lunes|Martes|Miércoles|Miercoles|Jueves|Viernes|Sábado|Sabado|Domingo)\s+\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚáéíóú]+\s+de\s+\d{4}/i,
    /\b\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚáéíóú]+\s+de\s+\d{4}\b/i,
  ]

  for (const patron of patrones) {
    const encontrado = texto.match(patron)?.[0]

    if (encontrado) {
      return encontrado
    }
  }

  return ''
}

function crearPremios(numeros: string[]): Premio[] {
  return numeros
    .slice(0, 20)
    .map((numero, index) => ({
      puesto: index + 1,
      numero,
    }))
}

/* =====================================================
   OBTENER RESULTADO DE UN DÍA
===================================================== */

export async function obtenerResultadoDia(
  fecha?: Date,
): Promise<ResultadoDia | null> {

  const url = fecha
    ? `${BASE_URL}?vano=${fecha.getFullYear()}&vdia=${String(
        fecha.getDate(),
      ).padStart(2, '0')}&vmes=${String(
        fecha.getMonth() + 1,
      ).padStart(2, '0')}`
    : BASE_URL

  console.log('Consultando DNLQ:', url)

  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  })

  if (!res.ok) {
    throw new Error(`DNLQ respondió ${res.status}`)
  }

  const html = await res.text()

  const $ = cheerio.load(html)

  const cuerpo = normalizar($('body').text())

  const fechaGeneral = fechaDesdeTexto(cuerpo)

  const resultado: ResultadoDia = {
    quinielaVespertina: [],
    quinielaNocturna: [],
    tombolaVespertina: [],
    tombolaNocturna: [],
    fechaVespertina: '',
    fechaNocturna: '',
  }

  /* =====================================================
     BUSCAR TABLAS
  ===================================================== */

  const tablasVespertina: string[] = []
  const tablasNocturna: string[] = []

  $('table').each((_, table) => {

    const texto = normalizar($(table).text())

    const textoMayus = texto.toUpperCase()

    if (
      textoMayus.includes('QUINIELA VESPERTINA') ||
      textoMayus.includes('TOMBOLA VESPERTINA') ||
      textoMayus.includes('TÓMBOLA VESPERTINA')
    ) {
      tablasVespertina.push(texto)
    }

    if (
      textoMayus.includes('QUINIELA NOCTURNO') ||
      textoMayus.includes('QUINIELA NOCTURNA') ||
      textoMayus.includes('TOMBOLA NOCTURNO') ||
      textoMayus.includes('TOMBOLA NOCTURNA') ||
      textoMayus.includes('TÓMBOLA NOCTURNO') ||
      textoMayus.includes('TÓMBOLA NOCTURNA')
    ) {
      tablasNocturna.push(texto)
    }

  })

  /* =====================================================
     VESPERTINA
  ===================================================== */

  if (tablasVespertina.length) {

    const texto = tablasVespertina.join(' ')

    const numeros3 = Array.from(
      new Set(
        texto.match(/\b\d{3}\b/g) ?? [],
      ),
    ).slice(0, 20)

    const numeros2 = Array.from(
      new Set(
        texto.match(/\b\d{2}\b/g) ?? [],
      ),
    ).slice(0, 20)

    resultado.quinielaVespertina =
      crearPremios(numeros3)

    resultado.tombolaVespertina =
      numeros2

    resultado.fechaVespertina =
      fechaDesdeTexto(texto) || fechaGeneral
  }

  /* =====================================================
     NOCTURNA
  ===================================================== */

  if (tablasNocturna.length) {

    const texto = tablasNocturna.join(' ')

    const numeros3 = Array.from(
      new Set(
        texto.match(/\b\d{3}\b/g) ?? [],
      ),
    ).slice(0, 20)

    const numeros2 = Array.from(
      new Set(
        texto.match(/\b\d{2}\b/g) ?? [],
      ),
    ).slice(0, 20)

    resultado.quinielaNocturna =
      crearPremios(numeros3)

    resultado.tombolaNocturna =
      numeros2

    resultado.fechaNocturna =
      fechaDesdeTexto(texto) || fechaGeneral
  }

  /* =====================================================
     INFORMACIÓN DE DEPURACIÓN
  ===================================================== */

  console.log('RESULTADO DNLQ:', {
    fechaVespertina:
      resultado.fechaVespertina,

    quinielaVespertina:
      resultado.quinielaVespertina.length,

    tombolaVespertina:
      resultado.tombolaVespertina.length,

    fechaNocturna:
      resultado.fechaNocturna,

    quinielaNocturna:
      resultado.quinielaNocturna.length,

    tombolaNocturna:
      resultado.tombolaNocturna.length,
  })

  /* =====================================================
     SI NO ENCONTRAMOS NADA
  ===================================================== */

  if (
    !resultado.quinielaVespertina.length &&
    !resultado.tombolaVespertina.length &&
    !resultado.quinielaNocturna.length &&
    !resultado.tombolaNocturna.length
  ) {
    return null
  }

  return resultado
}

/* =====================================================
   FECHA ANTERIOR
===================================================== */

function fechaAnterior(
  base: Date,
  dias: number,
) {
  const copia = new Date(base)

  copia.setDate(
    copia.getDate() - dias,
  )

  return copia
}

/* =====================================================
   ÚLTIMOS RESULTADOS
===================================================== */

export async function obtenerUltimosResultados() {

  const hoy = new Date()

  let vespertina: QuinielaLado = {
    fecha: '',
    premios: [],
  }

  let nocturna: QuinielaLado = {
    fecha: '',
    premios: [],
  }

  let tombolaVespertina: TombolaLado = {
    fecha: '',
    numeros: [],
  }

  let tombolaNocturna: TombolaLado = {
    fecha: '',
    numeros: [],
  }

  /*
   * Buscamos hasta 10 días hacia atrás.
   *
   * Si hoy todavía no publicó un resultado,
   * seguimos buscando hasta encontrar el último
   * resultado oficial disponible.
   */

  for (
    let offset = 0;
    offset < 10;
    offset++
  ) {

    try {

      const resultado =
        await obtenerResultadoDia(
          offset === 0
            ? undefined
            : fechaAnterior(
                hoy,
                offset,
              ),
        )

      if (!resultado) {
        continue
      }

      /* =================================================
         QUINIELA VESPERTINA
      ================================================= */

      if (
        !vespertina.premios.length &&
        resultado.quinielaVespertina.length
      ) {

        vespertina = {
          fecha:
            resultado.fechaVespertina,

          premios:
            resultado.quinielaVespertina,
        }
      }

      /* =================================================
         TÓMBOLA VESPERTINA
      ================================================= */

      if (
        !tombolaVespertina.numeros.length &&
        resultado.tombolaVespertina.length >= 20
      ) {

        tombolaVespertina = {

          fecha:
            resultado.fechaVespertina,

          numeros:
            resultado.tombolaVespertina.slice(
              0,
              20,
            ),
        }
      }

      /* =================================================
         QUINIELA NOCTURNA
      ================================================= */

      if (
        !nocturna.premios.length &&
        resultado.quinielaNocturna.length
      ) {

        nocturna = {

          fecha:
            resultado.fechaNocturna,

          premios:
            resultado.quinielaNocturna,
        }
      }

      /* =================================================
         TÓMBOLA NOCTURNA
      ================================================= */

      if (
        !tombolaNocturna.numeros.length &&
        resultado.tombolaNocturna.length >= 20
      ) {

        tombolaNocturna = {

          fecha:
            resultado.fechaNocturna,

          numeros:
            resultado.tombolaNocturna.slice(
              0,
              20,
            ),
        }
      }

      /* =================================================
         SI TENEMOS TODO, TERMINAMOS
      ================================================= */

      if (
        vespertina.premios.length >= 20 &&
        nocturna.premios.length >= 20 &&
        tombolaVespertina.numeros.length >= 20 &&
        tombolaNocturna.numeros.length >= 20
      ) {

        break
      }

    } catch (error) {

      console.error(
        'Error consultando DNLQ:',
        error,
      )
    }
  }

  /* =====================================================
     RESULTADO FINAL
  ===================================================== */

  return {

    vespertina: {

      fecha:
        vespertina.fecha,

      premios:
        vespertina.premios.slice(
          0,
          20,
        ),
    },

    nocturna: {

      fecha:
        nocturna.fecha,

      premios:
        nocturna.premios.slice(
          0,
          20,
        ),
    },

    tombolaVespertina: {

      fecha:
        tombolaVespertina.fecha,

      numeros:
        tombolaVespertina.numeros.slice(
          0,
          20,
        ),
    },

    tombolaNocturna: {

      fecha:
        tombolaNocturna.fecha,

      numeros:
        tombolaNocturna.numeros.slice(
          0,
          20,
        ),
    },
  }
}
