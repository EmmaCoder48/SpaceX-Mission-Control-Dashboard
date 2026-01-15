"use client";
import { useState, useEffect } from "react";
import { getLaunches } from "@/app/services/SpacexData";
import Countdown from "../CountDown";

/**
 * Componente NextMissionHero
 * * Este componente actúa como la sección principal (Hero) de la aplicación.
 * Implementa una arquitectura 'Above the Fold' utilizando efectos de posicionamiento
 * sticky y visualización de telemetría en tiempo real (Countdown).
 */
export default function NextMissionHero() {
  // Estado para gestionar la data de la misión y el ciclo de vida de la petición.
  const [nextLaunch, setNextLaunch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNext = async () => {
      // Consumo el servicio de lanzamientos de forma asíncrona.
      const allLaunches = await getLaunches("");

      if (allLaunches && allLaunches.length > 0) {
        const now = new Date().getTime();

        /**
         * Lógica de filtrado: Busco el primer lanzamiento programado para el futuro
         * (con un margen de seguridad de 24 horas) para asegurar que el contador
         * proporcione una experiencia de usuario coherente.
         */
        const realNext = allLaunches.find(
          (m) => new Date(m.date_utc).getTime() > now + 86400000
        );

        if (realNext) {
          setNextLaunch(realNext);
        } else {
          /**
           * Mecanismo de Fallback: En caso de que la API no retorne misiones futuras,
           * inyecto un 'Mock Data' para evitar estados vacíos y mantener la integridad visual.
           */
          setNextLaunch({
            name: "Starship Flight 7 (Estimated)",
            date_utc: "2026-06-20T18:00:00Z",
            launchpad: "VCSC Starbase, TX",
          });
        }
      }
      setLoading(false);
    };
    fetchNext();
  }, []);

  // UI de carga con estética 'Command Line Interface' (CLI) para reforzar la temática espacial.
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-black text-zinc-700 font-mono text-xs uppercase tracking-widest animate-pulse">
        [ HANDSHAKE_WITH_STARLINK_CONSTELLATION... ]
      </div>
    );

  if (!nextLaunch) return null;

  return (
    /**
     * Contenedor Principal: Utilizo una altura de 110vh para habilitar un margen de scroll
     * que active el efecto de profundidad (Sticky Parallax).
     */
    <section className="relative h-[110vh] w-full bg-black">
      {/* Contenedor Sticky: Fijo la escena en el viewport mientras el resto del contenido
        fluye por encima, creando una transición de capas moderna.
      */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background Layer: Optimización visual mediante overlays de gradiente y opacidad */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/starship.jpg')" }}
        />

        {/* Capas de Contraste: Garantizan la legibilidad del texto sobre imágenes complejas */}
        <div className="absolute inset-0 z-10 bg-black/70" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black" />

        {/* Content Layer: Implementación de tipografía monoespaciada para un look técnico/serio */}
        <div className="relative z-20 flex flex-col items-center text-center px-6 w-full max-w-5xl">
          {/* Título: Utilizo 'break-words' para asegurar un renderizado fluido en dispositivos móviles */}
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-mono text-white uppercase mb-4 leading-tight break-words w-full">
            {nextLaunch.name}
          </h1>

          {/* Componente Countdown: Escalado dinámico según el breakpoint de pantalla */}
          <div className="scale-100 sm:scale-125 md:scale-150 py-10">
            <Countdown targetDate={nextLaunch.date_utc} />
          </div>

          {/* Footer del Hero: Metadatos geográficos con tipografía reducida para jerarquía visual */}
          <div className="mt-6 opacity-40">
            <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
              Site:{" "}
              {nextLaunch.launchpad === "5e9e4502f509094188566f88"
                ? "KSC LC-39A"
                : "Starbase TX"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
