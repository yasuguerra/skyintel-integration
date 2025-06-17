import React from "react";
import { useGaOverview } from "@/hooks/useGa";

const GoogleAnalytics = () => {
  // 3. Usa el hook dentro del componente
  const { data, isLoading, error } = useGaOverview({
    start_date: "2025-01-01",
    end_date:   "2025-05-30",
  });

console.log("GA hook →", { data, isLoading, error });


  // 5. Renderiza algo sencillo para probar
  if (isLoading) return <p className="p-4">Cargando datos reales…</p>;
  if (error)     return <p className="p-4 text-red-600">Error al cargar datos</p>;
  if (!data)     return null;

  /* Por ahora, imprime las primeras 5 filas como JSON para verificar */
  return (
    <pre className="text-sm p-4 bg-gray-100 rounded">
      {JSON.stringify(data.slice(0, 5), null, 2)}
    </pre>
  );
};

export default GoogleAnalytics;

