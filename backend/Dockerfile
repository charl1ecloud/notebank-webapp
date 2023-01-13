FROM python:3.9

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN apt-get update && apt-get install --no-install-recommends -y mupdf

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

COPY migrate.sh /app/migrate.sh
RUN chmod +x /app/migrate.sh

CMD ["/app/migrate.sh"]