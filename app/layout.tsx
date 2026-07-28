import Header from "@/components/layout/Header";
import QuinielaPanel from "@/components/panels/QuinielaPanel";
import TombolaPanel from "@/components/panels/TombolaPanel";
import FiveGoldPanel from "@/components/panels/FiveGoldPanel";
import AdsPanel from "@/components/panels/AdsPanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="grid grid-cols-3 gap-6 p-6">
        <QuinielaPanel />
        <TombolaPanel />
        <FiveGoldPanel />
      </section>

      <AdsPanel />
    </main>
  );
}
