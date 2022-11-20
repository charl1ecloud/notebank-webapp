from pydantic import BaseSettings


class Settings(BaseSettings):
    database_host: str
    postgres_password: str
    postgres_db: str
    postgres_user: str
    secret_key: str
    secret_key_refresh: str
    algorithm: str
    access_token_expire_minutes: int
    refresh_token_expire_minutes: int
    connect_str: str
    name: str
    key: str
    thumbnails: str
    poppler: str

    class Config:
        env_file = ".env"


settings = Settings()
