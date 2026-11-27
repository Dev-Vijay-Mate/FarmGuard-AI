from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from .models import Farmer, Report
from .schemas import FarmerCreate, FarmerRead, ReportCreate, ReportRead, ScreeningRead
from .ml.inference import screen_tomato_leaf
from .ml.preprocessing import preprocess_image
from .ml.guidance import screening_guidance

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
@app.post("/reports/{report_id}/assessment", response_model=ReportRead)
def attach_assessment(report_id: int, payload: ScreeningRead, db: Session = Depends(get_db)):
    report = db.get(Report, report_id)
    if not report: raise HTTPException(404, "Report not found")
    report.assessment_label = payload.label; report.assessment_confidence = str(payload.confidence)
    report.assessment_guidance = "\n".join(payload.guidance); report.status = "assessment_ready"
    db.commit(); db.refresh(report); return report
@app.get("/farmers/{farmer_id}/reports", response_model=list[ReportRead])
def list_reports(farmer_id: int, db: Session = Depends(get_db)):
    return list(db.scalars(select(Report).where(Report.farmer_id == farmer_id).order_by(Report.created_at.desc())))
@app.get("/reports/{report_id}", response_model=ReportRead)
def get_report(report_id: int, db: Session = Depends(get_db)):
    report = db.get(Report, report_id)
    if not report: raise HTTPException(404, "Report not found")
    return report
@app.post("/ai/screenings/tomato-leaf", response_model=ScreeningRead)
async def screen_tomato_leaf_image(image: UploadFile = File(...)):
    if image.content_type not in {"image/jpeg", "image/png", "image/webp"}: raise HTTPException(415, "Upload a JPEG, PNG, or WebP image")
    content = await image.read()
    if len(content) > 8 * 1024 * 1024: raise HTTPException(413, "Image must be smaller than 8 MB")
    try: pixels, _ = preprocess_image(content)
    except Exception as error: raise HTTPException(422, "The uploaded file is not a valid image") from error
    return screen_tomato_leaf(pixels)
