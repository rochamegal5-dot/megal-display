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
   EXTRAER NÚMEROS DE UNA SECCIÓN
===================================================== */

function extraerNumerosDeSeccion(
  $: cheerio.CheerioAPI,
  elemento: cheerio.Element,
) {
  const numeros3: string[] = []
  const numeros2: string[] = []

  const texto = normalizar($(elemento).text())

  /*
   * Primero buscamos números de 3 cifras.
   * Son los correspondientes a Quiniela.
   */
  const encontrados3 = texto.match(/\b\d{3}\b/g) ?? []

  for (const numero of encontrados3) {
    if (!numeros3.includes(numero)) {
      numeros3.push(numero)
    }
  }

  /*
   * Luego buscamos números de 2 cifras.
   *
   * En la página oficial aparecen así:
   *
   * 01 | separador | 02
   * 04 | separador | 06
   *
   * Por eso hay que extraer AMBOS.
   */
  const encontrados2 = texto.match(/\b\d{2}\b/g) ?? []

  for (const numero of encontrados2) {
    if (!numeros2.includes(numero)) {
      numeros2.push(numero)
    }
  }

  return {
    quiniela: numeros3.slice(0, 20),
    tombola: numeros2.slice(0, 20),
  }
}

/* =====================================================
   BUSCAR BLOQUES VESPERTINO / NOCTURNO
===================================================== */

function encontrarBloques(
  $: cheerio.CheerioAPI,
) {
  const bloques: {
    tipo: 'vespertina' | 'nocturna'
    elemento: cheerio.Element
  }[] = []

  $('body *').each((_, el) => {
    const texto = normalizar($(el).text())

    if (
      texto.includes('TABLA QUINIELA Y TOMBOLA VESPERTINA') ||
      texto.includes('QUINIELA Y TÓMBOLA VESPERTINA')
    ) {
      bloques.push({
        tipo: 'vespertina',
        elemento: el,
      })
    }

    if (
      texto.includes('TABLA QUINIELA Y TOMBOLA NOCTURNO') ||
      texto.includes('TABLA QUINIELA Y TOMBOLA NOCTURNA') ||
      texto.includes('QUINIELA Y TÓMBOLA NOCTURNO')
    ) {
      bloques.push({
        tipo: 'nocturna',
        elemento: el,
      })
    }
  })

  return bloques
}

/* =====================================================
   RESULTADO DE UN DÍA
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

  /*
   * =====================================================
   * MÉTODO PRINCIPAL
   *
   * La página oficial tiene primero la tabla Vespertina
   * y luego la tabla Nocturna.
   * =====================================================
   */

  const textosVespertinos: string[] = []
  const textosNocturnos: string[] = []

  /*
   * Buscamos directamente las tablas que contienen
   * los títulos correspondientes.
   */

  $('table').each((_, table) => {

    const texto = normalizar($(table).text())

    if (
      texto.includes('TABLA QUINIELA VESPERTINA') ||
      texto.includes('TABLA TOMBOLA VESPERTINA')
    ) {
      textosVespertinos.push(texto)
    }

    if (
      texto.includes('TABLA QUINIELA NOCTURNO') ||
      texto.includes('TABLA TOMBOLA NOCTURNO')
    ) {
      textosNocturnos.push(texto)
    }

  })

  /*
   * =====================================================
   * VESPERTINA
   * =====================================================
   */

  if (textosVespertinos.length) {

    const texto = textosVespertinos.join(' ')

    const quiniela = Array.from(
      new Set(texto.match(/\b\d{3}\b/g) ?? []),
    ).slice(0, 20)

    const tombola = Array.from(
      new Set(texto.match(/\b\d{2}\b/g) ?? []),
    ).slice(0, 20)

    resultado.quinielaVespertina = crearPremios(quiniela)

    resultado.tombolaVespertina = tombola

    resultado.fechaVespertina =
      fechaDesdeTexto(texto) || fechaGeneral
  }

  /*
   * =====================================================
   * NOCTURNA
   * =====================================================
   */

  if (textosNocturnos.length) {

    const texto = textosNocturnos.join(' ')

    const quiniela = Array.from(
      new Set(texto.match(/\b\d{3}\b/g) ?? []),
    ).slice(0, 20)

    const tombola = Array.from(
      new Set(texto.match(/\b\d{2}\b/g) ?? []),
    ).slice(0, 20)

    resultado.quinielaNocturna = crearPremios(quiniela)

    resultado.tombolaNocturna = tombola

    resultado.fechaNocturna =
      fechaDesdeTexto(texto) || fechaGeneral
  }

  /*
   * =====================================================
   * SEGUNDO MÉTODO
   *
   * Si la página cambia la estructura de tablas,
   * intentamos localizar los bloques por encabezado.
   * =====================================================
   */

  if (
    !resultado.quinielaVespertina.length ||
    !resultado.tombolaVespertina.length ||
    !resultado.quinielaNocturna.length ||
    !resultado.tombolaNocturna.length
  ) {

    const bloques = encontrarBloques($)

    for (const bloque of bloques) {

      const texto = normalizar($(bloque.elemento).parent().text())

      const numeros3 = Array.from(
        new Set(texto.match(/\b\d{3}\b/g) ?? []),
      ).slice(0, 20)

      const numeros2 = Array.from(
        new Set(texto.match(/\b\d{2}\b/g) ?? []),
      ).slice(0, 20)

      if (bloque.tipo === 'vespertina') {

        if (!resultado.quinielaVespertina.length) {
          resultado.quinielaVespertina = crearPremios(numeros3)
        }

        if (!resultado.tombolaVespertina.length) {
          resultado.tombolaVespertina = numeros2
        }

        if (!resultado.fechaVespertina) {
          resultado.fechaVespertina =
            fechaDesdeTexto(texto) || fechaGeneral
        }
      }

      if (bloque.tipo === 'nocturna') {

        if (!resultado.quinielaNocturna.length) {
          resultado.quinielaNocturna = crearPremios(numeros3)
        }

        if (!resultado.tombolaNocturna.length) {
          resultado.tombolaNocturna = numeros2
        }

        if (!resultado.fechaNocturna) {
          resultado.fechaNocturna =
            fechaDesdeTexto(texto) || fechaGeneral
        }
      }
    }
  }

  /*
   * =====================================================
   * VALIDACIÓN
   * =====================================================
   */

  console.log('RESULTADO DNLQ:', {
    fechaVespertina: resultado.fechaVespertina,
    quinielaVespertina:
      resultado.quinielaVespertina.length,
    tombolaVespertina:
      resultado.tombolaVespertina.length,
    fechaNocturna: resultado.fechaNocturna,
    quinielaNocturna:
      resultado.quinielaNocturna.length,
    tombolaNocturna:
      resultado.tombolaNocturna.length,
  })

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

  copia.setDate(copia.getDate() - dias)

  return copia
}

