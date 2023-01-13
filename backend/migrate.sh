#!/bin/bash

# Run the database migration scripts
alembic revision --autogenerate -m "migration"
alembic upgrade head

# Run the app
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload