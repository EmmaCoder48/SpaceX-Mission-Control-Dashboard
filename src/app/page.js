import SpaceXMissionControl from "@/components/spacex/SpaceXMissionControl";
import NextMissionHero from "@/components/spacex/NextLaunchHero";

/**
 * Vista principal de la aplicación (Home Page).
 * * Arquitectura de la página:
 * 1. NextMissionHero: Actúa como el 'Above the fold', presentando la información
 * crítica del próximo lanzamiento con un impacto visual inmediato.
 * 2. SpaceXMissionControl: Sección de gestión de datos que permite al usuario
 * explorar el historial completo de misiones.
 */
export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      {/* Implemento una estructura de composición de componentes. 
        Al separar el 'Hero' del 'Dashboard', facilito el mantenimiento 
        y permito que Next.js optimice el renderizado de cada sección.
      */}

      <NextMissionHero />

      <section className="relative z-30">
        <SpaceXMissionControl />
      </section>
    </main>
  );
}
