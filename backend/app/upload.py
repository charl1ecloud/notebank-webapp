from azure.storage.blob.aio import BlobServiceClient
from azure.storage.blob import ContentSettings, BlobClient, generate_blob_sas, BlobSasPermissions
from azure.storage.blob import BlobServiceClient as blobClient

from fastapi import UploadFile, File
from datetime import datetime, timedelta
from dotenv import dotenv_values

config = dotenv_values(".env")
STR = config.get("CONNECT_STR")
NAME = config.get("NAME")
KEY = config.get("KEY")

connect_str = STR
container_name = NAME
blob_service_client = blobClient.from_connection_string(connect_str)
container_client = blob_service_client.get_container_client(container_name)

async def uploadtoazure(file: UploadFile ,file_name: str,file_type:str):

    my_content_settings = ContentSettings(content_type=file_type)
    
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
   
    async with blob_service_client:
            container_client = blob_service_client.get_container_client(container_name)
            try:
                blob_client = container_client.get_blob_client(file_name)
                f = await file.read()
                await blob_client.upload_blob(f,content_settings=my_content_settings)
            except Exception as e:
                print(e)
                return "Something went terribly wrong.."
    
    return file_name

def showFiles():
  
    returnList = []
    for blob in container_client.list_blobs():
           returnList.append(blob.name)
           
        
    return returnList

def download(n):
    
    key = KEY

    
    sas_blob = generate_blob_sas(account_name="notewebapp", 
                                container_name=container_name,
                                blob_name=n,
                                account_key=key,
                                permission=BlobSasPermissions(read=True),
                                expiry=datetime.utcnow() + timedelta(hours=1))
    url = 'https://'+"notewebapp"+'.blob.core.windows.net/'+container_name+'/'+n+'?'+sas_blob
    return url

    


    

   
