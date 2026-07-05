from __future__ import annotations

import json
import re
from pathlib import Path

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = Path("/Users/tta-python/Desktop/小学华文中英文双语词表")
OUTPUT_PATH = ROOT / "data" / "bilingual_wordlist.jsonl"

PDF_GRADE_MAP = {
    "PDF copy 9.pdf": "1",
    "PDF copy 6.pdf": "2",
    "PDF copy 7.pdf": "2",
    "PDF copy 4.pdf": "3",
    "PDF copy 5.pdf": "3",
    "PDF 2.pdf": "4",
    "PDF.pdf": "4",
    "PDF 3.pdf": "5",
    "PDF copy.pdf": "5",
    "PDF copy 2.pdf": "6",
    "PDF copy 3.pdf": "6",
}


HAN_RE = re.compile(r"[\u4e00-\u9fff]")
BAD_CHARS = set("体哥以七巴四只鸭士子十吗车和可")


def compact(text: str) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


def chinese_token(text: str) -> str:
    lines = [line.strip().replace(" ", "") for line in (text or "").splitlines() if line.strip()]
    for line in lines:
        candidate = "".join(HAN_RE.findall(line))
        if candidate:
            return candidate
    return ""


def looks_garbled(word: str) -> bool:
    if not word:
        return True
    if len(word) > 8:
        return True
    bad_count = sum(1 for char in word if char in BAD_CHARS)
    return bad_count >= max(2, len(word) // 2 + 1)


def row_values(row: list[str | None]) -> list[str]:
    return [compact(cell) for cell in row]


def is_sequence(value: str) -> bool:
    return bool(re.fullmatch(r"\d+\.?", value))


def extract_from_row(row: list[str | None]) -> tuple[str, str] | None:
    values = row_values(row)
    for index, value in enumerate(values):
        if not is_sequence(value):
            continue
        following = [cell for cell in values[index + 1 :] if cell]
        if len(following) < 2:
            continue
        word = chinese_token(following[0])
        english = following[1]
        if word and english and re.search(r"[A-Za-z]", english) and not looks_garbled(word):
            return word, english
    return None


def extract_pdf(path: Path, grade: str) -> list[dict[str, str]]:
    entries: list[dict[str, str]] = []
    seen: set[tuple[str, str, str]] = set()

    with pdfplumber.open(path) as pdf:
        for page_number, page in enumerate(pdf.pages, start=1):
            for table in page.extract_tables() or []:
                for row in table:
                    extracted = extract_from_row(row)
                    if not extracted:
                        continue
                    word, english = extracted
                    key = (grade, word, english)
                    if key in seen:
                        continue
                    seen.add(key)
                    entries.append(
                        {
                            "grade": grade,
                            "word": word,
                            "english": english,
                            "source_pdf": path.name,
                            "page": page_number,
                        }
                    )
    return entries


def main() -> None:
    all_entries: list[dict[str, str]] = []

    for filename, grade in PDF_GRADE_MAP.items():
        path = SOURCE_DIR / filename
        if not path.exists():
            print(f"missing: {filename}")
            continue
        entries = extract_pdf(path, grade)
        all_entries.extend(entries)
        print(f"P{grade} {filename}: {len(entries)} entries")

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_PATH.open("w", encoding="utf-8") as f:
        for entry in all_entries:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")

    print(f"wrote {len(all_entries)} entries to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
