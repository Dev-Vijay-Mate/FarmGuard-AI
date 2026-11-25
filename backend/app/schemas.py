from datetime import datetime
from pydantic import BaseModel, Field

class FarmerCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=10, max_length=20)
    village: str = Field(min_length=2, max_length=120)
    district: str = Field(min_length=2, max_length=120)
class FarmerRead(FarmerCreate):
    id: int
    created_at: datetime
    model_config = {"from_attributes": True}
class ReportCreate(BaseModel):
    farmer_id: int
    concern_type: str = Field(pattern="^(plant|livestock)$")
    symptoms: str = Field(min_length=3, max_length=300)
    description: str = Field(min_length=3)
    image_url: str | None = None
    latitude: str | None = None
    longitude: str | None = None
class ReportRead(ReportCreate):
    id: int
    status: str
    created_at: datetime
    model_config = {"from_attributes": True}
class ScreeningRead(BaseModel):
    label: str
    confidence: float
    needs_expert_review: bool
    model: str
    disclaimer: str
    guidance: list[str]
