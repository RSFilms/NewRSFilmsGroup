# app.py (Python) - FastAPI backend for contact and music upload
from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uuid, os

app = FastAPI(title="Neha Backend")

# Allow CORS from local frontend (change in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5500", "http://localhost:3000", "http://localhost:8000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple contact schema
class ContactIn(BaseModel):
    name: str
    email: str
    phone: str | None = None
    message: str

@app.post("/contact")
async def contact_send(payload: ContactIn):
    # In production: save to DB and send email/notification
    print("Contact received:", payload.dict())
    return {"status": "ok", "message": "Contact received"}

@app.post("/music/submit")
async def music_submit(
    artist_name: str = Form(...),
    email: str = Form(...),
    title: str = Form(...),
    file: UploadFile = File(...)
):
    # Simple local save - in production use S3 or secure storage
    uploads_dir = "uploads"
    os.makedirs(uploads_dir, exist_ok=True)
    unique_name = f"{uuid.uuid4().hex}_{file.filename}"
    file_path = os.path.join(uploads_dir, unique_name)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    print(f"Saved music file: {file_path} (artist: {artist_name}, email: {email}, title: {title})")
    return {"status": "ok", "file": unique_name, "message": "Uploaded"}

@app.get("/health")
def health():
    return {"status": "ok"}
