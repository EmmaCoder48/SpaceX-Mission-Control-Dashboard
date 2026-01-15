"use client";

/**
 * Componente de visualización granular para lanzamientos individuales.
 * * Implemento una lógica de estados visuales (States) para diferenciar misiones
 * futuras, exitosas o fallidas, utilizando una paleta de colores técnica y minimalista.
 * * @param {Object} mission - Objeto con la data íntegra del lanzamiento.
 * @param {boolean} isUpcoming - Flag para determinar si la misión es futura.
 */
export default function MissionCard({ mission, isUpcoming }) {
  // Gestiono los tokens de color de forma dinámica según el resultado de la misión.
  // Esto permite una lectura rápida (scannability) del historial por parte del usuario.
  const statusColor = isUpcoming
    ? "text-orange-500"
    : mission.success
    ? "text-green-500"
    : "text-red-500";

  const borderColor = isUpcoming
    ? "border-orange-500/30"
    : mission.success
    ? "border-green-500/20"
    : "border-red-500/20";

  return (
    <div
      className={`group flex items-center justify-between bg-zinc-950/50 border-l-2 ${borderColor} p-3 hover:bg-zinc-900 transition-all border-y border-r border-zinc-900`}>
      {/* SECCIÓN IZQUIERDA: Identidad visual de la misión */}
      <div className="flex items-center gap-6 flex-1">
        {/* Renderizado de Parche: Utilizo un fallback de imagen para garantizar 
            que la interfaz no se vea comprometida si la API no devuelve un patch. */}
        <div className="w-10 h-10 flex-shrink-0">
          <img
            src={
              mission.links?.patch?.small ||
              "https://www.spacex.com/static/images/share.jpg"
            }
            alt={mission.name}
            className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Metadatos de la misión: Estructura responsiva (Stack en móvil, Row en desktop) */}
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8">
          <span className="text-[10px] text-zinc-600 font-mono w-12">
            #{mission.flight_number}
          </span>
          <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest min-w-[200px]">
            {mission.name}
          </h3>
          <span className="text-[10px] text-zinc-500 font-mono hidden lg:block">
            ROCKET: <span className="text-zinc-400">FALCON_9</span>
          </span>
        </div>
      </div>

      {/* SECCIÓN DERECHA: Datos temporales y telemetría de éxito */}
      <div className="flex items-center gap-8">
        <div className="text-right hidden sm:block">
          {/* Normalización de fechas para el locale del usuario */}
          <p className="text-[10px] text-zinc-500 font-mono">
            {new Date(mission.date_utc).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        </div>

        {/* Indicador de Estado: Utilizo terminología de telemetría (STANDBY, SUCCESS, FAILED) */}
        <div className="w-24 text-right">
          <p
            className={`text-[10px] font-bold font-mono tracking-tighter ${statusColor}`}>
            {isUpcoming ? ">> STANDBY" : mission.success ? "SUCCESS" : "FAILED"}
          </p>
        </div>
      </div>
    </div>
  );
}
