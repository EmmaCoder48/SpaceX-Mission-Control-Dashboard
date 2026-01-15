"use client";

import { useState, useEffect } from "react";

/**
 * Componente: Countdown
 * Rol: Motor de cronometraje de precisión para la cuenta regresiva del lanzamiento.
 * * Este componente calcula la delta de tiempo entre el momento actual y el T-Zero,
 * actualizando la interfaz de telemetría cada segundo.
 */
export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!targetDate) return;

    /**
     * Algoritmo de Cronometraje:
     * Utilizo un interval de 1000ms para recalcular los componentes de tiempo.
     * El uso de operaciones de módulo (%) permite extraer días, horas, minutos y segundos
     * a partir de una única estampa de tiempo (timestamp) en milisegundos.
     */
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      // Si la distancia es negativa, el evento ya ha comenzado (Liftoff).
      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    /**
     * Garbage Collection:
     * Es vital retornar la limpieza del intervalo para evitar procesos colgados
     * en el cliente cuando el componente se desmonte.
     */
    return () => clearInterval(interval);
  }, [targetDate]);

  /**
   * Sub-componente: TimeUnit
   * Renderiza un bloque de tiempo individual con diseño modular.
   * * Implementa 'min-w' y 'w-auto' para soportar dinámicamente cifras de 3 dígitos
   * sin romper la retícula del diseño (Grid Layout).
   */
  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center mx-1">
      <div className="bg-black border border-white/20 min-w-[60px] md:min-w-[70px] w-auto h-20 flex items-center justify-center rounded-md relative shadow-2xl px-3">
        {/* Detalle visual: Línea de corte para simular un display mecánico de aviación */}
        <div className="absolute w-full h-[1px] bg-white/10 top-1/2 left-0"></div>

        <span className="text-3xl md:text-4xl font-light font-mono text-white/90 tracking-tighter z-10">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      {/* Label descriptivo para mejorar la accesibilidad y comprensión de la telemetría */}
      <span className="text-[7px] text-zinc-600 mt-2 uppercase tracking-widest font-mono">
        {label}
      </span>
    </div>
  );

  // Validación de expiración para estados de "Misión en curso"
  const isExpired = new Date(targetDate).getTime() - new Date().getTime() < 0;

  if (isExpired) {
    return (
      <div className="py-10 flex flex-col items-center">
        <div className="text-orange-500 font-mono text-xl animate-pulse tracking-widest">
          [ MISSION_IN_PROGRESS ]
        </div>
        <span className="text-[10px] mt-4 text-zinc-500 uppercase tracking-[0.4em] font-mono">
          Waiting for Orbital Insertion
        </span>
      </div>
    );
  }

  return (
    <div className="py-10 flex flex-col items-center">
      {/* Contenedor Flex: Agrupa las unidades de tiempo con un espaciado consistente */}
      <div className="flex gap-2">
        <TimeUnit value={timeLeft.d} label="days" />
        <TimeUnit value={timeLeft.h} label="hours" />
        <TimeUnit value={timeLeft.m} label="mins" />
        <TimeUnit value={timeLeft.s} label="secs" />
      </div>

      {/* Nota técnica: Referencia al momento del encendido de motores */}
      <span className="text-[10px] mt-6 text-zinc-500 uppercase tracking-[0.4em] font-mono">
        T-Minus to Ignition
      </span>
    </div>
  );
}
