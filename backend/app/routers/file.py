# from fastapi import APIRouter, Depends
# from ..fileutils import *
# from .. import oauth2

# router = APIRouter(
#     prefix="/files",
#     tags=['Files']
# )

# @router.get("/")
# async def allfiles():
#     return showFiles()

    
# @router.post("/")
# async def create_upload_file(file: UploadFile = File(...), current_user: int = Depends(oauth2.get_current_user)):
#     name = file.filename
#     type = file.content_type
    
#     return await uploadtoazure(file,name,type)

# @router.get("/download/{name}")
# async def downloadfile(name: str):
#     return download(name,"notes")

# @router.delete("/delete/{name}")
# async def deletefile(name:str):
#     return await del_blob(name)