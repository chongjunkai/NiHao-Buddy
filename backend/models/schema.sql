CREATE TABLE IF NOT EXISTS words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  char TEXT NOT NULL,
  pinyin TEXT,
  meaning TEXT,
  grade TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_words_unique
ON words (char, pinyin, meaning, grade);
