'use client'

import { useEffect, useState } from "react";

export default function Header() {
  const [hora, setHora] = useState("");

  useEffect(() => {
    const actualizar = () => {
      const ahora = new Date();

      setHora(
        ahora.toLocaleString("es-UY", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    actualizar();

    const id = setInterval(actualizar, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-green-700 via-green-600 to-green-700 border-b-4 border-yellow-400 shadow-2xl">

      <div className="flex items-center justify-between px-10 py-5">

        <div>

          <h1 className="text-5xl font-extrabold tracking-wide">

            MEGAL ROCHA

          </h1>

          <p className="text-xl opacity-90">

            Resultados Oficiales del Uruguay

          </p>

        </div>

        <div className="text-right">

          <div className="text-4xl font-bold">

            {hora}

          </div>

          <div className="text-lg">

            Actualización automática

          </div>

        </div>

      </div>

    </header>
  );
}
