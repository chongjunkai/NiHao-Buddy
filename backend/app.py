from flask import Flask, request, jsonify, send_from_directory, Response
from flask_cors import CORS
from pypinyin import Style, lazy_pinyin
from functools import lru_cache
import jieba
import sqlite3, os, csv, io, json
from urllib.parse import quote
from urllib.request import Request, urlopen
from datetime import datetime
import re
import ssl

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
FRONTEND_DIR = os.path.join(ROOT_DIR, "frontend")
DATA_DIR = os.path.join(ROOT_DIR, "data")
DB_PATH = os.path.join(DATA_DIR, "huaword.db")
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), "models/schema.sql")
CUSTOM_IMPORT_PATH = os.path.join(DATA_DIR, "custom_imports.csv")
LEARNING_SOURCES_PATH = os.path.join(DATA_DIR, "learning_sources.jsonl")
WORD_HELPERS_PATH = os.path.join(DATA_DIR, "word_helpers.jsonl")
CURATED_PHRASE_BANK_PATH = os.path.join(DATA_DIR, "curated_phrase_bank.jsonl")
BILINGUAL_WORDLIST_PATH = os.path.join(DATA_DIR, "bilingual_wordlist.jsonl")

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path="")
CORS(app)

jieba.initialize()
HAN_RE = re.compile(r"^[\u4e00-\u9fff]+$")
PHRASE_BLOCKLIST = {
    "托马斯", "克里特", "安德鲁", "马克思", "苏格拉底", "亚里士多德",
    "托福", "克拉", "克隆", "卖国贼", "丑闻", "暴徒", "毒品"
}
PREFERRED_HELPERS = {
    "衣": ("衣服", "妹妹穿上干净的衣服，高高兴兴地去上学。"),
    "鱼": ("小鱼", "小鱼在清清的水里游来游去。"),
    "雨": ("雨水", "雨水落在花草上，让它们长得更茂盛。"),
    "一": ("一心一意", "做功课时，我们要一心一意，不要分心。"),
    "二": ("一清二楚", "老师把题目讲得一清二楚。"),
    "五": ("五颜六色", "花园里开满了五颜六色的花。"),
    "耳": ("耳朵", "上课时，我们要用耳朵认真听老师讲课。"),
    "牙": ("牙齿", "每天早晚刷牙，牙齿才会健康。"),
    "口": ("开口", "遇到问题时，要勇敢开口请教老师。"),
    "人": ("助人为乐", "他常常帮助同学，是个助人为乐的好孩子。"),
    "木": ("木屋", "山坡上有一间小小的木屋。"),
    "土": ("土地", "农夫在肥沃的土地上种菜。"),
    "马": ("马上", "听到铃声后，同学们马上回到教室。"),
    "八": ("八方", "大家从四面八方来到学校参加活动。"),
    "巴": ("嘴巴", "妹妹张开嘴巴，开心地笑了。"),
    "你": ("你好", "见到朋友时，我们可以说一声你好。"),
    "我": ("我们", "我们一起学习，一起进步。"),
    "他": ("他们", "他们在操场上快乐地玩游戏。"),
    "弟": ("弟弟", "弟弟认真地把玩具收拾好。"),
    "不": ("不怕", "遇到困难时，我不怕辛苦，坚持完成任务。"),
    "爸": ("爸爸", "爸爸每天陪我读华文故事书。"),
    "妈": ("妈妈", "妈妈温柔地鼓励我继续努力。"),
    "女": ("女孩", "那个女孩主动把座位让给老人。"),
    "儿": ("儿子", "儿子把亲手做的卡片送给妈妈。"),
    "力": ("努力", "只要努力练习，就会慢慢进步。"),
    "河": ("河水", "河水缓缓地流向远方。"),
    "禾": ("禾苗", "田里的禾苗在阳光下长高了。"),
    "气": ("天气", "今天的天气晴朗，适合去公园。"),
    "哥": ("哥哥", "哥哥耐心地教我做数学题。"),
    "七": ("七彩", "雨后天空出现了一道七彩的彩虹。"),
    "去": ("过去", "我们要吸取过去的经验，做得更好。"),
    "日": ("日子", "快乐的日子总是过得特别快。"),
    "石": ("石头", "路边有一块圆圆的石头。"),
    "字": ("写字", "她一笔一画地认真写字。"),
    "车": ("车站", "我们在车站等公共汽车。"),
    "书": ("读书", "每天读书可以增加知识。"),
    "山": ("高山", "远处的高山被白云围绕着。"),
    "羊": ("山羊", "山羊在草地上低头吃草。"),
    "草": ("草地", "孩子们在草地上开心地奔跑。"),
    "阳": ("阳光", "温暖的阳光照进教室。"),
    "师": ("老师", "老师耐心地回答同学的问题。"),
    "安": ("安全", "过马路时，我们一定要注意安全。"),
    "外": ("外面", "外面下着雨，大家都撑起雨伞。"),
    "美": ("美丽", "校园里的花开得十分美丽。"),
    "新": ("新年", "新年到了，家家户户都很热闹。"),
    "卖": ("买卖", "市场里的买卖声此起彼落，十分热闹。"),
    "丑": ("丑小鸭", "丑小鸭最后变成了美丽的天鹅。"),
    "亲": ("亲切", "那位阿姨说话亲切，让人觉得温暖。"),
    "帮": ("帮助", "同学有困难时，我们应该主动帮助他。"),
    "福": ("幸福", "一家人在一起吃饭，是一种简单的幸福。"),
    "花": ("花朵", "花朵在微风中轻轻摇动。"),
    "身": ("身体", "多运动可以让身体更强壮。"),
    "朋": ("朋友", "真正的朋友会互相鼓励。"),
    "友": ("友爱", "同学之间要友爱相处。"),
    "科": ("科学", "科学课上，我们做了一个有趣的实验。"),
    "希": ("希望", "只要不放弃，就有希望成功。"),
    "望": ("愿望", "他的愿望是成为一名医生。"),
    "军": ("军人", "军人勇敢地保卫国家。"),
    "练": ("练习", "多练习朗读，发音会更准确。"),
    "努": ("努力", "她努力学习，成绩进步了很多。"),
    "愿": ("心愿", "我的心愿是把华文学得更好。"),
    "实": ("诚实", "诚实是一种值得称赞的好品格。"),
    "翻": ("翻开", "他翻开书本，开始认真阅读。"),
    "记": ("记住", "我用好词好句帮助自己记住生字。"),
    "信": ("信心", "老师的鼓励给了我很大的信心。"),
    "健": ("健康", "均衡饮食能帮助我们保持健康。"),
    "康": ("健康", "健康的身体比什么都重要。"),
    "解": ("解决", "大家一起想办法解决这个问题。"),
    "预": ("预习", "上课前先预习，学习会更轻松。"),
    "播": ("广播", "学校广播提醒大家准时集合。"),
    "续": ("继续", "虽然很累，他还是继续向前走。"),
    "精": ("精彩", "这场表演十分精彩，大家都拍手叫好。"),
    "换": ("交换", "同学们交换意见后，想出了更好的办法。"),
    "掌": ("掌声", "表演结束后，礼堂里响起热烈的掌声。"),
    "疲": ("疲倦", "跑完步后，他感到有些疲倦。"),
    "倦": ("疲倦", "妈妈工作了一天，脸上露出疲倦的神情。"),
    "议": ("建议", "老师接受了我们的建议。"),
    "敬": ("尊敬", "我们要尊敬长辈，礼貌待人。"),
    "悔": ("后悔", "他没有认真复习，考试后感到很后悔。"),
    "责": ("负责", "班长认真负责，大家都很信任他。"),
    "营": ("露营", "我们在营地里搭帐篷，准备露营。"),
    "探": ("探索", "孩子们喜欢探索大自然的秘密。"),
    "独": ("独立", "学会独立思考，是成长的重要一步。"),
    "贵": ("珍贵", "时间很珍贵，我们要好好利用。"),
    "竞": ("竞争", "良性的竞争能让我们更加努力。"),
    "协": ("合作", "小组成员互相合作，顺利完成任务。"),
    "确": ("正确", "我们要用正确的方法解决问题。"),
    "续": ("继续", "遇到困难时，他选择继续努力。"),
    "恼": ("烦恼", "把烦恼说出来，心里会轻松一些。"),
    "惜": ("珍惜", "我们要珍惜和家人相处的时光。"),
    "劳": ("劳动", "劳动虽然辛苦，却能带来快乐。"),
    "克": ("克服", "他终于克服困难，完成了这项挑战。"),
    "锻": ("锻炼", "每天锻炼身体，可以让我们更有精神。"),
    "炼": ("锻炼", "认真锻炼自己，才能不断进步。"),
    "验": ("验证", "科学实验可以验证我们的想法是否正确。"),
    "严": ("严格", "老师严格要求我们，是希望大家养成好习惯。"),
    "勤": ("勤劳", "勤劳的人总能把事情做得更好。"),
    "懒": ("懒惰", "我们不能懒惰，要主动完成自己的任务。"),
    "惰": ("惰性", "我们要克服惰性，坚持每天复习。"),
    "划": ("计划", "做事之前先订好计划，过程会更顺利。"),
    "临": ("临时", "这是一个临时安排，大家需要互相配合。"),
    "托": ("托付", "妈妈把重要的任务托付给哥哥。"),
    "艳": ("艳丽", "花园里的花开得十分艳丽。"),
    "滴": ("水滴", "一滴水滴落在叶子上，闪闪发亮。"),
    "埋": ("埋头", "他埋头读书，完全没有注意到时间。"),
    "暴": ("暴雨", "暴雨过后，天空慢慢放晴。"),
    "狂": ("狂风", "狂风吹过，树叶纷纷落下。"),
    "榜": ("榜样", "哥哥努力学习，是我的好榜样。"),
    "压": ("压力", "面对压力时，我们要学会冷静处理。"),
    "梦": ("梦想", "只要坚持努力，梦想就会越来越近。"),
    "复": ("复习", "考试前认真复习，可以帮助我们更有信心。"),
    "计": ("计划", "她为假期学习订下了清楚的计划。"),
    "勇": ("勇敢", "勇敢的人敢于面对新的挑战。"),
    "景": ("风景", "山上的风景美得让人难忘。"),
    "引": ("吸引", "有趣的故事深深吸引了同学们。"),
    "颜": ("颜色", "天空的颜色从蓝色慢慢变成橙色。"),
    "阵": ("一阵", "一阵微风吹来，让人觉得很舒服。"),
}
PHRASE_CHOICES_BY_CHAR = None
CURATED_PHRASE_BANK = None
BILINGUAL_WORDLIST = None

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def import_csv_file(conn, csv_path):
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            conn.execute(
                """
                INSERT OR IGNORE INTO words (char, pinyin, meaning, grade)
                VALUES (?, ?, ?, ?)
                """,
                (
                    row.get("char", "").strip(),
                    row.get("pinyin", "").strip(),
                    row.get("meaning", "").strip(),
                    row.get("grade", "").strip(),
                )
            )

