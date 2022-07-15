from fastapi import APIRouter, Depends
from ..upload import *
from .. import oauth2

router = APIRouter(
    prefix="/files",
    tags=['Files']
)

@router.get("/")
async def allfiles():
    return showFiles()

    
@router.post("/")
async def create_upload_file(file: UploadFile = File(...), current_user: int = Depends(oauth2.get_current_user)):
    name = file.filename
    type = file.content_type
    return await uploadtoazure(file,name,type)

@router.get("/download")
async def downloadfile(name: str):
    return download(name)