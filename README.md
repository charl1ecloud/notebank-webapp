# Installation

Install dependencies for React frontend.

```bash
  cd frontend
  npm install
```

Create an **.env** file in the backend folder and include the following:

```bash
DATABASE_HOST=postgres
POSTGRES_PASSWORD=<YOUR PASSWORD>
POSTGRES_DB=notebank
POSTGRES_USER=<YOUR USERNAME>
SECRET_KEY=thissecretkeyissostrong
SECRET_KEY_REFRESH=thissecretkeyissoweak
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1
REFRESH_TOKEN_EXPIRE_MINUTES=60
CONNECT_STR = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=notewebapp;AccountKey=Aonb9v5frCwz9LME/7MzdTdOWjwNZ+8tWl2QE90zkYkddxY7N7dFyacGWhphMVRJh7KpXziwOsQK+ASt/7dbUg==;BlobEndpoint=https://notewebapp.blob.core.windows.net/;FileEndpoint=https://notewebapp.file.core.windows.net/;QueueEndpoint=https://notewebapp.queue.core.windows.net/;TableEndpoint=https://notewebapp.table.core.windows.net/"
NAME = "notes"
KEY = "Aonb9v5frCwz9LME/7MzdTdOWjwNZ+8tWl2QE90zkYkddxY7N7dFyacGWhphMVRJh7KpXziwOsQK+ASt/7dbUg=="
THUMBNAILS = "notesthumbnails"
POPPLER = C:/Program Files/poppler-22.04.0/bin
```

Remember to change the username and password field in the .env file to match with your own database.

Start backend and database.

```bash
  cd backend
  docker build -t notebank .
  docker-compose up
  docker-compose run api alembic revision --autogenerate -m "first revision"
  docker-compose run api alembic upgrade head
```

note:

```
python-jose
psycopg2
New bugs: some packages are installed already but cmd still showing module not found. Run pip install -r requirements.txt will not install some packages for some reason.
```

need to manually download (sometimes)

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

## Usage/Examples

Start webpage

```bash
cd frontend
npm start
```
