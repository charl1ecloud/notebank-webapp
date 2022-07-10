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
