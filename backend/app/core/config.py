import os
from functools import lru_cache
from pydantic import BaseModel
from urllib.parse import quote_plus


class Settings(BaseModel):
    app_name: str = os.getenv("APP_NAME", "artisan-connect-api")
    app_env: str = os.getenv("APP_ENV", "development")

    cors_origins: list[str] = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",") if o.strip()]

    db_host: str = os.getenv("DB_HOST", "localhost")
    db_port: int = int(os.getenv("DB_PORT", "3306"))
    db_user: str = os.getenv("DB_USER", "root")
    db_password: str = os.getenv("DB_PASSWORD", "")
    db_name: str = os.getenv("DB_NAME", "artisan_connect")

    jwt_secret: str = os.getenv("JWT_SECRET", "change_me")
    jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    jwt_expires_minutes: int = int(os.getenv("JWT_EXPIRES_MINUTES", "60"))

    @property
    def sqlalchemy_database_uri(self) -> str:
        user = quote_plus(self.db_user)
        pwd = quote_plus(self.db_password)
        dbn = quote_plus(self.db_name)
        return (
            f"mysql+pymysql://{user}:{pwd}"
            f"@{self.db_host}:{self.db_port}/{dbn}?charset=utf8mb4"
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
