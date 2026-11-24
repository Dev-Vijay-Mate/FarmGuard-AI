from fastapi.testclient import TestClient
from app.main import app

def test_health_and_farmer_report_workflow():
    with TestClient(app) as client:
        assert client.get("/health").json() == {"status": "ok"}
        farmer = client.post("/farmers", json={"name":"Vijay Mate","phone":"9876543210","village":"Pune","district":"Pune"})
        assert farmer.status_code == 201
        farmer_id = farmer.json()["id"]
        report = client.post("/reports", json={"farmer_id":farmer_id,"concern_type":"plant","symptoms":"Brown leaf spots","description":"Spots appeared after rainfall"})
        assert report.status_code == 201
        assert report.json()["status"] == "submitted"
        reports = client.get(f"/farmers/{farmer_id}/reports")
        assert reports.status_code == 200
        assert len(reports.json()) == 1

def test_report_needs_existing_farmer():
    with TestClient(app) as client:
        response = client.post("/reports", json={"farmer_id":999,"concern_type":"livestock","symptoms":"Low energy","description":"Animal has not eaten today"})
        assert response.status_code == 404
