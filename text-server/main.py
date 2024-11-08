from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random
from nltk.corpus import wordnet
import nltk

# Download required NLTK data
nltk.download('wordnet')
nltk.download('omw-1.4')

app = FastAPI()

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextRequest(BaseModel):
    text: str


def synonym_replacement(sentence, n):
    words = sentence.split()
    for _ in range(n):
        word_to_replace = random.choice(words)
        synonyms = wordnet.synsets(word_to_replace)
        if synonyms:
            synonym = synonyms[0].lemmas()[0].name()
            words = [synonym if word == word_to_replace else word for word in words]
    return ' '.join(words)

@app.post("/small-case")
async def convert_to_small_case(request: TextRequest):
    return {"result": request.text.lower()}

@app.post("/synonyms")
async def get_synonyms(request: TextRequest):
    result = synonym_replacement(request.text, 5)
    return {"result": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8085)
