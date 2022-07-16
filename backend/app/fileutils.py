from ast import Name
from fileinput import filename
from unicodedata import name
from azure.storage.blob.aio import BlobServiceClient
from azure.storage.blob import ContentSettings, BlobClient, generate_blob_sas, BlobSasPermissions
from azure.storage.blob import BlobServiceClient as blobClient
from sqlalchemy import true
from wand.image import Image
from fastapi import UploadFile, File
from datetime import datetime, timedelta
from .config import settings
from pdf2image import convert_from_bytes
import io
import cv2
import glob
from multiprocessing import Pool

CONNECT_STR = settings.connect_str
NAME = settings.name
KEY = settings.key
THUMBNAILS = settings.thumbnails

blob_service_client = blobClient.from_connection_string(CONNECT_STR)
container_client = blob_service_client.get_container_client(NAME)
thumbnail_container = blob_service_client.get_container_client(THUMBNAILS)

async def uploadtoazure(file: UploadFile ,file_name: str,file_type:str):

    my_content_settings = ContentSettings(content_type=file_type)
    
    blob_service_client = BlobServiceClient.from_connection_string(CONNECT_STR)
   
    async with blob_service_client:
            container_client = blob_service_client.get_container_client(NAME)
            
            try:
                blob_client = container_client.get_blob_client(file_name)
                
                f = await file.read()
               
                await blob_client.upload_blob(f,content_settings=my_content_settings)
                
            except Exception as e:
                print(e)
                return "Something went wrong... Refresh to try again"
            
            try:
                blob_client_thumbnail = thumbnail_container.get_blob_client(file_name+"thumbnail")
                thumbnail = convert_pdf_to_png(f)
                await blob_client_thumbnail.upload_blob(thumbnail,content_settings=ContentSettings(content_type="image/png"))
            except Exception as e:
                pass

    
    return file_name

def showFiles():
  
    returnList = {}
    for blob in container_client.list_blobs():
           returnList[blob.name]=""
    for blob in thumbnail_container.list_blobs():
        for key in returnList:
            if blob.name == key + "thumbnail":
                returnList[key]=download(blob.name,THUMBNAILS)
           
        
    return returnList

def download(n,container):
    
    key = KEY

    
    sas_blob = generate_blob_sas(account_name="notewebapp", 
                                container_name=container,
                                blob_name=n,
                                account_key=key,
                                permission=BlobSasPermissions(read=True),
                                expiry=datetime.utcnow() + timedelta(hours=1))
    url = 'https://'+"notewebapp"+'.blob.core.windows.net/'+container+'/'+n+'?'+sas_blob

  
    return url

def convert_pdf_to_png(file):
    
    page = convert_from_bytes(file, dpi=50, single_file=true, poppler_path=f'{settings.poppler}')[0]
    
    img_byte_arr = io.BytesIO()
    # page.thumbnail()
    page.save(img_byte_arr, format='PNG')
    
    img_byte_arr = img_byte_arr.getvalue()
    return img_byte_arr

async def del_blob(n):
    blob_service_client = BlobServiceClient.from_connection_string(CONNECT_STR)
   
    async with blob_service_client:
            container_client = blob_service_client.get_container_client(NAME)
            
            try:
                blob_client = container_client.get_blob_client(n)
                await blob_client.delete_blob()
                
            except Exception as e:
                print(e)
                return "Deletion went wrong... Refresh to try again"
            
            try:
                blob_client_thumbnail = thumbnail_container.get_blob_client(n+"thumbnail")
                await blob_client_thumbnail.delete_blob()
            except Exception as e:
                print(e)
                print("This is because of snapshot")
                pass

    return n + " has been deleted, refresh the page to see"

        
        
        
    


    

   
