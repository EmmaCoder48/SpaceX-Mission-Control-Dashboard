/**
 * Consumo la API de SpaceX para recuperar datos de lanzamientos.
 * * @param {string} type - Endpoint específico (past, upcoming, latest, next o ID vacío).
 * @returns {Promise<Array|Object>} Datos de lanzamientos o un array vacío en caso de falla.
 */
export const getLaunches = async (type) => {
  try {
    // Implemento una petición dinámica para reutilizar este servicio en diferentes vistas.
    const res = await fetch(`https://api.spacexdata.com/v5/launches/${type}`);

    // Valido el estado de la respuesta para interceptar errores de red o parámetros inválidos.
    if (!res.ok) {
      console.error(
        `Error de red en la petición: ${res.status} - ${res.statusText}`
      );
      return []; // Retorno un array vacío para evitar que los métodos de array (.map, .filter) fallen en el frontend.
    }

    // Parseo y retorno el cuerpo de la respuesta en formato JSON.
    const data = await res.json();
    return data;
  } catch (error) {
    // Capturo excepciones de bajo nivel (como falta de conexión) para mantener la estabilidad del sitio.
    console.error("Falla crítica en el servicio de lanzamientos:", error);
    return [];
  }
};
