"use client";
import { useState, useEffect } from "react";
import { getLaunches } from "@/app/services/SpacexData";
import MissionCard from "./MissionCard";

/**
 * Componente SpaceXMissionControl
 * Gestión centralizada del historial de lanzamientos.
 * * Este componente orquestra la recuperación de datos masivos y aplica
 * filtros reactivos sobre el estado de las misiones (Éxito/Fallo).
 */
export default function SpaceXMissionControl() {
  // Estados independientes para segmentar la data según su naturaleza (Past/Upcoming)
  const [pastMissions, setPastMissions] = useState([]);
  const [upcomingMissions, setUpcomingMissions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Optimización de concurrencia: Utilizo Promise.all para disparar
     * ambas peticiones HTTP en paralelo, reduciendo el tiempo total
     * de carga (TTFB) de la sección de control.
     */
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [past, upcoming] = await Promise.all([
          getLaunches("past"),
          getLaunches("upcoming"),
        ]);

        // Invierto el array para mostrar los lanzamientos más recientes primero
        setPastMissions(past.reverse());
        setUpcomingMissions(upcoming);
      } catch (error) {
        console.error(
          "Error crítico en la sincronización de telemetría:",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  /**
   * Lógica de Filtrado Reactivo:
   * Se computa en cada render para mantener la UI sincronizada con el estado del filtro.
   */
  const filteredMissions = pastMissions.filter((m) => {
    if (filter === "success") return m.success === true;
    if (filter === "failed") return m.success === false;
    return true;
  });

  // Estado de carga con semántica de terminal de control
  if (loading)
    return (
      <div className="p-10 text-orange-500 animate-pulse font-mono bg-black">
        SYSTEM_DIAGNOSTIC: LOADING_MISSION_LOGS...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white font-mono p-6">
      {/* SECCIÓN: HISTORIAL CON FILTROS */}
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-ping" />
            <h2 className="text-orange-400 text-sm font-bold tracking-[0.3em] uppercase">
              Mission_Log_History
            </h2>
          </div>

          {/* CONTROL DE FILTROS: Interfaz técnica de botones de estado */}
          <nav className="flex bg-zinc-900/50 p-1 border border-zinc-800 rounded-sm">
            {["all", "success", "failed"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-1 text-[9px] uppercase transition-all duration-300 ${
                  filter === t
                    ? "bg-orange-600 text-black font-bold"
                    : "text-zinc-500 hover:text-orange-300 hover:bg-zinc-800"
                }`}>
                {t}
              </button>
            ))}
          </nav>
        </div>

        {/* FEED DE MISIONES: 
            Limito el renderizado inicial (slice) para optimizar el DOM 
            y asegurar un scroll fluido.
        */}
        <div className="flex flex-col gap-3">
          {filteredMissions.length > 0 ? (
            filteredMissions
              .slice(0, 15)
              .map((m) => (
                <MissionCard key={m.id} mission={m} isUpcoming={false} />
              ))
          ) : (
            <div className="py-20 text-center text-zinc-700 text-xs border border-dashed border-zinc-900">
              NO_DATA_MATCHES_CURRENT_FILTER_CRITERIA
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
