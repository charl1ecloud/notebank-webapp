FROM python:3.9

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN pip install -r requirements.txt

COPY migrate.sh /app/migrate.sh
RUN chmod +x /app/migrate.sh

CMD ["/app/migrate.sh"]