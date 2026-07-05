CREATE TABLE IF NOT EXISTS words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  char TEXT NOT NULL,
  pinyin TEXT,
  meaning TEXT,
  grade TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_words_unique
ON words (char, pinyin, meaning, grade);

CREATE TABLE IF NOT EXISTS learning_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_type TEXT NOT NULL,
  content TEXT NOT NULL,
  pinyin TEXT,
  meaning TEXT,
  grade TEXT,
  theme TEXT,
  note TEXT,
  created_at TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_learning_sources_unique
ON learning_sources (content_type, content, grade, meaning);

CREATE TABLE IF NOT EXISTS word_helpers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  char TEXT NOT NULL,
  grade TEXT,
  meaning TEXT,
  phrase TEXT NOT NULL,
  sentence TEXT,
  note TEXT,
  created_at TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_word_helpers_unique
ON word_helpers (char, grade, meaning);
