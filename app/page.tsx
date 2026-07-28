import Header from "@/components/layout/Header";
import QuinielaPanel from "@/components/panels/QuinielaPanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="p-6">
        <QuinielaPanel />
      </section>
    </main>
  );
}
