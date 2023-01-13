from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import comment, note, user, auth

app = FastAPI()

origins = ["http://localhost:8000", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(note.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(comment.router)


@app.get("/")
def root():
    return {"message": "notebank api"}
