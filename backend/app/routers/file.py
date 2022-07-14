from fastapi import APIRouter
from ..upload import *

router = APIRouter(
    prefix="/files",
    tags=['Files']
)

@router.get("/")
async def allfiles():
    return showFiles()

    
@router.post("/")
async def create_upload_file(file: UploadFile = File(...)):
    name = file.filename
    type = file.content_type
    
    return await uploadtoazure(file,name,type)

@router.get("/download")
async def downloadfile(name: str):
    return download(name,"notes")