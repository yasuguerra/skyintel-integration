import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()                                         # ← carga .env

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:8080,http://localhost:5173"
).split(",")

app = FastAPI(title="SkyIntel API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DEBUG (puedes quitar)
print("DEBUG CORS ->", ALLOWED_ORIGINS)

from .routers import ga
app.include_router(ga.router, tags=["Google Analytics"])
