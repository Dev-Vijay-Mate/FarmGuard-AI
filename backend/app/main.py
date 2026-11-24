from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from .models import Farmer, Report
from .schemas import FarmerCreate, FarmerRead, ReportCreate, ReportRead

app = FastAPI(title="FarmGuard AI API", version="0.1.0")
@app.on_event("startup")
def startup(): Base.metadata.create_all(bind=engine)
@app.get("/health")
def health(): return {"status": "ok"}
@app.post("/farmers", response_model=FarmerRead, status_code=status.HTTP_201_CREATED)
def create_farmer(payload: FarmerCreate, db: Session = Depends(get_db)):
    if db.scalar(select(Farmer).where(Farmer.phone == payload.phone)): raise HTTPException(409, "A farmer with this mobile number already exists")
    farmer = Farmer(**payload.model_dump()); db.add(farmer); db.commit(); db.refresh(farmer); return farmer
@app.get("/farmers/{farmer_id}", response_model=FarmerRead)
def get_farmer(farmer_id: int, db: Session = Depends(get_db)):
    farmer = db.get(Farmer, farmer_id)
    if not farmer: raise HTTPException(404, "Farmer not found")
    return farmer
@app.post("/reports", response_model=ReportRead, status_code=status.HTTP_201_CREATED)
def create_report(payload: ReportCreate, db: Session = Depends(get_db)):
    if not db.get(Farmer, payload.farmer_id): raise HTTPException(404, "Farmer not found")
    report = Report(**payload.model_dump()); db.add(report); db.commit(); db.refresh(report); return report
@app.get("/farmers/{farmer_id}/reports", response_model=list[ReportRead])
def list_reports(farmer_id: int, db: Session = Depends(get_db)):
    return list(db.scalars(select(Report).where(Report.farmer_id == farmer_id).order_by(Report.created_at.desc())))