def clean_import_row(row, fallback_grade="custom"):
    char = (
        row.get("char")
        or row.get("word")
        or row.get("hanzi")
        or row.get("chinese")
        or row.get("汉字")
        or row.get("字")
        or ""
    ).strip()
    pinyin = (row.get("pinyin") or row.get("拼音") or "").strip()
    meaning = (
        row.get("meaning")
        or row.get("english")
        or row.get("definition")
        or row.get("意思")
        or row.get("英文")
        or ""
    ).strip()
    grade = (row.get("grade") or row.get("level") or row.get("年级") or fallback_grade or "custom").strip()

    return {
        "char": char,
        "pinyin": pinyin,
        "meaning": meaning,
        "grade": grade
    }

def append_custom_import(rows):
    file_exists = os.path.exists(CUSTOM_IMPORT_PATH)
    with open(CUSTOM_IMPORT_PATH, "a", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["char", "pinyin", "meaning", "grade"])
        if not file_exists or os.path.getsize(CUSTOM_IMPORT_PATH) == 0:
            writer.writeheader()
        writer.writerows(rows)

def clean_source_entry(data):
    content_type = (data.get("content_type") or data.get("type") or "word").strip().lower()
    if content_type not in {"word", "phrase", "sentence", "paragraph"}:
        content_type = "word"

    content = (data.get("content") or data.get("text") or "").strip()
    return {
        "content_type": content_type,
        "content": content,
        "pinyin": (data.get("pinyin") or "").strip(),
        "meaning": (data.get("meaning") or data.get("english") or "").strip(),
        "grade": (data.get("grade") or "custom").strip(),
        "theme": (data.get("theme") or "").strip(),
        "note": (data.get("note") or "").strip(),
        "created_at": data.get("created_at") or datetime.now().isoformat(timespec="seconds")
    }

