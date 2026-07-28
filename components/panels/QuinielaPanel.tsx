'use client'

const resultados = Array.from({ length: 20 }, (_, i) => ({
  puesto: i + 1,
  numero: '----',
}))

export default function QuinielaPanel() {
  return (
    <section className="rounded-2xl overflow-hidden border border-green-600 bg-slate-900 shadow-2xl">

      <div className="bg-green-700 px-5 py-4">

        <h2 className="text-3xl font-black tracking-wide text-white">
          QUINIELA
        </h2>

        <p className="text-green-100 text-sm">
          Resultados Oficiales
        </p>

      </div>

      <div className="p-5">

        <table className="w-full">

          <tbody>

            {resultados.map((r) => (

              <tr
                key={r.puesto}
                className="border-b border-slate-700"
              >
                <td className="py-2 font-bold text-yellow-400 w-16">
                  {r.puesto}°
                </td>

                <td className="py-2 text-right text-2xl font-black tracking-widest text-white">
                  {r.numero}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="bg-slate-800 px-5 py-3 text-sm text-slate-300">

        Última actualización:
        <span className="ml-2 text-green-400">
          esperando resultados...
        </span>

      </div>

    </section>
  )
}
