from datetime import date
from typing import List

from utils import query_ga
from ..models import GAOverview


def get_overview(start: date, end: date) -> List[GAOverview]:
    """
    Devuelve métricas diarias (sessions, users, conversions) entre
    `start` y `end` inclusive, usando GA4.
    """
    df = query_ga(
        metrics=["sessions", "activeUsers", "conversions"],
        dimensions=["date"],
        start_date=str(start),
        end_date=str(end),
    )

    if df.empty:
        return []

    # Renombra columnas para que coincidan con el modelo
    df.rename(columns={"activeUsers": "users"}, inplace=True)

    # ⚠️ CONVERSIÓN CRÍTICA: Timestamp → 'YYYY-MM-DD'
    df["date"] = df["date"].dt.strftime("%Y-%m-%d")

    # Crea la lista de modelos Pydantic
    return [GAOverview(**row) for row in df.to_dict(orient="records")]
