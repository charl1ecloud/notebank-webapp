from pydantic import BaseSettings


class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    database_password: str
    database_name: str
    database_username: str
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