/* =====================================================
   OBTENER ÚLTIMOS RESULTADOS
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
   * Esto permite que si todavía no salió el sorteo de hoy,
   * se muestre automáticamente el último publicado.
   */

  for (let offset = 0; offset < 10; offset++) {

    try {

      const resultado = await obtenerResultadoDia(
        offset === 0
          ? undefined
          : fechaAnterior(hoy, offset),
      )

      if (!resultado) continue

      /*
       * VESPERTINA
       */

      if (
        !vespertina.premios.length &&
        resultado.quinielaVespertina.length
      ) {
        vespertina = {
          fecha: resultado.fechaVespertina,
          premios: resultado.quinielaVespertina,
        }
      }

      if (
        !tombolaVespertina.numeros.length &&
        resultado.tombolaVespertina.length >= 20
      ) {
        tombolaVespertina = {
          fecha: resultado.fechaVespertina,
          numeros: resultado.tombolaVespertina.slice(0, 20),
        }
      }

      /*
       * NOCTURNA
       */

      if (
        !nocturna.premios.length &&
        resultado.quinielaNocturna.length
      ) {
        nocturna = {
          fecha: resultado.fechaNocturna,
          premios: resultado.quinielaNocturna,
        }
      }

      if (
        !tombolaNocturna.numeros.length &&
        resultado.tombolaNocturna.length >= 20
      ) {
        tombolaNocturna = {
          fecha: resultado.fechaNocturna,
          numeros: resultado.tombolaNocturna.slice(0, 20),
        }
      }

      /*
       * Cuando tenemos los cuatro resultados completos,
       * dejamos de consultar días anteriores.
       */

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

  /*
   * =====================================================
   * DEVOLVEMOS SOLO RESULTADOS ENCONTRADOS
   *
   * No inventamos números.
   * =====================================================
   */

  return {
    vespertina: {
      fecha: vespertina.fecha,
      premios: vespertina.premios.slice(0, 20),
    },

    nocturna: {
      fecha: nocturna.fecha,
      premios: nocturna.premios.slice(0, 20),
    },

    tombolaVespertina: {
      fecha: tombolaVespertina.fecha,
      numeros: tombolaVespertina.numeros.slice(0, 20),
    },

    tombolaNocturna: {
      fecha: tombolaNocturna.fecha,
      numeros: tombolaNocturna.numeros.slice(0, 20),
    },
  }
}
