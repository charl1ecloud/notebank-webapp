from passlib.context import CryptContext
import boto3

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def s3_instance():
    s3 = boto3.resource(service_name='s3', region_name='ap-southeast-2',aws_access_key_id="AKIA2METU3H7I6CE5SMF",aws_secret_access_key="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")
    return s3

def hash(password: str):
    return pwd_context.hash(password)


def verify(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
