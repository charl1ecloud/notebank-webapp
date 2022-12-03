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
    aws_access_key_id: str
    aws_secret_access_key: str
    aws_default_region: str

    class Config:
        env_file = ".env"


settings = Settings()
