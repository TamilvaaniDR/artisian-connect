import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .routers import health, products, auth
from .db import init_db

load_dotenv()

app_name = os.getenv("APP_NAME", "artisan-connect-api")
app = FastAPI(title=app_name)

# CORS
origins = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup hook: ensure tables exist
@app.on_event("startup")
def on_startup():
    init_db()

# Routers
app.include_router(health.router)
app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])


@app.get("/")
def read_root():
    return {"name": app_name, "status": "ok"}
