from passlib.context import CryptContext
import boto3
from .config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def s3_instance():
    s3 = boto3.resource(service_name='s3', region_name=settings.aws_default_region,aws_access_key_id=settings.aws_access_key_id,aws_secret_access_key=settings.aws_secret_access_key)
    return s3

def hash(password: str):
    return pwd_context.hash(password)


def verify(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
