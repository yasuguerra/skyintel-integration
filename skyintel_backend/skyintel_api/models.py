from pydantic import BaseModel, Field

class GAOverview(BaseModel):
    date: str = Field(..., description="YYYY-MM-DD")
    sessions: int
    users: int
    conversions: int

