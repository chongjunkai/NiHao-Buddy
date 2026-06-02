from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pypinyin import Style, lazy_pinyin
import jieba
import sqlite3, os, csv
from urllib.parse import quote
import re

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
FRONTEND_DIR = os.path.join(ROOT_DIR, "frontend")
DATA_DIR = os.path.join(ROOT_DIR, "data")
DB_PATH = os.path.join(DATA_DIR, "huaword.db")
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), "models/schema.sql")

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

def choose_phrase(char):
    if char in PREFERRED_HELPERS:
        return PREFERRED_HELPERS[char][0]

    candidates = []
    for phrase, freq in jieba.dt.FREQ.items():
        if (
            char in phrase
            and 2 <= len(phrase) <= 4
            and HAN_RE.match(phrase)
            and phrase not in PHRASE_BLOCKLIST
        ):
            starts_with_char = 1 if phrase.startswith(char) else 0
            shorter_bonus = 4 - len(phrase)
            score = freq + starts_with_char * 500000 + shorter_bonus * 100
            candidates.append((score, phrase))

    if not candidates:
        return f"{char}的词语"

    candidates.sort(reverse=True)
    return candidates[0][1]

def good_sentence(char, phrase):
    if char in PREFERRED_HELPERS:
        return PREFERRED_HELPERS[char][1]

    templates = [
        f"读到「{phrase}」这个好词时，我能想到和「{char}」有关的意思。",
        f"学习「{char}」时，可以先记住「{phrase}」这个常用词。",
        f"把「{phrase}」放在词语本里，复习「{char}」时就更容易想起来。",
        f"看到「{phrase}」这个词，我会提醒自己读准「{char}」。"
    ]
    return templates[ord(char) % len(templates)]

def enrich_word(row):
    word = dict(row)
    char = word.get("char", "")
    pinyin = word.get("pinyin") or " ".join(lazy_pinyin(char, style=Style.TONE))
    phrase = choose_phrase(char)

    word["pinyin"] = pinyin
    word["phrase"] = phrase
    word["association"] = f"好词：{phrase}"
    word["good_sentence"] = f"好句：{good_sentence(char, phrase)}"
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

    csv_files = sorted(
        os.path.join(DATA_DIR, file_name)
        for file_name in os.listdir(DATA_DIR)
        if file_name.endswith(".csv")
    )

    for csv_file in csv_files:
        print(f"Importing vocabulary from {os.path.basename(csv_file)}...")
        import_csv_file(conn, csv_file)

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
        "SELECT grade, COUNT(*) AS total FROM words GROUP BY grade ORDER BY CAST(grade AS INTEGER)"
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
    return jsonify([enrich_word(w) for w in words])

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
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
