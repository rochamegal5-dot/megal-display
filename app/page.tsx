import Header from "@/components/layout/Header";

import QuinielaPanel from "@/components/panels/QuinielaPanel";
import TombolaPanel from "@/components/panels/TombolaPanel";
import FiveGoldPanel from "@/components/panels/FiveGoldPanel";
import AdsPanel from "@/components/panels/AdsPanel";

export default function Home() {
  return (
    <main className="dashboard">

      <Header />

      <section className="principal">

        <div className="columna">

          <QuinielaPanel />

        </div>

        <div className="columna">

          <TombolaPanel />

        </div>

        <div className="columna">

          <FiveGoldPanel />

        </div>

      </section>

      <AdsPanel />

    </main>
  );
}
