# Artisan Connect Backend (FastAPI + MySQL)

This is the Python FastAPI backend for the Artisan Connect project. It uses SQLAlchemy for ORM and PyMySQL for the MySQL driver.

## Structure

```
backend/
  app/
    core/config.py          # Settings from environment
    db.py                   # SQLAlchemy engine/session and init
    models.py               # SQLAlchemy models
    schemas.py              # Pydantic schemas
    main.py                 # FastAPI app entry point
    routers/
      __init__.py
      health.py             # GET /health
      products.py           # /products endpoints
      auth.py               # /auth/login (placeholder)
  requirements.txt          # Python dependencies
  .env.example              # Environment variables template
```

## Prerequisites
- Python 3.11+
- MySQL 8.x (or compatible)

## Setup
1. Create a virtual environment and install dependencies:

```bash
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Copy the environment template and fill in your values:

```bash
copy .env.example .env  # Windows
```

Set the database values in `backend/.env`:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=<your_user>
DB_PASSWORD=<your_password>
DB_NAME=artisan_connect
CORS_ORIGINS=http://localhost:3000
```

3. Run the server:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at http://localhost:8000.

- Health: GET http://localhost:8000/health
- Products: GET http://localhost:8000/products

Tables will be auto-created at startup based on models in `app/models.py`.

## Notes
- The `/auth/login` route is a placeholder that expects a user with a bcrypt-hashed password in the database. We will replace this with JWT-based auth next.
- Update `CORS_ORIGINS` if your React app runs on another origin.
