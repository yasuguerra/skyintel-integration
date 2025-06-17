from datetime import date
from fastapi import APIRouter, Query
from typing import List

from ..services.ga_service import get_overview
from ..models import GAOverview

router = APIRouter(prefix="/ga", tags=["Google Analytics"])

@router.get(
    "/overview",
    response_model=List[GAOverview],
    summary="Métricas diarias de GA4 (sessions, users, conversions)"
)
def ga_overview(
    start_date: date = Query(..., description="YYYY-MM-DD"),
    end_date:   date = Query(..., description="YYYY-MM-DD")
):
    return get_overview(start_date, end_date)
