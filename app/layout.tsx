export default function Header() {
  return (
    <header className="h-24 bg-slate-900 border-b border-green-600 flex items-center justify-between px-8">

      <div className="text-4xl font-bold text-green-500">
        MEGAL DISPLAY
      </div>

      <div className="text-xl">
        Resultados Oficiales
      </div>

      <div className="text-right">

        <div>Hora</div>

        <div>Clima</div>

      </div>

    </header>
  );
}
