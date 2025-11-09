#!/bin/bash
# ==========================================
# Setup Folder Structure for NiHao-Buddy App
# ==========================================

echo "📁 NiHao-Buddy folder structure..."

# Frontend folders & files
mkdir -p frontend/assets
cat > frontend/index.html <<'EOF'
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>HuaLearn – Chinese Master</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>HuaLearn – Chinese Master</h1>
  <div id="flashcard">
    <p id="char">字</p>
    <p id="pinyin">pīn yīn</p>
    <p id="meaning">Meaning</p>
  </div>
  <button id="next">Next</button>
  <script src="app.js"></script>
</body>
</html>
EOF

cat > frontend/style.css <<'EOF'
body {
  font-family: "Noto Sans SC", sans-serif;
  text-align: center;
  margin-top: 40px;
  background-color: #fdfcfb;
}
#flashcard {
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 20px auto;
  width: 250px;
  background-color: #fff9f2;
}
button {
  padding: 8px 16px;
  font-size: 16px;
  margin-top: 10px;
}
EOF

cat > frontend/app.js <<'EOF'
async function loadWords(grade = 1) {
  const res = await fetch("http://localhost:5000/api/words?grade=" + grade);
  return await res.json();
}
async function showRandomWord() {
  const words = await loadWords(1);
  const w = words[Math.floor(Math.random() * words.length)];
  document.getElementById("char").textContent = w.char;
  document.getElementById("pinyin").textContent = w.pinyin;
  document.getElementById("meaning").textContent = w.meaning;
  const msg = new SpeechSynthesisUtterance(w.char);
  msg.lang = "zh-CN";
  window.speechSynthesis.speak(msg);
}
document.getElementById("next").addEventListener("click", showRandomWord);
showRandomWord();
EOF

# Backend folders & files
mkdir -p backend/routes backend/models data tests

cat > backend/app.py <<'EOF'
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3, os

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), "../data/huaword.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

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
    db.execute("INSERT INTO words (char, pinyin, meaning, grade) VALUES (?, ?, ?, ?)",
               (data["char"], data["pinyin"], data["meaning"], data["grade"]))
    db.commit()
    return jsonify({"message": "Word added!"})

if __name__ == "__main__":
    app.run(debug=True)
EOF

cat > backend/models/schema.sql <<'EOF'
CREATE TABLE IF NOT EXISTS words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  char TEXT NOT NULL,
  pinyin TEXT,
  meaning TEXT,
  grade TEXT
);
EOF

# Sample CSV for testing
cat > data/grade1.csv <<'EOF'
char,pinyin,meaning,grade
我,wǒ,I/me,1
你,nǐ,you,1
他,tā,he,1
EOF

# Sample test file
cat > tests/test_api.py <<'EOF'
import requests
r = requests.get("http://localhost:5000/api/words?grade=1")
print(r.json())
EOF

# Requirements
cat > requirements.txt <<'EOF'
flask
flask-cors
EOF

echo "✅ Folder structure created successfully!"
echo "Next steps:"
echo "1. python3 -m venv venv && source venv/bin/activate"
echo "2. pip install -r requirements.txt"
echo "3. python backend/app.py"
echo "4. Open frontend/index.html in browser"
