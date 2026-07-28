import Header from "@/components/layout/Header";
import QuinielaPanel from "@/components/panels/QuinielaPanel";
import TombolaPanel from "@/components/panels/TombolaPanel";
import FiveGoldPanel from "@/components/panels/FiveGoldPanel";
import AdsPanel from "@/components/panels/AdsPanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <Header />

      <div className="p-6 space-y-6">

        {/* Primera fila */}
        <section className="grid grid-cols-2 gap-6">

          <QuinielaPanel />

          <TombolaPanel />

        </section>

        {/* Segunda fila */}
        <section>

          <FiveGoldPanel />

        </section>

        {/* Publicidad */}
        <section>

          <AdsPanel />

        </section>

      </div>

    </main>
  );
}
