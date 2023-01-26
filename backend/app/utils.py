from passlib.context import CryptContext
import boto3
from .config import settings
import fitz
import tempfile

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def s3_instance():
    s3 = boto3.resource(service_name='s3', region_name=settings.aws_default_region,aws_access_key_id=settings.aws_access_key_id,aws_secret_access_key=settings.aws_secret_access_key)
    return s3

def hash(password: str):
    return pwd_context.hash(password)


def verify(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def generate_preview(pdf_bytes, s3, filename):
    with tempfile.NamedTemporaryFile(delete=False) as temp:
        temp.write(pdf_bytes)
        temp.seek(0)
        s3.Bucket("notebank").upload_file(temp.name, filename)
        pdf = fitz.open(temp.name)
        if pdf.page_count == 0:
            raise ValueError("The pdf document is empty")
        page_count = pdf.page_count
        page = pdf[0]
        preview_path = f"{temp.name}.png"
        page.getPixmap().save(preview_path)
        pdf.close()
        temp.close()
        s3.Bucket("notebank").upload_file(preview_path, preview_path)
        return f"https://notebank.s3.amazonaws.com/{preview_path}", page_count
