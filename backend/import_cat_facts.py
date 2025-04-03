import requests
import json
import sqlite3

def getCatFacts():

    # Begin connection for the sqlite database
    conn = sqlite3.connect('cat_facts.db')
    cur = conn.cursor()

    # Create the cat_facts db
    cur.execute("""
        CREATE TABLE IF NOT EXISTS cat_facts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fact TEXT UNIQUE,
            created_at DATE DEFAULT (DATE('now'))
        )
    """)
    conn.commit()

    # Loop and add 5 cat facts to the database
    for i in range(5):
        # GET Request for a cat fact
        response = requests.get("https://catfact.ninja/fact")

        # extract the data from the response and load the JSON
        data = response.text
        jsonText = json.loads(data)

        # Parse the json to get a cat fact
        catFact = jsonText['fact']

        # Add cat fact to the database
        cur.execute("INSERT OR IGNORE INTO cat_facts (fact) VALUES (?)", (catFact,))
        if cur.lastrowid:
            print("Insert was successful")
        else:
            print("Insert was skipped")

    # Commit and close the db
    conn.commit()
    conn.close()

if __name__=="__main__":
    getCatFacts()