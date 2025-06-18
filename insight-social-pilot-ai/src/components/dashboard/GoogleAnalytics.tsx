import React from "react"
import Plot from "react-plotly.js"
import { useGaOverview } from "@/hooks/useGa"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
  startDate: string
  endDate: string
}

const colors = {
  sessions: "#3b82f6",
  users: "#10b981",
  conversions: "#f97316",
}

export default function GoogleAnalytics({ startDate, endDate }: Props) {
  const { data, isLoading, error } = useGaOverview({
    start_date: startDate,
    end_date: endDate,
  })

  if (isLoading) {
    return <Skeleton className="w-full h-[350px]" />
  }

  if (error) {
    return <p className="p-4 text-red-600">Error al cargar datos</p>
  }

  if (!data) return null

  const sorted = [...data].sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
  const customData = sorted.map(d => [d.sessions, d.users, d.conversions])
  const hoverTemplate =
    "%{x}<br>Sesiones: %{customdata[0]}<br>Usuarios: %{customdata[1]}<br>Conversiones: %{customdata[2]}<extra></extra>"

  return (
    <Plot
      data={[
        {
          x: sorted.map(d => d.date),
          y: sorted.map(d => d.sessions),
          type: "scatter",
          mode: "lines+markers",
          name: "Sesiones",
          line: { color: colors.sessions },
          customdata: customData,
          hovertemplate: hoverTemplate,
        },
        {
          x: sorted.map(d => d.date),
          y: sorted.map(d => d.users),
          type: "scatter",
          mode: "lines+markers",
          name: "Usuarios",
          line: { color: colors.users },
          customdata: customData,
          hovertemplate: hoverTemplate,
        },
        {
          x: sorted.map(d => d.date),
          y: sorted.map(d => d.conversions),
          type: "scatter",
          mode: "lines+markers",
          name: "Conversiones",
          line: { color: colors.conversions },
          customdata: customData,
          hovertemplate: hoverTemplate,
        },
      ]}
      layout={{
        autosize: true,
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        margin: { t: 40, l: 40, r: 20, b: 40 },
        hovermode: "x unified",
      }}
      className="w-full h-[400px]"
      config={{ displayModeBar: false }}
    />
  )
}