def save_source_entry(conn, entry):
    cursor = conn.execute(
        """
        INSERT OR IGNORE INTO learning_sources
          (content_type, content, pinyin, meaning, grade, theme, note, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            entry["content_type"],
            entry["content"],
            entry["pinyin"],
            entry["meaning"],
            entry["grade"],
            entry["theme"],
            entry["note"],
            entry["created_at"],
        )
    )

    if entry["content_type"] in {"word", "phrase"}:
        conn.execute(
            """
            INSERT OR IGNORE INTO words (char, pinyin, meaning, grade)
            VALUES (?, ?, ?, ?)
            """,
            (entry["content"], entry["pinyin"], entry["meaning"] or entry["theme"], entry["grade"])
        )

    return cursor.rowcount

def append_learning_source(entry):
    with open(LEARNING_SOURCES_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")

def import_learning_sources(conn):
    if not os.path.exists(LEARNING_SOURCES_PATH):
        return

    with open(LEARNING_SOURCES_PATH, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            try:
                entry = clean_source_entry(json.loads(line))
            except json.JSONDecodeError:
                continue
            if entry["content"]:
                save_source_entry(conn, entry)

def clean_word_helper(data):
    return {
        "char": (data.get("char") or "").strip(),
        "grade": (data.get("grade") or "").strip(),
        "meaning": (data.get("meaning") or "").strip(),
        "phrase": (data.get("phrase") or "").strip(),
        "sentence": (data.get("sentence") or "").strip(),
        "note": (data.get("note") or "").strip(),
        "created_at": data.get("created_at") or datetime.now().isoformat(timespec="seconds")
    }

def clean_word_helper_row(row, fallback_grade=""):
    return clean_word_helper({
        "char": row.get("char") or row.get("word") or row.get("hanzi") or row.get("字") or row.get("汉字") or "",
        "grade": row.get("grade") or row.get("level") or row.get("年级") or fallback_grade or "",
        "meaning": row.get("meaning") or row.get("definition") or row.get("意思") or row.get("课文") or "",
        "phrase": row.get("phrase") or row.get("word_phrase") or row.get("词语") or row.get("好词") or "",
        "sentence": row.get("sentence") or row.get("example") or row.get("例句") or row.get("好句") or "",
        "note": row.get("note") or row.get("source") or row.get("来源") or ""
    })

def helper_matches_word(helper):
    char = helper["char"]
    phrase = helper["phrase"]
    sentence = helper["sentence"]
    if not char or not phrase:
        return False
    if char not in phrase:
        return False
    if sentence and char not in sentence and phrase not in sentence:
        return False
    return True

def save_word_helper(conn, helper):
    conn.execute(
        """
        INSERT INTO word_helpers (char, grade, meaning, phrase, sentence, note, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(char, grade, meaning) DO UPDATE SET
          phrase=excluded.phrase,
          sentence=excluded.sentence,
          note=excluded.note,
          created_at=excluded.created_at
        """,
        (
            helper["char"],
            helper["grade"],
            helper["meaning"],
            helper["phrase"],
            helper["sentence"],
            helper["note"],
            helper["created_at"],
        )
    )

def append_word_helper(helper):
    with open(WORD_HELPERS_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps(helper, ensure_ascii=False) + "\n")

def import_word_helpers(conn):
    if not os.path.exists(WORD_HELPERS_PATH):
        return

    with open(WORD_HELPERS_PATH, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            try:
                helper = clean_word_helper(json.loads(line))
            except json.JSONDecodeError:
                continue
            if helper["char"] and helper["phrase"]:
                save_word_helper(conn, helper)

def word_helper_lookup(conn, grade):
    rows = conn.execute(
        """
        SELECT char, grade, meaning, phrase, sentence
        FROM word_helpers
        WHERE grade=? OR grade=''
        ORDER BY id DESC
        """,
        (grade,)
    ).fetchall()
    helpers = {}
    for row in rows:
        helper = dict(row)
        helpers[(helper["char"], helper["grade"], helper["meaning"])] = helper
        helpers.setdefault((helper["char"], helper["grade"], ""), helper)
        helpers.setdefault((helper["char"], "", ""), helper)
    return helpers

def load_curated_phrase_bank():
    global CURATED_PHRASE_BANK
    if CURATED_PHRASE_BANK is not None:
        return CURATED_PHRASE_BANK

    bank = []
    if os.path.exists(CURATED_PHRASE_BANK_PATH):
        with open(CURATED_PHRASE_BANK_PATH, "r", encoding="utf-8") as f:
            for line in f:
                if not line.strip():
                    continue
                try:
                    entry = json.loads(line)
                except json.JSONDecodeError:
                    continue
                phrase = (entry.get("phrase") or "").strip()
                sentence = (entry.get("sentence") or "").strip()
                targets = (entry.get("targets") or phrase).strip()
                if phrase and targets:
                    bank.append({
                        "targets": targets,
                        "phrase": phrase,
                        "sentence": sentence,
                        "min_grade": int(entry.get("min_grade") or 1),
                        "max_grade": int(entry.get("max_grade") or 6),
                        "theme": (entry.get("theme") or "").strip(),
                        "source": (entry.get("source") or "").strip(),
                    })

    CURATED_PHRASE_BANK = bank
    return CURATED_PHRASE_BANK

def curated_helper_for_word(char, grade):
    if not char:
        return None
    try:
        grade_number = int(grade)
    except (TypeError, ValueError):
        grade_number = 6

    for entry in load_curated_phrase_bank():
        if not (entry["min_grade"] <= grade_number <= entry["max_grade"]):
            continue
        if char in entry["targets"] and char in entry["phrase"]:
            return entry
    return None

def load_bilingual_wordlist():
    global BILINGUAL_WORDLIST
    if BILINGUAL_WORDLIST is not None:
        return BILINGUAL_WORDLIST

    entries = []
    if os.path.exists(BILINGUAL_WORDLIST_PATH):
        with open(BILINGUAL_WORDLIST_PATH, "r", encoding="utf-8") as f:
            for line in f:
                if not line.strip():
                    continue
                try:
                    entry = json.loads(line)
                except json.JSONDecodeError:
                    continue
                word = (entry.get("word") or "").strip()
                english = (entry.get("english") or "").strip()
                grade = (entry.get("grade") or "").strip()
                if word and english and grade:
                    entries.append({
                        "word": word,
                        "english": english,
                        "grade": grade,
                        "source_pdf": (entry.get("source_pdf") or "").strip(),
                        "page": entry.get("page") or "",
                    })

    entries.sort(key=lambda item: (len(item["word"]), item["word"]))
    BILINGUAL_WORDLIST = entries
    return BILINGUAL_WORDLIST

def bilingual_helper_for_word(char, grade):
    if not char:
        return None
    grade = str(grade or "")
    exact_match = None
    contains_match = None

    for entry in load_bilingual_wordlist():
        if entry["grade"] != grade:
            continue
        if entry["word"] == char:
            exact_match = entry
            break
        if char in entry["word"] and contains_match is None:
            contains_match = entry

    return exact_match or contains_match

def phrase_choices_by_char():
    global PHRASE_CHOICES_BY_CHAR
    if PHRASE_CHOICES_BY_CHAR is not None:
        return PHRASE_CHOICES_BY_CHAR

    choices = {}
    for phrase, freq in jieba.dt.FREQ.items():
        if (
            2 <= len(phrase) <= 4
            and HAN_RE.match(phrase)
            and phrase not in PHRASE_BLOCKLIST
        ):
            shorter_bonus = 4 - len(phrase)
            for char in set(phrase):
                starts_with_char = 1 if phrase.startswith(char) else 0
                score = freq + starts_with_char * 500000 + shorter_bonus * 100
                choices.setdefault(char, []).append((score, phrase))

    for char_choices in choices.values():
        char_choices.sort(reverse=True)

    PHRASE_CHOICES_BY_CHAR = choices
    return PHRASE_CHOICES_BY_CHAR

@lru_cache(maxsize=1024)
def choose_phrase(char):
    if char in PREFERRED_HELPERS:
        return PREFERRED_HELPERS[char][0]
    return char

def lesson_number(meaning):
    match = re.search(r"第(\d+)课", meaning or "")
    return match.group(1) if match else ""

def lesson_context(words, current_word):
    current = dict(current_word)
    lesson = lesson_number(current.get("meaning", ""))
    if not lesson:
        return []

    related = []
    for row in words:
        item = dict(row)
        if item.get("char") == current.get("char"):
            continue
        if lesson_number(item.get("meaning", "")) != lesson:
            continue
        phrase = choose_phrase(item.get("char", ""))
        if phrase and phrase not in related:
            related.append(phrase)
        if len(related) >= 3:
            break
    return related

def good_sentence(char, phrase, related_words=None, lesson=""):
    if char in PREFERRED_HELPERS:
        return PREFERRED_HELPERS[char][1]

    return ""

def enrich_word(row, helpers=None, related_words=None):
    word = dict(row)
    char = word.get("char", "")
    pinyin = word.get("pinyin") or " ".join(lazy_pinyin(char, style=Style.TONE))
    helper = None
    if helpers:
        helper = (
            helpers.get((char, word.get("grade", ""), word.get("meaning", "")))
            or helpers.get((char, word.get("grade", ""), ""))
            or helpers.get((char, "", ""))
        )
    bilingual_helper = bilingual_helper_for_word(char, word.get("grade", ""))
    curated_helper = None if helper or bilingual_helper else curated_helper_for_word(char, word.get("grade", ""))
    phrase = (
        helper["phrase"] if helper
        else bilingual_helper["word"] if bilingual_helper
        else curated_helper["phrase"] if curated_helper
        else choose_phrase(char)
    )
    lesson = lesson_number(word.get("meaning", ""))
    sentence = (
        helper["sentence"] if helper and helper.get("sentence")
        else curated_helper["sentence"] if curated_helper and curated_helper.get("sentence")
        else good_sentence(char, phrase, related_words, lesson)
    )

    word["pinyin"] = pinyin
    word["phrase"] = phrase
    word["association"] = f"好词：{phrase}"
    word["good_sentence"] = f"好句：{sentence}" if sentence else ""
    word["textbook_words"] = related_words or []
    word["helper_source"] = "manual" if helper else "pdf" if bilingual_helper else "curated" if curated_helper else "auto"
    word["helper_theme"] = curated_helper.get("theme", "") if curated_helper else ""
    word["helper_english"] = bilingual_helper.get("english", "") if bilingual_helper else ""
    word["helper_pdf_source"] = bilingual_helper.get("source_pdf", "") if bilingual_helper else ""
    word["helper_pdf_page"] = bilingual_helper.get("page", "") if bilingual_helper else ""
    word["sound_url"] = f"https://translate.google.com/?sl=zh-CN&tl=en&text={quote(char)}&op=translate"
    return word

def init_db():
    """Initialize the database and import CSV vocabulary data."""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = get_db()
    cur = conn.cursor()
    
    # Create table if not exists
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        cur.executescript(f.read())

    cur.execute("DELETE FROM words")
    cur.execute("DELETE FROM learning_sources")
    cur.execute("DELETE FROM word_helpers")

    csv_files = sorted(
        os.path.join(DATA_DIR, file_name)
        for file_name in os.listdir(DATA_DIR)
        if file_name.endswith(".csv")
    )

    for csv_file in csv_files:
        print(f"Importing vocabulary from {os.path.basename(csv_file)}...")
        import_csv_file(conn, csv_file)

    import_learning_sources(conn)
    import_word_helpers(conn)

    conn.commit()
    conn.close()

@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")

@app.route("/<path:path>")
def frontend_file(path):
    return send_from_directory(FRONTEND_DIR, path)

@app.route("/api/source", methods=["GET"])
def get_source():
    return jsonify({
        "name": "Apple Notes: P1-6",
        "status": "12 PDF attachments detected in Notes; direct export is blocked by macOS permissions in this session.",
        "active_data": "P1-P6 Singapore primary Chinese character CSV files in the repo data folder"
    })

@app.route("/api/grades", methods=["GET"])
def get_grades():
    db = get_db()
    grades = db.execute(
        """
        SELECT grade, COUNT(*) AS total
        FROM words
        GROUP BY grade
        ORDER BY
          CASE WHEN grade GLOB '[0-9]*' THEN 0 ELSE 1 END,
          CAST(grade AS INTEGER),
          grade
        """
    ).fetchall()
    return jsonify([dict(row) for row in grades])

@app.route("/api/words", methods=["GET"])
def get_words():
    grade = request.args.get("grade", "1")
    db = get_db()
    words = db.execute(
        "SELECT char, pinyin, meaning, grade FROM words WHERE grade=? ORDER BY id",
        (grade,)
    ).fetchall()
    helpers = word_helper_lookup(db, grade)
    db.close()
    return jsonify([
        enrich_word(word, helpers, lesson_context(words, word))
        for word in words
    ])

@app.route("/api/tts", methods=["GET"])
def tts_audio():
    text = request.args.get("text", "").strip()
    if not text:
        return jsonify({"error": "Missing text"}), 400

    text = text[:180]
    source_url = f"https://dict.youdao.com/dictvoice?audio={quote(text)}&le=zh"
    try:
        req = Request(source_url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(req, timeout=8, context=ssl._create_unverified_context()) as response:
            audio = response.read()
    except Exception as error:
        return jsonify({"error": f"TTS fetch failed: {error}"}), 502

    return Response(
        audio,
        mimetype="audio/mpeg",
        headers={
            "Cache-Control": "public, max-age=86400",
            "Content-Disposition": "inline; filename=nihao-buddy-tts.mp3"
        }
    )

@app.route("/api/dictation_words", methods=["GET"])
def get_dictation_words():
    grade = request.args.get("grade", "1")
    seen = set()
    entries = []

    for entry in load_bilingual_wordlist():
        if entry["grade"] != str(grade):
            continue
        word = entry["word"]
        if word in seen:
            continue
        seen.add(word)
        entries.append({
            "word": word,
            "english": entry["english"],
            "grade": entry["grade"],
            "source_pdf": entry["source_pdf"],
            "page": entry["page"],
        })

    return jsonify(entries)

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

@app.route("/api/import_words", methods=["POST"])
def import_words():
    data = request.json or {}
    csv_text = (data.get("csvText") or "").strip()
    fallback_grade = (data.get("grade") or "custom").strip()

    if not csv_text:
        return jsonify({"error": "Paste CSV data before importing."}), 400

    reader = csv.DictReader(io.StringIO(csv_text))
    if not reader.fieldnames:
        return jsonify({"error": "CSV must include a header row."}), 400

    rows_to_save = []
    errors = []
    for index, raw_row in enumerate(reader, start=2):
        row = clean_import_row(raw_row, fallback_grade=fallback_grade)
        if not row["char"]:
            errors.append(f"Line {index}: missing Chinese character/word.")
            continue
        if not row["meaning"]:
            errors.append(f"Line {index}: missing meaning.")
            continue
        rows_to_save.append(row)

    if not rows_to_save:
        return jsonify({
            "error": "No valid rows found.",
            "errors": errors
        }), 400

    db = get_db()
    added = 0
    skipped = 0
    for row in rows_to_save:
        cursor = db.execute(
            """
            INSERT OR IGNORE INTO words (char, pinyin, meaning, grade)
            VALUES (?, ?, ?, ?)
            """,
            (row["char"], row["pinyin"], row["meaning"], row["grade"])
        )
        if cursor.rowcount:
            added += 1
        else:
            skipped += 1
    db.commit()
    db.close()

    append_custom_import(rows_to_save)

    return jsonify({
        "message": f"Imported {added} new words. {skipped} duplicate rows skipped.",
        "added": added,
        "skipped": skipped,
        "saved_to": os.path.basename(CUSTOM_IMPORT_PATH),
        "errors": errors[:10]
    })

@app.route("/api/learning_sources", methods=["GET"])
def get_learning_sources():
    grade = request.args.get("grade")
    db = get_db()
    if grade:
        rows = db.execute(
            """
            SELECT * FROM learning_sources
            WHERE grade=?
            ORDER BY id DESC
            LIMIT 80
            """,
            (grade,)
        ).fetchall()
    else:
        rows = db.execute(
            "SELECT * FROM learning_sources ORDER BY id DESC LIMIT 80"
        ).fetchall()
    db.close()
    return jsonify([dict(row) for row in rows])

@app.route("/api/learning_sources", methods=["POST"])
def add_learning_source():
    entry = clean_source_entry(request.json or {})
    if not entry["content"]:
        return jsonify({"error": "Enter a word, phrase, sentence, or paragraph first."}), 400

    db = get_db()
    added = save_source_entry(db, entry)
    db.commit()
    db.close()

    if added:
        append_learning_source(entry)

    return jsonify({
        "message": "Saved to Source Library." if added else "This source already exists.",
        "added": bool(added),
        "source": entry,
        "also_added_to_word_bank": entry["content_type"] in {"word", "phrase"}
    })

@app.route("/api/word_helper", methods=["POST"])
def add_word_helper():
    helper = clean_word_helper(request.json or {})
    if not helper["char"]:
        return jsonify({"error": "Missing word or character."}), 400
    if not helper["phrase"]:
        return jsonify({"error": "Enter your own 好词 first."}), 400
    if not helper_matches_word(helper):
        return jsonify({"error": "好词/好句 must contain the target word or character."}), 400

    db = get_db()
    save_word_helper(db, helper)
    db.commit()
    db.close()
    append_word_helper(helper)

    return jsonify({
        "message": "Saved your 好词/好句 override.",
        "helper": helper
    })

@app.route("/api/import_word_helpers", methods=["POST"])
def import_word_helper_rows():
    data = request.json or {}
    csv_text = (data.get("csvText") or "").strip()
    fallback_grade = (data.get("grade") or "").strip()
    if not csv_text:
        return jsonify({"error": "Paste a CSV with char, phrase, and optional sentence columns."}), 400

    reader = csv.DictReader(io.StringIO(csv_text))
    if not reader.fieldnames:
        return jsonify({"error": "CSV needs a header row."}), 400

    imported = []
    skipped = []
    for line_number, row in enumerate(reader, start=2):
        helper = clean_word_helper_row(row, fallback_grade)
        if not helper["char"] or not helper["phrase"]:
            skipped.append({"line": line_number, "reason": "Missing char or phrase."})
            continue
        if not helper_matches_word(helper):
            skipped.append({"line": line_number, "reason": "Phrase or sentence does not contain the target word."})
            continue
        imported.append(helper)

    if not imported:
        return jsonify({"error": "No valid helper rows found.", "skipped": skipped}), 400

    db = get_db()
    for helper in imported:
        save_word_helper(db, helper)
        append_word_helper(helper)
    db.commit()
    db.close()

    return jsonify({
        "message": f"Imported {len(imported)} 好词/好句 entries.",
        "imported": len(imported),
        "skipped": skipped
    })

if __name__ == "__main__":
    init_db()
    auto_start = os.environ.get("NIHAO_BUDDY_AUTO_START") == "1"
    app.run(host="0.0.0.0", port=5000, debug=not auto_start)
