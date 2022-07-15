Tutorial https://www.youtube.com/watch?v=0sOvCWFmrtA&t=64639s&ab_channel=freeCodeCamp.org

# Installation

Install dependencies for React frontend.

```bash
  cd frontend
  npm install
```

Install dependencies for Python FastAPI backend.

```bash
  cd backend
  pip install -r requirements.txt
```

note:

```
python-jose
psycopg2
```

need to manually download (sometimes)

Create an **.env** file in the backend folder and include the following:

```bash
DATABASE_HOSTNAME=localhost
DATABASE_PORT=5432
DATABASE_PASSWORD=<your password>
DATABASE_NAME=fastapi
DATABASE_USERNAME=postgres
SECRET_KEY=thissecretkeyissostrong
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
EMAIL = "jackma2333@gmail.com"
PASSWORD = "vunsldjtckdkpxrb"
CONNECT_STR = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=notewebapp;AccountKey=Aonb9v5frCwz9LME/7MzdTdOWjwNZ+8tWl2QE90zkYkddxY7N7dFyacGWhphMVRJh7KpXziwOsQK+ASt/7dbUg==;BlobEndpoint=https://notewebapp.blob.core.windows.net/;FileEndpoint=https://notewebapp.file.core.windows.net/;QueueEndpoint=https://notewebapp.queue.core.windows.net/;TableEndpoint=https://notewebapp.table.core.windows.net/"
NAME = "notes"
KEY = "Aonb9v5frCwz9LME/7MzdTdOWjwNZ+8tWl2QE90zkYkddxY7N7dFyacGWhphMVRJh7KpXziwOsQK+ASt/7dbUg=="
```

Remember to change the database_password field in the .env file to match with your own database's password.

## pdf2image for thumbnail

Library ReadMe: https://github.com/Belval/pdf2image#readme

1. `pip install pdf2image`
2. Install poppler: https://github.com/oschwartz10612/poppler-windows/releases/
3. After download, add the bin/ folder to PATH. Tutorial:(https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/)
4. download imageMagick https://docs.wand-py.org/en/latest/guide/install.html#install-imagemagick-on-windows

Or:

1. Download conda: https://www.anaconda.com/products/distribution
2. Go to Anaconda Prompt
3. `conda install -c conda-forge poppler`
   (亲测有效)

## Set up postgres on your machine

**will update the set up method to use docker in next commit**

Download postgres from https://www.postgresql.org/download/

Use **port 5432** during the Installation process

Open the app pgAdmin4

follow tutorial to 6:38  
https://www.youtube.com/watch?v=iJiJnCzo71E&list=PL8VzFQ8k4U1L5QpSapVEzoSfob-4CR8zM&index=28

## Usage/Examples

Start fastAPI server

```bash
cd backend
python -m alembic upgrade head //to create table
uvicorn app.main:app --reload
or
python -m uvicorn app.main:app --reload

```

Start webpage

```bash
cd frontend
npm start
```
