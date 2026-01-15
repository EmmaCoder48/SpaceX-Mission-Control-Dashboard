# 🚀 SpaceX Launches

Un panel de control de telemetría en tiempo real desarrollado con **Next.js 15** y **Tailwind CSS**, diseñado para monitorear los próximos lanzamientos de SpaceX y auditar el historial de misiones utilizando la API oficial de SpaceX (Rockets, Launches, and Landpads).

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Fuentes:** [Geist Mono](https://vercel.com/font) (Estética técnica/militar)
- **API:** [SpaceX-API v5](https://github.com/r-spacex/SpaceX-API)
- **Despliegue:** [Vercel](https://vercel.com/)

## ✨ Características Principales

### 1. Hero Telemetry (Above the Fold)

- **Live Countdown:** Motor de cronometraje de precisión que calcula el tiempo restante hasta el próximo lanzamiento programado.
- **Sticky Parallax Effect:** Interfaz inmersiva con capas de profundidad que mantienen la información crítica siempre visible.
- **Dynamic Data:** Recuperación automatizada del próximo lanzamiento mediante filtrado de timestamps en tiempo real.

### 2. Mission Log History

- **Filtros Reactivos:** Auditoría de misiones basada en el estado de éxito o fallo.
- **Arquitectura de Componentes:** Uso de `MissionCard` con estados visuales dinámicos (STANDBY, SUCCESS, FAILED).
- **Optimización de Carga:** Implementación de `Promise.all` para reducir el tiempo de respuesta en peticiones concurrentes.

### 3. Diseño "Mission-Critical" (UI/UX)

- **Responsive Engine:** Diseño adaptativo que soporta desde monitores ultra-wide hasta dispositivos móviles, evitando desbordamientos de texto mediante lógica de `break-words` y escalas dinámicas.
- **Estética Dark Mode:** Paleta de colores basada en el centro de control de SpaceX, utilizando negros puros (`#000000`) y acentos en naranja aeroespacial.
