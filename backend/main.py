import uvicorn
import sqlite3
import json
from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {"message": "FastAPI Backend"}

@app.get('/catfacts')
def getCatFacts():
    # Begin connection for the sqlite database
    conn = sqlite3.connect('cat_facts.db')
    cur = conn.cursor()
    # Get all columns from the database
    cur.execute('SELECT * FROM cat_facts')
    # Zip it and prep for JSON format
    columns = [column[0] for column in cur.description]
    facts = [dict(zip(columns, row)) for row in cur.fetchall()]


    conn.commit()
    conn.close()
    return {"facts": facts}

@app.get('/catfacts/random')
def randomCatFact():
    # Begin connection for the sqlite database
    conn = sqlite3.connect('cat_facts.db')
    cur = conn.cursor()
    # Select a random fact
    cur.execute('SELECT fact FROM cat_facts ORDER BY RANDOM() LIMIT 1')
    fact = cur.fetchone()

    if fact is None:
        raise HTTPException(status_code=400, detail="No random fact found")

    conn.commit()
    conn.close()

    return{"fact":fact[0]}

@app.post('/catfacts')
def addCatFact(fact: str = Form(...)):
    # Check if cat fact is valid, raise exception if not
    if not fact:
        raise HTTPException(status_code=400, detail="Fact is invalid")

    # Begin connection for the sqlite database
    conn = sqlite3.connect('cat_facts.db')
    cur = conn.cursor()
    # Try to insert into database, handle error if duplicate or invalid input
    try:
        cur.execute("INSERT INTO cat_facts (fact) VALUES (?)", (fact,))
        conn.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="This is a duplicate cat fact!")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

if __name__ == "__main__":
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)