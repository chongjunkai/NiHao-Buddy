from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3, os, csv

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), "../data/huaword.db")
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), "models/schema.sql")
CSV_PATH = os.path.join(os.path.dirname(__file__), "../data/grade1.csv")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database and import data if empty."""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = get_db()
    cur = conn.cursor()
    
    # Create table if not exists
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        cur.executescript(f.read())

    # Check if empty
    cur.execute("SELECT COUNT(*) FROM words")
    count = cur.fetchone()[0]
    if count == 0:
        print("📥 Importing sample data from grade1.csv...")
        with open(CSV_PATH, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                cur.execute(
                    "INSERT INTO words (char, pinyin, meaning, grade) VALUES (?, ?, ?, ?)",
                    (row["char"], row["pinyin"], row["meaning"], row["grade"])
                )
        conn.commit()
        print("✅ Database initialized with sample data.")
    conn.close()

@app.route("/")
def home():
    return "<h1>HuaLearn API Running</h1><p>Try /api/words?grade=1</p>"

@app.route("/api/words", methods=["GET"])
def get_words():
    grade = request.args.get("grade", "1")
    db = get_db()
    words = db.execute("SELECT * FROM words WHERE grade=?", (grade,)).fetchall()
    return jsonify([dict(w) for w in words])

@app.route("/api/add_word", methods=["POST"])
def add_word():
    data = request.json
    db = get_db()
    db.execute(
        "INSERT INTO words (char, pinyin, meaning, grade) VALUES (?, ?, ?, ?)",
        (data["char"], data["pinyin"], data["meaning"], data["grade"])
    )
    db.commit()
    return jsonify({"message": "✅ Word added successfully!"})

if __name__ == "__main__":
    init_db()  # <--- runs automatically at startup
    app.run(debug=True)







