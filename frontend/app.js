const STORAGE_KEY = "nihaoBuddyLearningData";
const CURRENT_USER_KEY = "nihaoBuddyCurrentUser";
const UI_LANGUAGE_KEY = "nihaoBuddyUiLanguage";
const APP_MODE_KEY = "nihaoBuddyAppMode";
const MAX_VISIBLE_CARDS = 120;
const STATIC_GRADES = ["1", "2", "3", "4", "5", "6"];
const IS_GITHUB_PAGES = window.location.hostname.endsWith("github.io");
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
const ENGLISH_HINTS = {
  "克服": "overcome",
  "锻炼": "exercise; train",
  "严格": "strict",
  "勤劳": "hard-working",
  "懒惰": "lazy",
  "计划": "plan",
  "托付": "entrust",
  "艳丽": "bright and beautiful",
  "水滴": "water drop",
  "埋头": "bury one's head in work",
  "暴雨": "heavy rain",
  "狂风": "strong wind",
  "榜样": "role model",
  "压力": "pressure",
  "梦想": "dream",
  "复习": "revise",
  "勇敢": "brave",
  "风景": "scenery",
  "吸引": "attract",
  "颜色": "colour",
  "一阵": "a short burst",
  "衣服": "clothes",
  "小鱼": "small fish",
  "雨水": "rainwater",
  "一心一意": "wholeheartedly",
  "一清二楚": "very clear",
  "五颜六色": "colourful",
  "耳朵": "ear",
  "牙齿": "teeth",
  "开口": "speak up",
  "助人为乐": "enjoy helping others",
  "木屋": "wooden house",
  "土地": "land",
  "马上": "immediately",
  "嘴巴": "mouth",
  "你好": "hello",
  "我们": "we; us",
  "他们": "they; them",
  "弟弟": "younger brother",
  "不怕": "not afraid",
  "爸爸": "father",
  "妈妈": "mother",
  "女孩": "girl",
  "儿子": "son",
  "努力": "work hard",
  "河水": "river water",
  "禾苗": "seedling",
  "天气": "weather",
  "哥哥": "older brother",
  "七彩": "rainbow-coloured",
  "过去": "the past",
  "日子": "days",
  "石头": "stone",
  "写字": "write characters",
  "车站": "bus stop; station",
  "读书": "read; study",
  "高山": "high mountain",
  "山羊": "goat",
  "草地": "grass field",
  "阳光": "sunshine",
  "老师": "teacher",
  "安全": "safety",
  "外面": "outside",
  "美丽": "beautiful",
  "新年": "new year",
  "亲切": "kind",
  "帮助": "help",
  "幸福": "happiness",
  "花朵": "flower",
  "身体": "body",
  "朋友": "friend",
  "友爱": "friendship; kindness",
  "科学": "science",
  "希望": "hope",
  "愿望": "wish",
  "军人": "soldier",
  "练习": "practice",
  "心愿": "wish",
  "诚实": "honest",
  "翻开": "open a book",
  "记住": "remember",
  "信心": "confidence",
  "健康": "healthy",
  "解决": "solve",
  "预习": "preview lesson",
  "广播": "broadcast",
  "继续": "continue",
  "精彩": "wonderful",
  "交换": "exchange",
  "掌声": "applause",
  "疲倦": "tired",
  "建议": "suggestion",
  "尊敬": "respect",
  "后悔": "regret",
  "负责": "responsible",
  "露营": "camping",
  "探索": "explore",
  "独立": "independent",
  "珍贵": "precious",
  "竞争": "competition",
  "合作": "cooperate",
  "正确": "correct",
  "烦恼": "worry",
  "珍惜": "cherish",
  "劳动": "labour; work",
  "验证": "verify",
  "惰性": "inertia; laziness",
  "临时": "temporary",
  "孙中山": "Sun Yat-sen",
  "牵引": "pull; tow",
  "促进": "promote",
  "庭长": "chief judge",
  "谐振": "resonance",
  "拨款": "allocate funds",
  "智慧": "wisdom",
  "闯王": "rebel king",
  "斜眼": "squint",
  "迅速": "quick; rapid",
  "踩踏": "step on",
  "眯缝": "squint",
  "呀呀": "babbling sound",
  "挡住": "block",
  "唇舌": "lips and tongue",
  "忆及": "recall",
  "趣味": "interest; fun",
  "贴金": "decorate; glorify",
  "共同": "together; common",
  "陪同": "accompany",
  "歪曲": "distort",
  "蒸发": "evaporate",
  "脆弱": "fragile",
  "煎熬": "suffering",
  "赠送": "give as a gift",
  "咸宁": "Xianning",
  "粥样": "porridge-like",
  "粒子": "particle",
  "仿佛": "as if",
  "例如": "for example",
  "毒性": "toxicity",
  "财产": "property",
  "夺取": "seize",
  "彼此": "each other",
  "劲力": "strength",
  "伟大": "great",
  "慧眼": "sharp insight",
  "炸弹": "bomb",
  "烤鱼": "grilled fish",
  "苗族": "Miao ethnic group",
  "盘旋": "circle; hover",
  "瘦子": "thin person",
  "汁液": "juice; liquid",
  "除了": "besides; except",
  "争取": "strive for",
  "断裂": "break; fracture",
  "珠江": "Pearl River",
  "链接": "link",
  "货币": "currency",
  "宜昌": "Yichang",
  "质量": "quality",
  "销售": "sell; sales",
  "售价": "selling price",
  "损失": "loss",
  "修改": "revise; modify",
  "趟马": "horse-riding move",
  "匆匆": "hurriedly",
  "扰乱": "disturb",
  "普通": "ordinary",
  "趁机": "take the chance",
  "慈禧": "Empress Dowager Cixi",
  "祥和": "peaceful",
  "价值": "value",
  "量子": "quantum",
  "理论": "theory",
  "套餐": "set meal; package",
  "弯曲": "bend",
  "腰间": "waist",
  "随着": "along with",
  "示威": "demonstrate",
  "反对": "oppose",
  "择优": "choose the best",
  "述说": "tell; describe",
  "呈现": "present; show",
  "式样": "style; pattern",
  "创造": "create",
  "肥沃": "fertile",
  "性质": "nature; property",
  "贪污": "corruption",
  "砸烂": "smash",
  "碎片": "fragment",
  "镇压": "suppress",
  "锤炼": "temper; refine",
  "聋哑": "deaf-mute",
  "糟糕": "terrible",
  "捂住": "cover with hand",
  "塞外": "beyond the Great Wall",
  "捞钱": "make money unfairly",
  "达到": "reach",
  "垃圾": "rubbish",
  "铃声": "ringing sound",
  "院长": "principal; director",
  "搬运": "move; carry",
  "笨重": "heavy and clumsy",
  "也许": "perhaps",
  "她们": "they; them (female)",
  "的话": "if; words",
  "父亲": "father",
  "母亲": "mother",
  "立即": "immediately",
  "米粉": "rice noodles",
  "和平": "peace",
  "几个": "several",
  "了解": "understand",
  "个人": "person; individual",
  "句子": "sentence",
  "可以": "can; may",
  "以及": "as well as",
  "子女": "children",
  "四个": "four",
  "十分": "very",
  "士兵": "soldier",
  "只要": "as long as",
  "把握": "grasp",
  "尺寸": "size",
  "是否": "whether",
  "出来": "come out",
  "自己": "oneself",
  "己方": "one's own side",
  "它们": "they; them (things)",
  "吃饭": "eat a meal",
  "毛泽东": "Mao Zedong",
  "太阳": "sun",
  "王朝": "dynasty",
  "三个": "three",
  "伞兵": "paratrooper",
  "包括": "include",
  "早已": "already",
  "半天": "half a day",
  "奶奶": "grandmother",
  "玩具": "toy",
  "具有": "have; possess",
  "鸟类": "birds",
  "田地": "field",
  "象征": "symbolise",
  "家庭": "family",
  "网络": "network",
  "在于": "lie in",
  "里面": "inside",
  "上海": "Shanghai",
  "下来": "come down",
  "大学": "university",
  "小时": "hour",
  "哭声": "crying sound",
  "笑容": "smile",
  "男人": "man",
  "爷爷": "grandfather",
  "姐姐": "older sister",
  "果然": "as expected",
  "开始": "begin",
  "瓜分": "divide up",
  "火箭": "rocket",
  "叶子": "leaf",
  "面积": "area",
  "关系": "relationship",
  "两个": "two",
  "片刻": "a moment",
  "画家": "painter"
};
const USERS = {
  enzo: {
    username: "enzo",
    password: "enzo123",
    displayName: "Enzo",
    age: 12,
    defaultGrade: "6",
    description: "P6 quest path"
  },
  enya: {
    username: "enya",
    password: "enya123",
    displayName: "Enya",
    age: 6,
    defaultGrade: "1",
    description: "Age 6, P1 starter path"
  },
  guest: {
    username: "guest",
    password: "guest123",
    displayName: "Guest",
    age: 10,
    defaultGrade: "3",
    description: "Guest demo path"
  }
};

function todayKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

const CHALLENGE_DURATION_SECONDS = 90;
const CHALLENGE_ROUND_PAUSE_MS = 1400;
const ALBUM_EXTRA_DELAY_MS = 1500;
const ALBUM_MIN_INTERVAL_MS = 6500;
const ALBUM_MAX_INTERVAL_MS = 30000;
const HIGH_FREQUENCY_CHARS = new Set(
  "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严"
);

const UI_TEXT = {
  en: {
    interfaceLabel: "Interface", heroEyebrow: "Gamified Chinese Learning App",
    heroText: "Train Chinese words like a game: collect points, clear quests, beat challenges, and unlock badges.",
    dailyQuest: "Daily Quest", xpRewards: "XP Rewards", wordArena: "Word Arena", enterWordAlbum: "Open Word Album",
    readyQuest: "Ready for a word quest?", xpPoints: "XP points", dayStreak: "day streak", wordsCleared: "words cleared",
    studentMode: "Student Mode", parentMode: "Parent/Teacher",
    home: "Home", questMap: "Quest Map", chooseZone: "Choose your training zone", activeLearner: "Active Learner", switchUser: "Choose / Switch User",
    level: "Level", lesson: "Lesson", search: "Search", searchPlaceholder: "Character, pinyin, phrase",
    bossChallenge: "Boss Challenge", wordBase: "Word Album", quizArena: "Quiz Arena", reviewQuest: "Review Quest",
    dictation: "Dictation", backpack: "Backpack", speedRun: "Speed Run", podcastRoom: "Podcast Room", psleRoom: "PSLE Room", dataLab: "Data Lab", dashboard: "Dashboard", badges: "Badges",
    dailyQuestPath: "Daily Quest Path", clearQuest: "Clear today’s Chinese quest",
    questSummary: "Learn 5 words, answer 3 quizzes, play Speed Run, listen or practise PSLE, then claim your chest.",
    startLesson: "Start Today’s Lesson", startLessonText: "Begin with five useful words, then continue through today’s quest path.",
    wordAlbumText: "Flip through big word cards with sound, 好词 and 好句.",
    mission1: "Mission 1", mission1Text: "Flip through word cards and collect useful phrases.",
    mission2: "Mission 2", mission2Text: "Fix mistakes so weak words come back for review.",
    mission3: "Mission 3", mission3Text: "Build a streak, win badges, and try speed mode.",
    mission4: "Mission 4", mission4Text: "Listen to vocabulary stories for 磨耳朵 practice.",
    claimChest: "Claim Chest", enableSound: "Enable Sound", soundOn: "Sound On", soundBlocked: "Tap Sound Again", prev: "Prev", next: "Next",
    pauseAuto: "Pause Auto Play", resumeAuto: "Resume Auto Play", random: "Random", highFrequency: "High Frequency",
    albumHint: "Click Enable Sound once. Auto-play can then read the word, 好词, and 好句.",
    listen: "Listen", audio: "Audio", save: "Save", saved: "Saved", know: "Know", quiz: "Quiz", editHaoci: "Edit 好词", myHaoci: "My 好词",
    newQuestion: "New Question", question: "Question", loadingQuiz: "Loading quiz...",
    quizTitle: "Quiz Practice", quizIntro: "Pick the matching character and build your streak.",
    saveHaoci: "Save 好词", cancel: "Cancel",
    dictationTitle: "Dictation Practice", dictationPrompt: "Listen, write on paper, then self-check", newWord: "Start Dictation",
    playWord: "Play 好词", replaySlowly: "Replay Slowly", reveal: "Reveal", wroteCorrectly: "I wrote it correctly", needReview: "Need Review",
    reviewTitle: "Recommended Review", reviewIntro: "Words appear here when you miss them or save them.", refresh: "Refresh", practice: "Practice",
    collectionTitle: "My Collection", collectionIntro: "Saved words for personal practice.", clear: "Clear",
    speedTitle: "Phrase Hunt Speed Run", speedIntro: "Use the clue to spot every phrase card that contains the hidden target word before time runs out.",
    start: "Start", target: "Target", score: "Score", time: "Time",
    podcastTitle: "Compo Listening Room", podcastIntro: "磨耳朵: listen to good phrases, oral answer patterns, and short composition-style passages.",
    newPractice: "New Practice", podcastQuest: "PSLE-Style Listening Quest", podcastHeading: "Listen to useful phrases and a short model passage.",
    podcastNote: "This uses browser speech instead of saved audio files, so it does not take extra storage.", playPractice: "Play Practice", stop: "Stop",
    morePractice: "More PSLE Practice", morePracticeIntro: "Singapore oral and composition resources for extra practice.",
    pslePrepDesc: "PSLE-style Chinese oral reading and video conversation practice.",
    claceDesc: "Singapore PSLE Chinese composition feedback, vocabulary, and rewrite drills.",
    phraseResourceDesc: "Composition phrase ideas for building a personal phrase bank.",
    officialExamDesc: "Official exam format, rules, and distributor links for past-year papers.",
    formatDesc: "Official PSLE format page for checking current exam structure.",
    oralResourceDesc: "External Singapore-style oral practice inspiration.",
    psleTitle: "PSLE Practice Room", psleIntro: "Original PSLE-style practice. Real past-year papers should be bought from official distributors.", newSet: "New Set",
    compoPractice: "Composition Practice", oralPractice: "Oral Practice", markCompo: "Mark Composition", markOral: "Mark Oral Answer",
    playPassage: "Play Passage", playQuestion: "Play Question", playModel: "Play Model Answer", stopAudio: "Stop Audio", recordAnswer: "Record Answer", stopRecording: "Stop Recording",
    modelAnswer: "Model Answer", compoPlaceholder: "Write your Chinese composition here...", oralPlaceholder: "Your spoken answer transcript will appear here. You can also type here.",
    dataLabTitle: "Data Lab", dataLabIntro: "Import new Chinese learning data into the local database and word games.", useSample: "Use Sample",
    manualSourceTitle: "Manual Source Builder", manualSourceIntro: "Add one word, phrase, sentence, or paragraph whenever you find useful Chinese learning material.",
    type: "Type", word: "Word", phrase: "Phrase", sentence: "Sentence", paragraph: "Paragraph", levelCollection: "Level / Collection",
    theme: "Theme", pinyin: "Pinyin", meaningUse: "Meaning / Use", chineseSource: "Chinese Source", studyNote: "Study Note",
    saveSource: "Save Source", sourceLibrary: "Source Library", sourceLibraryIntro: "Recently saved learning sources. Words and phrases also join the word games.",
    helperImportTitle: "Dictionary 好词好句 Import", helperImportIntro: "Paste licensed dictionary notes or your own curated source. The app only accepts rows where the phrase and sentence contain the target character.",
    defaultLevel: "Default Level", pasteHelperCsv: "Paste 好词好句 CSV", importHelper: "Import 好词好句",
    csvFormat: "CSV Format", csvIntro: "Use a header row. Supported columns include char, word, hanzi, 汉字, pinyin, meaning, and grade.",
    importSaveNote: "The app saves imports to data/custom_imports.csv, then rebuilds them into SQLite whenever NiHao Buddy restarts.",
    uploadCsv: "Upload CSV", pasteCsv: "Paste CSV Data", importData: "Import Data",
    parentDashboard: "Parent Dashboard", dashboardIntro: "Quick learning summary, weak areas, and suggested revision.",
    progressTitle: "Progress", progressIntro: "Your local learning record on this browser.", resetProgress: "Reset Progress",
    stats: "Stats", quizzesCompleted: "Quizzes completed", correctAnswers: "Correct answers", dailyStreakLabel: "Daily streak",
    quizComboLabel: "Quiz combo", storiesListened: "Stories listened", mistakesToReview: "Mistakes to review", savedWords: "Saved words",
    levelUnlocks: "Level & Unlocks", noBadges: "No badges yet. Keep learning!",
    claimed: "Claimed", lockedChest: "Locked Chest",
    dictationGroupLabel: "Dictation Set",
    dictationSourceReady: grade => `Choose one P${grade} 好词 set, then start dictation.`,
    dictationMissing: grade => `No dictation words found for P${grade}.`,
    dictationWordsReady: total => `${total} 好词 in this set`,
    dictationGroupOption: (index, start, end, count) => `Set ${index}: 好词 ${start}-${end} (${count})`,
    dictationScoreText: (correct, attempts) => `${correct}/${attempts} correct`,
    dictationInstruction: "Press Play 好词, write the phrase on paper, then reveal the answer.",
    dictationImportFirst: "Add useful 好词 in the word album first.",
    shownTimes: count => `Shown ${count} time(s). Added to Review Quest with spaced revision.`,
    dictationCorrectFeedback: "Nice. Marked correct and saved to progress.",
    dictationReviewFeedback: "Added to Review Quest for spaced revision.",
    revisionDue: date => `Revision due: ${date}`,
    reviewEmpty: "No review list yet. Miss a quiz question or save words to get recommendations.",
    collectionEmpty: "Your collection is empty. Save useful flashcards from the Learn tab.",
    noWordsMatch: "No words match this filter.",
    wordCount: (count, grade, mode) => `${count} words in P${grade} album · ${mode === "random" ? "random order" : "high-frequency first"}`,
    allLessons: "All lessons", lessonName: lesson => `Lesson ${lesson}`,
    addMoreQuiz: "Add more words to unlock quiz mode.", correctPoints: "Correct. +10 points", reviewWord: word => `Review: ${word.char} (${word.pinyin})`,
    speechNotSupported: "Speech not supported", savedMyHaoci: "Saved My 好词", haociRequired: "好词 cannot be empty.",
    saveFailed: "Save failed. Make sure the local app server is running.",
    findPhrases: "Find phrases for", findAll: count => `Find all ${count} phrase cards that use the hidden target word.`,
    roundCleared: word => `Round cleared. The hidden word was ${word}.`, moreToFind: count => `${count} more matching phrase cards to find.`,
    differentFamily: "Different word family. Keep hunting for the matching context.", roundClearToast: "ROUND CLEAR",
    needFourWords: "Need at least four words with English meanings to start.", finishedScore: score => `Finished. Score: ${score}`,
    bossLocked: "Boss locked", bossUnlock: "Learn 5 words first to unlock the boss challenge.", bossStarted: "Boss round started. Find every target fast.",
    compoFeedback: "Composition Feedback", oralFeedback: "Oral Feedback", unofficialNote: "This is NiHao Buddy practice feedback based on public PSLE-style components, not an official MOE/SEAB mark.",
    scoreStrong: "Strong", scoreDeveloping: "Developing well", scoreNeedsDetail: "Needs more detail", scoreTryAgain: "Try again with more support",
    recordingUnsupported: "Speech recognition is not supported in this browser. You can type the answer and press Mark Oral Answer.",
    recordingNow: "Recording... speak in Chinese. Press Stop Recording when done.", recordingIssue: error => `Recording issue: ${error}. You can type your answer instead.`,
    pasteCsvFirst: "Paste CSV data or upload a CSV file first.", importingData: "Importing data...", importFailed: "Import failed. Check the CSV format.",
    importServerFailed: "Import failed. Make sure the local app server is running.", loadedFile: file => `Loaded ${file}. Press Import Data to save it.`, readFileFailed: "Could not read this CSV file.",
    pasteHelperFirst: "Paste 好词好句 CSV first.", importingHelper: "Importing 好词好句...", skippedRows: count => ` Skipped ${count} row(s).`,
    skippedMismatch: count => ` Skipped ${count} row(s) that did not match the target word.`,
    enterSource: "Enter Chinese source text first.", savingSource: "Saving source...", couldNotSave: "Could not save this source.", addedToWordBase: message => `${message} Also added to Word Base.`,
    sourceEmpty: "No manual sources yet. Add your first useful word, sentence, or paragraph above.", savedLearningSource: "Saved learning source", sourceLoadFailed: "Could not load the Source Library.",
    sampleLoaded: "Sample loaded. Press Import Data to try it.", usingLocalData: "Using local vocabulary data.",
    wordsLearned: "Words Learned", dueForReview: "Due For Review", psleAverage: "PSLE Practice Average", dictationReveals: "Dictation Reveals", suggestedNext: "Suggested Next Step",
    noReveals: "No revealed dictation words yet", noAttempts: "No PSLE attempts yet", noWeakWords: "No weak words yet",
    dashboardSavedWords: count => `Saved words: ${count}`, dashboardReviewFirst: "Review weak words first, then do one oral answer.", dashboardClearQuest: "Clear today’s Daily Quest Path and claim the chest.",
    levelLabel: level => `Level ${level}`, xpToNext: (points, nextLevelXp) => `${points}/${nextLevelXp} XP to next level`, unlockHint: "Earn 50 XP to unlock Buddy Spark.",
    titleChampion: "Chinese Champion", titleQuestMaster: "Quest Master", titlePhraseExplorer: "Phrase Explorer", titleWordRookie: "Word Rookie",
    loginReward: "Daily Login +5 XP", finishQuestFirst: "Finish quest first", chestAlreadyClaimed: "Chest already claimed", chestReward: "CHEST +30 XP",
    profileMeta: user => `${user.description} · P${user.defaultGrade} default`, notLoggedIn: "Not logged in", chooseProfile: "Choose a student profile",
    testPasswords: "Test passwords: enzo123, enya123, or guest123", wrongPassword: "Wrong password. Try enzo123, enya123, or guest123.", enterPasswordFor: name => `Enter the password for ${name}.`,
    loadingWords: grade => `Loading P${grade} words...`, loadingWordQuest: "Loading this learner's word quest...",
    resetConfirm: learner => `Reset all local NiHao Buddy progress for ${learner}?`, thisLearner: "this learner",
    importSavedTo: (message, path) => `${message} Saved to ${path}.`, sourceStatus: (name, active) => `${name}: ${active}`
  },
  zh: {
    interfaceLabel: "界面语言", heroEyebrow: "游戏化华文学习应用",
    heroText: "像玩游戏一样学习华文：累积分数、完成任务、挑战关卡、解锁徽章。",
    dailyQuest: "每日任务", xpRewards: "经验奖励", wordArena: "词语训练场", enterWordAlbum: "进入词语相册",
    readyQuest: "准备开始词语任务了吗？", xpPoints: "经验值", dayStreak: "连续天数", wordsCleared: "已掌握词语",
    studentMode: "学生模式", parentMode: "家长/老师模式",
    home: "首页", questMap: "任务地图", chooseZone: "选择学习区域", activeLearner: "当前学习者", switchUser: "选择 / 切换用户",
    level: "年级", lesson: "课次", search: "搜索", searchPlaceholder: "汉字、拼音、好词",
    bossChallenge: "终极挑战", wordBase: "词语相册", quizArena: "测验训练", reviewQuest: "复习任务",
    dictation: "听写练习", backpack: "我的收藏", speedRun: "限时挑战", podcastRoom: "磨耳朵", psleRoom: "PSLE练习", dataLab: "资料库", dashboard: "学习报告", badges: "徽章",
    dailyQuestPath: "每日任务路线", clearQuest: "完成今天的华文任务",
    questSummary: "学习5个词、完成3题测验、玩限时挑战、进行听力/PSLE练习，然后领取宝箱。",
    startLesson: "开始今日课程", startLessonText: "先学习5个有用词语，再继续完成今天的任务路线。",
    wordAlbumText: "用大卡片学习词语，听朗读、看好词好句。",
    mission1: "任务 1", mission1Text: "浏览词语卡，积累有用的好词好句。",
    mission2: "任务 2", mission2Text: "订正错题，让薄弱词语回来复习。",
    mission3: "任务 3", mission3Text: "保持连续学习，赢取徽章并挑战速度。",
    mission4: "任务 4", mission4Text: "聆听词语内容，进行磨耳朵练习。",
    claimChest: "领取宝箱", enableSound: "开启声音", soundOn: "声音已开", soundBlocked: "再点一次声音", prev: "上一张", next: "下一张",
    pauseAuto: "暂停自动播放", resumeAuto: "继续自动播放", random: "随机播放", highFrequency: "高频优先",
    albumHint: "先点击开启声音。自动播放会朗读词语、好词和好句。",
    listen: "朗读", audio: "外部音频", save: "收藏", saved: "已收藏", know: "会了", quiz: "测验", editHaoci: "编辑好词", myHaoci: "我的好词",
    newQuestion: "换一题", question: "题目", loadingQuiz: "正在载入测验...",
    quizTitle: "测验练习", quizIntro: "根据提示选择正确的汉字，建立连续答对纪录。",
    saveHaoci: "保存好词", cancel: "取消",
    dictationTitle: "听写练习", dictationPrompt: "先听词语，在纸上写，再自己核对", newWord: "开始听写",
    playWord: "播放好词", replaySlowly: "慢速重播", reveal: "显示答案", wroteCorrectly: "我写对了", needReview: "加入复习",
    reviewTitle: "智能复习", reviewIntro: "答错、显示答案或收藏的词语会出现在这里。", refresh: "刷新", practice: "练习",
    collectionTitle: "我的收藏", collectionIntro: "收藏起来，方便个人复习。", clear: "清空",
    speedTitle: "好词搜寻挑战", speedIntro: "根据提示，在限时内找出所有含有目标字词的词语卡。",
    start: "开始", target: "目标", score: "分数", time: "时间",
    podcastTitle: "磨耳朵听力室", podcastIntro: "磨耳朵：听好词好句、口试表达句和短篇作文示范。",
    newPractice: "换一组", podcastQuest: "PSLE听力任务", podcastHeading: "听有用的好词好句和短篇示范。",
    podcastNote: "这里使用浏览器朗读，不保存音频文件，所以不会占用太多空间。", playPractice: "播放练习", stop: "停止",
    morePractice: "更多PSLE练习", morePracticeIntro: "新加坡口试和作文资源，可作为额外练习参考。",
    pslePrepDesc: "PSLE风格华文朗读和看图/视频会话练习。",
    claceDesc: "新加坡PSLE华文作文反馈、词汇和改写练习。",
    phraseResourceDesc: "作文好词好句参考，可用来建立个人词库。",
    officialExamDesc: "官方考试格式、规则和历年试卷购买渠道。",
    formatDesc: "官方PSLE考试格式页面，可核对最新结构。",
    oralResourceDesc: "新加坡风格口试练习参考。",
    psleTitle: "PSLE练习室", psleIntro: "原创PSLE风格练习。真实历年试卷应从官方渠道购买。",
    newSet: "换一组", compoPractice: "作文练习", oralPractice: "口试练习", markCompo: "批改作文", markOral: "批改口试答案",
    playPassage: "播放短文", playQuestion: "播放问题", playModel: "播放示范答案", stopAudio: "停止声音", recordAnswer: "录音作答", stopRecording: "停止录音",
    modelAnswer: "示范答案", compoPlaceholder: "在这里输入你的华文作文……", oralPlaceholder: "你的口头答案文字会出现在这里，也可以手动输入。",
    dataLabTitle: "资料导入区", dataLabIntro: "把新的华文学习资料导入本地数据库和游戏练习。", useSample: "使用范例",
    manualSourceTitle: "手动资料录入", manualSourceIntro: "看到有用的字、词语、句子或段落时，可以逐步加入学习资料库。",
    type: "类型", word: "字词", phrase: "词语", sentence: "句子", paragraph: "段落", levelCollection: "年级 / 分类",
    theme: "主题", pinyin: "拼音", meaningUse: "意思 / 用法", chineseSource: "华文资料", studyNote: "学习备注",
    saveSource: "保存资料", sourceLibrary: "资料库", sourceLibraryIntro: "最近保存的学习资料；字词和词语也会加入练习游戏。",
    helperImportTitle: "好词好句导入", helperImportIntro: "粘贴有授权的词典笔记或你自己整理的资料。系统只接受好词和好句都包含目标字词的行。",
    defaultLevel: "默认年级", pasteHelperCsv: "粘贴好词好句CSV", importHelper: "导入好词好句",
    csvFormat: "CSV格式", csvIntro: "需要标题行。支持 char、word、hanzi、汉字、pinyin、meaning、grade 等栏位。",
    importSaveNote: "导入后会保存到 data/custom_imports.csv；NiHao Buddy 重启时会重新写入 SQLite。",
    uploadCsv: "上传CSV", pasteCsv: "粘贴CSV资料", importData: "导入资料",
    parentDashboard: "家长/老师报告", dashboardIntro: "快速查看学习进度、薄弱点和建议复习方向。",
    progressTitle: "学习进度", progressIntro: "保存在这个浏览器里的本地学习记录。", resetProgress: "重置进度",
    stats: "统计", quizzesCompleted: "完成测验", correctAnswers: "答对题数", dailyStreakLabel: "连续学习天数",
    quizComboLabel: "连续答对", storiesListened: "听力练习次数", mistakesToReview: "待复习错词", savedWords: "收藏词语",
    levelUnlocks: "等级与解锁", noBadges: "还没有徽章，继续学习就会解锁！",
    claimed: "已领取", lockedChest: "宝箱未解锁",
    dictationGroupLabel: "听写词组",
    dictationSourceReady: grade => `请选择 P${grade} 的一组好词，然后开始听写。`,
    dictationMissing: grade => `P${grade} 还没有找到可听写的好词。`,
    dictationWordsReady: total => `本组 ${total} 个好词`,
    dictationGroupOption: (index, start, end, count) => `第 ${index} 组：第 ${start}-${end} 个好词（${count}个）`,
    dictationScoreText: (correct, attempts) => `听写正确 ${correct}/${attempts}`,
    dictationInstruction: "点击播放好词，在纸上写完整词语后，再显示答案核对。",
    dictationImportFirst: "请先在词语相册加入可用的好词。",
    shownTimes: count => `已显示答案 ${count} 次，已加入遗忘曲线复习。`,
    dictationCorrectFeedback: "很好，已标记正确并保存到进度。",
    dictationReviewFeedback: "已加入复习任务，并按遗忘曲线安排复习。",
    revisionDue: date => `复习日期：${date}`,
    reviewEmpty: "还没有复习清单。答错、显示听写答案或收藏词语后，这里会自动推荐。",
    collectionEmpty: "收藏夹还是空的。可以在词语相册里收藏有用的卡片。",
    noWordsMatch: "没有符合筛选条件的词语。",
    wordCount: (count, grade, mode) => `${count} 个词语在 P${grade} 相册 · ${mode === "random" ? "随机顺序" : "高频优先"}`,
    allLessons: "全部课次", lessonName: lesson => `第 ${lesson} 课`,
    addMoreQuiz: "词语数量不足，暂时不能开始测验。", correctPoints: "答对了，+10分", reviewWord: word => `复习：${word.char}（${word.pinyin}）`,
    speechNotSupported: "这个浏览器不支持朗读", savedMyHaoci: "已保存我的好词", haociRequired: "好词不能为空。",
    saveFailed: "保存失败，请确认本地应用服务器正在运行。",
    findPhrases: "寻找相关词语", findAll: count => `找出全部 ${count} 张含有目标字词的词语卡。`,
    roundCleared: word => `本轮完成，隐藏词语是「${word}」。`, moreToFind: count => `还要找 ${count} 张相关词语卡。`,
    differentFamily: "这张不是同一个目标字词，请继续找相关语境。", roundClearToast: "本轮完成",
    needFourWords: "至少需要4个带英文提示的词语才能开始。", finishedScore: score => `挑战结束，得分：${score}`,
    bossLocked: "终极挑战未解锁", bossUnlock: "先学会5个词语，才能解锁终极挑战。", bossStarted: "终极挑战开始，请快速找出所有目标词语。",
    compoFeedback: "作文反馈", oralFeedback: "口试反馈", unofficialNote: "这是 NiHao Buddy 根据公开PSLE练习方向提供的练习反馈，不是MOE/SEAB官方评分。",
    scoreStrong: "表现不错", scoreDeveloping: "正在进步", scoreNeedsDetail: "需要更多细节", scoreTryAgain: "再试一次，多给一些内容",
    recordingUnsupported: "这个浏览器不支持语音识别。你可以手动输入答案，再点击批改口试答案。",
    recordingNow: "正在录音……请用华文回答。完成后点击停止录音。", recordingIssue: error => `录音出现问题：${error}。你可以改为手动输入答案。`,
    pasteCsvFirst: "请先粘贴CSV资料或上传CSV文件。", importingData: "正在导入资料……", importFailed: "导入失败，请检查CSV格式。",
    importServerFailed: "导入失败，请确认本地应用服务器正在运行。", loadedFile: file => `已读取 ${file}，点击导入资料保存。`, readFileFailed: "无法读取这个CSV文件。",
    pasteHelperFirst: "请先粘贴好词好句CSV。", importingHelper: "正在导入好词好句……", skippedRows: count => ` 已跳过 ${count} 行。`,
    skippedMismatch: count => ` 已跳过 ${count} 行，因为没有包含目标字词。`,
    enterSource: "请先输入华文资料。", savingSource: "正在保存资料……", couldNotSave: "无法保存这份资料。", addedToWordBase: message => `${message} 已同时加入词语相册。`,
    sourceEmpty: "还没有手动资料。先在上方加入一个有用的字、句子或段落吧。", savedLearningSource: "已保存的学习资料", sourceLoadFailed: "无法载入资料库。",
    sampleLoaded: "范例已载入，点击导入资料即可试用。", usingLocalData: "正在使用本地词汇资料。",
    wordsLearned: "已掌握词语", dueForReview: "今日应复习", psleAverage: "PSLE练习平均", dictationReveals: "听写显示答案次数", suggestedNext: "下一步建议",
    noReveals: "还没有听写显示答案记录", noAttempts: "还没有PSLE练习记录", noWeakWords: "暂时没有薄弱词语",
    dashboardSavedWords: count => `收藏词语：${count}`, dashboardReviewFirst: "先复习薄弱词语，再完成一次口试作答。", dashboardClearQuest: "完成今天的每日任务路线，然后领取宝箱。",
    levelLabel: level => `等级 ${level}`, xpToNext: (points, nextLevelXp) => `${points}/${nextLevelXp} 经验值，继续升级`, unlockHint: "获得50经验值即可解锁 Buddy Spark。",
    titleChampion: "华文小冠军", titleQuestMaster: "任务高手", titlePhraseExplorer: "好词探索者", titleWordRookie: "词语新手",
    loginReward: "每日登录 +5 经验值", finishQuestFirst: "请先完成今天的任务", chestAlreadyClaimed: "今天已经领取宝箱", chestReward: "宝箱 +30 经验值",
    profileMeta: user => `${user.description} · 默认P${user.defaultGrade}`, notLoggedIn: "尚未登录", chooseProfile: "请选择学习者",
    testPasswords: "测试密码：enzo123、enya123 或 guest123", wrongPassword: "密码不正确，请试 enzo123、enya123 或 guest123。", enterPasswordFor: name => `请输入 ${name} 的密码。`,
    loadingWords: grade => `正在载入 P${grade} 词语……`, loadingWordQuest: "正在载入这个学习者的词语任务……",
    resetConfirm: learner => `确定要重置 ${learner} 的本地学习进度吗？`, thisLearner: "这位学习者",
    importSavedTo: (message, path) => `${message} 已保存到 ${path}。`, sourceStatus: (name, active) => `${name}：${active}`
  }
};

function defaultProgress() {
  return {
    points: 0,
    streak: 0,
    badges: [],
    completedQuizzes: 0,
    correctAnswers: 0,
    dictationAttempts: 0,
    dictationCorrect: 0,
    dictationReveals: {},
    quizCombo: 0,
    listenedStories: 0,
    challengePlays: 0,
    lastActiveDate: "",
    lastLoginRewardDate: "",
    claimedQuestDate: "",
    dailyQuest: { date: "", learned: 0, quizzes: 0, speedRuns: 0, listening: 0 },
    psleAttempts: [],
    unlockedThemes: [],
    unlockedAvatars: [],
    mastered: {},
    mistakes: {},
    saved: {}
  };
}

const state = {
  grade: new URLSearchParams(window.location.search).get("grade") || "1",
  uiLanguage: localStorage.getItem(UI_LANGUAGE_KEY) || "en",
  appMode: localStorage.getItem(APP_MODE_KEY) || "student",
  currentUser: null,
  selectedLoginUser: "enzo",
  words: [],
  dictationWords: [],
  dictationCurrent: null,
  dictationGroupIndex: 0,
  filteredWords: [],
  quizAnswer: null,
  challengeAnswer: null,
  challengeWords: [],
  challengeTargetsLeft: 0,
  challengeScore: 0,
  challengeTime: CHALLENGE_DURATION_SECONDS,
  challengeTimer: null,
  albumIndex: 0,
  albumMode: "frequency",
  albumPlaying: true,
  albumSoundEnabled: false,
  albumTimer: null,
  albumSpeechTimers: [],
  activeAudio: null,
  helperEditingWord: null,
  loadToken: 0,
  podcastWords: [],
  podcastStory: "",
  psleSet: null,
  recognition: null,
  isRecording: false,
  progress: defaultProgress()
};

const els = {
  loginScreen: document.getElementById("login-screen"),
  loginButton: document.getElementById("login-button"),
  passwordInput: document.getElementById("password-input"),
  loginFeedback: document.getElementById("login-feedback"),
  rewardToast: document.getElementById("reward-toast"),
  profileName: document.getElementById("profile-name"),
  profileMeta: document.getElementById("profile-meta"),
  logoutButton: document.getElementById("logout-button"),
  uiLanguageSelect: document.getElementById("ui-language-select"),
  sourceStatus: document.getElementById("source-status"),
  gradeSelect: document.getElementById("grade-select"),
  lessonFilter: document.getElementById("lesson-filter"),
  searchInput: document.getElementById("search-input"),
  flashcards: document.getElementById("flashcards"),
  wordCount: document.getElementById("word-count"),
  albumSoundButton: document.getElementById("album-sound-button"),
  albumPrevButton: document.getElementById("album-prev-button"),
  albumPlayButton: document.getElementById("album-play-button"),
  albumNextButton: document.getElementById("album-next-button"),
  albumRandomButton: document.getElementById("album-random-button"),
  albumFrequencyButton: document.getElementById("album-frequency-button"),
  helperEditor: document.getElementById("helper-editor"),
  helperEditorTitle: document.getElementById("helper-editor-title"),
  helperPhraseInput: document.getElementById("helper-phrase-input"),
  helperSentenceInput: document.getElementById("helper-sentence-input"),
  helperEditorFeedback: document.getElementById("helper-editor-feedback"),
  quizQuestion: document.getElementById("quiz-question"),
  quizOptions: document.getElementById("quiz-options"),
  quizFeedback: document.getElementById("quiz-feedback"),
  reviewList: document.getElementById("review-list"),
  collectionList: document.getElementById("collection-list"),
  challengeTarget: document.getElementById("challenge-target"),
  challengeScore: document.getElementById("challenge-score"),
  challengeTime: document.getElementById("challenge-time"),
  challengeOptions: document.getElementById("challenge-options"),
  challengeFeedback: document.getElementById("challenge-feedback"),
  dictationSource: document.getElementById("dictation-source"),
  dictationGroupSelect: document.getElementById("dictation-group-select"),
  dictationProgress: document.getElementById("dictation-progress"),
  dictationScore: document.getElementById("dictation-score"),
  dictationAnswerCard: document.getElementById("dictation-answer-card"),
  dictationFeedback: document.getElementById("dictation-feedback"),
  podcastWords: document.getElementById("podcast-words"),
  podcastStory: document.getElementById("podcast-story"),
  psleCompoTitle: document.getElementById("psle-compo-title"),
  psleCompoPrompt: document.getElementById("psle-compo-prompt"),
  psleCompoAnswer: document.getElementById("psle-compo-answer"),
  psleCompoFeedback: document.getElementById("psle-compo-feedback"),
  psleOralTitle: document.getElementById("psle-oral-title"),
  psleReadingPassage: document.getElementById("psle-reading-passage"),
  psleOralQuestion: document.getElementById("psle-oral-question"),
  psleModelAnswer: document.getElementById("psle-model-answer"),
  psleOralAnswer: document.getElementById("psle-oral-answer"),
  psleOralFeedback: document.getElementById("psle-oral-feedback"),
  importGrade: document.getElementById("import-grade"),
  importFile: document.getElementById("import-file"),
  importText: document.getElementById("import-text"),
  importFeedback: document.getElementById("import-feedback"),
  helperImportGrade: document.getElementById("helper-import-grade"),
  helperImportText: document.getElementById("helper-import-text"),
  helperImportFeedback: document.getElementById("helper-import-feedback"),
  sourceType: document.getElementById("source-type"),
  sourceGrade: document.getElementById("source-grade"),
  sourceTheme: document.getElementById("source-theme"),
  sourcePinyin: document.getElementById("source-pinyin"),
  sourceMeaning: document.getElementById("source-meaning"),
  sourceContent: document.getElementById("source-content"),
  sourceNote: document.getElementById("source-note"),
  sourceFeedback: document.getElementById("source-feedback"),
  sourceLibraryList: document.getElementById("source-library-list"),
  questLearnStep: document.getElementById("quest-learn-step"),
  questQuizStep: document.getElementById("quest-quiz-step"),
  questSpeedStep: document.getElementById("quest-speed-step"),
  questListenStep: document.getElementById("quest-listen-step"),
  dailyQuestSummary: document.getElementById("daily-quest-summary"),
  claimDailyRewardButton: document.getElementById("claim-daily-reward-button"),
  levelCard: document.getElementById("level-card"),
  unlocksList: document.getElementById("unlocks-list"),
  dashboardGrid: document.getElementById("dashboard-grid"),
  missionWordBar: document.getElementById("mission-word-bar"),
  missionWordStatus: document.getElementById("mission-word-status"),
  missionReviewBar: document.getElementById("mission-review-bar"),
  missionReviewStatus: document.getElementById("mission-review-status"),
  missionChallengeBar: document.getElementById("mission-challenge-bar"),
  missionChallengeStatus: document.getElementById("mission-challenge-status"),
  missionListenBar: document.getElementById("mission-listen-bar"),
  missionListenStatus: document.getElementById("mission-listen-status"),
  points: document.getElementById("points"),
  streak: document.getElementById("streak"),
  masteredCount: document.getElementById("mastered-count"),
  completedQuizzes: document.getElementById("completed-quizzes"),
  correctAnswers: document.getElementById("correct-answers"),
  dailyStreak: document.getElementById("daily-streak"),
  quizCombo: document.getElementById("quiz-combo"),
  storiesListened: document.getElementById("stories-listened"),
  mistakeCount: document.getElementById("mistake-count"),
  savedCount: document.getElementById("saved-count"),
  badges: document.getElementById("badges")
};

function wordKey(word) {
  return `${word.grade}:${word.char}:${word.meaning}`;
}

function uiText(key) {
  return UI_TEXT[state.uiLanguage]?.[key] || UI_TEXT.en[key] || key;
}

function uiValue(key, ...args) {
  const value = uiText(key);
  return typeof value === "function" ? value(...args) : value;
}

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function staticDataUrl(fileName) {
  return new URL(`../data/${fileName}`, window.location.href).href;
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load ${url}`);
  return response.text();
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some(value => value.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    if (row.some(value => value.trim())) rows.push(row);
  }
  if (!rows.length) return [];

  const headers = rows[0].map(header => header.trim());
  return rows.slice(1).map(values => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = (values[index] || "").trim();
    });
    return item;
  });
}

function parseJsonLines(text) {
  return text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => JSON.parse(line));
}

async function loadStaticHelpers() {
  const [helperText, phraseText] = await Promise.all([
    fetchText(staticDataUrl("word_helpers.jsonl")).catch(() => ""),
    fetchText(staticDataUrl("curated_phrase_bank.jsonl")).catch(() => "")
  ]);
  return {
    helpers: helperText ? parseJsonLines(helperText) : [],
    phraseBank: phraseText ? parseJsonLines(phraseText) : []
  };
}

function applyStaticHelper(word, helpers, phraseBank) {
  const direct = helpers.find(item =>
    String(item.grade || "") === String(word.grade || state.grade) && item.char === word.char
  );
  if (direct) {
    return {
      ...word,
      meaning: direct.meaning || word.meaning,
      phrase: direct.phrase || word.phrase || word.char,
      association: direct.phrase ? `好词：${direct.phrase}` : word.association,
      good_sentence: direct.sentence ? `好句：${direct.sentence}` : word.good_sentence,
      helper_english: direct.english || "",
      helper_source: "static"
    };
  }

  const gradeNumber = Number(word.grade || state.grade);
  const bank = phraseBank.find(item => {
    const minGrade = Number(item.min_grade || 1);
    const maxGrade = Number(item.max_grade || 6);
    return gradeNumber >= minGrade && gradeNumber <= maxGrade && String(item.targets || "").includes(word.char);
  });
  if (bank) {
    return {
      ...word,
      phrase: bank.phrase || word.phrase || word.char,
      association: bank.phrase ? `好词：${bank.phrase}` : word.association,
      good_sentence: bank.sentence ? `好句：${bank.sentence}` : word.good_sentence,
      helper_source: "static"
    };
  }

  return {
    ...word,
    phrase: word.phrase || word.char,
    association: word.association || "",
    good_sentence: word.good_sentence || ""
  };
}

async function loadStaticWords(grade) {
  const [csvText, helperData] = await Promise.all([
    fetchText(staticDataUrl(`grade${grade}.csv`)),
    loadStaticHelpers()
  ]);
  return parseCsv(csvText).map(item => applyStaticHelper({
    char: item.char || item.word || "",
    pinyin: item.pinyin || "",
    meaning: item.meaning || "",
    grade: String(item.grade || grade),
    phrase: item.phrase || "",
    association: item.association || "",
    good_sentence: item.good_sentence || ""
  }, helperData.helpers, helperData.phraseBank)).filter(word => word.char);
}

async function loadStaticGrades() {
  const counts = await Promise.all(STATIC_GRADES.map(async grade => {
    try {
      const text = await fetchText(staticDataUrl(`grade${grade}.csv`));
      return { grade, total: parseCsv(text).length };
    } catch {
      return { grade, total: 0 };
    }
  }));
  return counts.filter(item => item.total > 0);
}

function applyMode() {
  document.body.dataset.appMode = state.appMode;
  document.querySelectorAll(".mode-button").forEach(button => {
    const isActive = button.dataset.modeChoice === state.appMode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const activeTab = document.querySelector(".tab-panel.active")?.id.replace("-panel", "");
  const activeButton = activeTab ? document.querySelector(`.tab-button[data-tab="${activeTab}"]`) : null;
  if (activeButton?.dataset.mode && activeButton.dataset.mode !== state.appMode) {
    showTab("home", { scroll: false });
  }
}

function applyLanguage() {
  document.documentElement.lang = state.uiLanguage === "zh" ? "zh-CN" : "en";
  if (els.uiLanguageSelect) els.uiLanguageSelect.value = state.uiLanguage;

  setText(".hero-copy .eyebrow", uiText("heroEyebrow"));
  setText(".hero-text", uiText("heroText"));
  const questTags = document.querySelectorAll(".quest-tags span");
  ["dailyQuest", "xpRewards", "wordArena", "podcastRoom"].forEach((key, index) => {
    if (questTags[index]) questTags[index].textContent = uiText(key);
  });
  setText(".mascot-card > span", uiText("readyQuest"));
  setText("#hero-word-album-button", uiText("enterWordAlbum"));
  setText(".header-stats div:nth-child(1) small", uiText("xpPoints"));
  setText(".header-stats div:nth-child(2) small", uiText("dayStreak"));
  setText(".header-stats div:nth-child(3) small", uiText("wordsCleared"));
  setText(".sidebar-title strong", uiText("questMap"));
  setText(".sidebar-title span", uiText("chooseZone"));
  setText("#student-mode-button", uiText("studentMode"));
  setText("#parent-mode-button", uiText("parentMode"));
  setText(".language-switcher label", uiText("interfaceLabel"));
  setText(".profile-panel span", uiText("activeLearner"));
  setText("#logout-button", uiText("switchUser"));
  setText("label[for='grade-select']", uiText("level"));
  setText("label[for='lesson-filter']", uiText("lesson"));
  setText("label[for='search-input']", uiText("search"));
  els.searchInput.placeholder = uiText("searchPlaceholder");
  setText("#boss-challenge-button", uiText("bossChallenge"));

  const tabNames = ["home", "wordBase", "quizArena", "dictation", "reviewQuest", "backpack", "speedRun", "podcastRoom", "badges", "psleRoom", "dataLab", "dashboard"];
  document.querySelectorAll(".tabs .tab-button").forEach((button, index) => {
    const icon = button.querySelector("span")?.outerHTML || "";
    button.innerHTML = `${icon} ${uiText(tabNames[index])}`;
  });

  setText(".daily-quest-panel .eyebrow", uiText("dailyQuestPath"));
  setText(".daily-quest-panel h2", uiText("clearQuest"));
  if (els.dailyQuestSummary) els.dailyQuestSummary.textContent = uiText("questSummary");
  if (els.claimDailyRewardButton && els.claimDailyRewardButton.textContent !== "Claimed") {
    els.claimDailyRewardButton.textContent = uiText("claimChest");
  }

  document.querySelectorAll(".feature-card").forEach(card => {
    const titleKey = card.dataset.titleKey;
    const descKey = card.dataset.descKey;
    if (titleKey) card.querySelector("strong").textContent = uiText(titleKey);
    if (descKey) card.querySelector("span").textContent = uiText(descKey);
  });
  applyMode();
  setText("#learn-panel .section-title h2", uiText("wordBase"));
  setText("#album-sound-button", state.albumSoundEnabled ? uiText("soundOn") : uiText("enableSound"));
  setText("#album-prev-button", uiText("prev"));
  setText("#album-next-button", uiText("next"));
  setText("#album-random-button", uiText("random"));
  setText("#album-frequency-button", uiText("highFrequency"));
  if (els.albumPlayButton) els.albumPlayButton.textContent = state.albumPlaying ? uiText("pauseAuto") : uiText("resumeAuto");
  setText(".album-hint", uiText("albumHint"));

  const staticText = {
    "#new-quiz-button": "newQuestion",
    "#quiz-panel .section-title h2": "quizTitle",
    "#quiz-panel .section-title p": "quizIntro",
    "#quiz-panel .prompt-label": "question",
    "#save-helper-button": "saveHaoci",
    "#cancel-helper-button": "cancel",
    "#dictation-panel .section-title h2": "dictationTitle",
    "#new-dictation-button": "newWord",
    "#dictation-panel .prompt-label": "dictationPrompt",
    "label[for='dictation-group-select']": "dictationGroupLabel",
    "#play-dictation-button": "playWord",
    "#replay-dictation-button": "replaySlowly",
    "#reveal-dictation-button": "reveal",
    "#dictation-correct-button": "wroteCorrectly",
    "#dictation-review-button": "needReview",
    "#next-dictation-button": "next",
    "#review-panel .section-title h2": "reviewTitle",
    "#review-panel .section-title p": "reviewIntro",
    "#refresh-review-button": "refresh",
    "#collection-panel .section-title h2": "collectionTitle",
    "#collection-panel .section-title p": "collectionIntro",
    "#clear-collection-button": "clear",
    "#challenge-panel .section-title h2": "speedTitle",
    "#challenge-panel .section-title p": "speedIntro",
    "#start-challenge-button": "start",
    "#podcast-panel > .section-title h2": "podcastTitle",
    "#podcast-panel > .section-title p": "podcastIntro",
    "#new-podcast-button": "newPractice",
    "#podcast-panel .podcast-card .prompt-label": "podcastQuest",
    "#podcast-panel .podcast-card h3": "podcastHeading",
    ".podcast-note": "podcastNote",
    "#play-podcast-button": "playPractice",
    "#stop-podcast-button": "stop",
    ".resource-title h2": "morePractice",
    ".resource-title p": "morePracticeIntro",
    "#podcast-panel .resource-grid a:nth-child(1) span": "pslePrepDesc",
    "#podcast-panel .resource-grid a:nth-child(2) span": "claceDesc",
    "#podcast-panel .resource-grid a:nth-child(3) span": "phraseResourceDesc",
    "#psle-panel > .section-title h2": "psleTitle",
    "#psle-panel > .section-title p": "psleIntro",
    "#new-psle-button": "newSet",
    "#psle-panel .psle-card:nth-child(1) .prompt-label": "compoPractice",
    "#psle-panel .psle-card:nth-child(2) .prompt-label": "oralPractice",
    "#mark-compo-button": "markCompo",
    "#play-oral-passage-button": "playPassage",
    "#play-oral-question-button": "playQuestion",
    "#play-model-answer-button": "playModel",
    "#stop-oral-audio-button": "stopAudio",
    "#record-oral-button": "recordAnswer",
    "#stop-recording-button": "stopRecording",
    ".model-answer-box summary": "modelAnswer",
    "#mark-oral-button": "markOral",
    "#psle-panel .psle-resource-grid a:nth-child(1) span": "officialExamDesc",
    "#psle-panel .psle-resource-grid a:nth-child(2) span": "formatDesc",
    "#psle-panel .psle-resource-grid a:nth-child(3) span": "oralResourceDesc",
    "#import-panel > .section-title h2": "dataLabTitle",
    "#import-panel > .section-title p": "dataLabIntro",
    "#sample-import-button": "useSample",
    ".manual-source-card .compact-title h2": "manualSourceTitle",
    ".manual-source-card .compact-title p": "manualSourceIntro",
    "label[for='source-type']": "type",
    "label[for='source-grade']": "levelCollection",
    "label[for='source-theme']": "theme",
    "label[for='source-pinyin']": "pinyin",
    "label[for='source-meaning']": "meaningUse",
    "label[for='source-content']": "chineseSource",
    "label[for='source-note']": "studyNote",
    "#save-source-button": "saveSource",
    "#listen-source-button": "listen",
    ".source-library-card .compact-title h2": "sourceLibrary",
    ".source-library-card .compact-title p": "sourceLibraryIntro",
    "#refresh-sources-button": "refresh",
    ".import-card:nth-of-type(3) .import-guide h3": "helperImportTitle",
    ".import-card:nth-of-type(3) .import-guide p": "helperImportIntro",
    "label[for='helper-import-grade']": "defaultLevel",
    "label[for='helper-import-text']": "pasteHelperCsv",
    "#import-helper-button": "importHelper",
    ".import-card:nth-of-type(4) .import-guide h3": "csvFormat",
    ".import-card:nth-of-type(4) .import-guide p:first-of-type": "csvIntro",
    ".import-card:nth-of-type(4) .import-guide p:last-of-type": "importSaveNote",
    "label[for='import-grade']": "defaultLevel",
    "label[for='import-file']": "uploadCsv",
    "label[for='import-text']": "pasteCsv",
    "#import-data-button": "importData",
    "#dashboard-panel .section-title h2": "parentDashboard",
    "#dashboard-panel .section-title p": "dashboardIntro",
    "#refresh-dashboard-button": "refresh",
    "#progress-panel .section-title h2": "progressTitle",
    "#progress-panel .section-title p": "progressIntro",
    "#reset-progress-button": "resetProgress",
    "#progress-panel article:nth-child(1) h3": "stats",
    "#progress-panel article:nth-child(2) h3": "badges",
    "#progress-panel article:nth-child(3) h3": "levelUnlocks"
  };
  Object.entries(staticText).forEach(([selector, key]) => setText(selector, uiText(key)));

  const challengeLabels = document.querySelectorAll(".challenge-board small");
  ["target", "score", "time"].forEach((key, index) => {
    if (challengeLabels[index]) challengeLabels[index].textContent = uiText(key);
  });

  const progressLabels = document.querySelectorAll(".stats-list dt");
  ["quizzesCompleted", "correctAnswers", "dailyStreakLabel", "quizComboLabel", "storiesListened", "mistakesToReview", "savedWords"].forEach((key, index) => {
    if (progressLabels[index]) progressLabels[index].textContent = uiText(key);
  });

  const sourceTypeOptions = els.sourceType?.options || [];
  ["word", "phrase", "sentence", "paragraph"].forEach((key, index) => {
    if (sourceTypeOptions[index]) sourceTypeOptions[index].textContent = uiText(key);
  });

  if (els.psleCompoAnswer) els.psleCompoAnswer.placeholder = uiText("compoPlaceholder");
  if (els.psleOralAnswer) els.psleOralAnswer.placeholder = uiText("oralPlaceholder");
}

function userStorageKey() {
  return state.currentUser
    ? `${STORAGE_KEY}:${state.currentUser.username}`
    : STORAGE_KEY;
}

function loadProgress() {
  state.progress = defaultProgress();
  const saved = localStorage.getItem(userStorageKey());
  if (!saved) return;

  try {
    state.progress = { ...defaultProgress(), ...JSON.parse(saved) };
  } catch (error) {
    console.warn("Could not load saved progress", error);
  }
}

function saveProgress() {
  if (!state.currentUser) return;
  localStorage.setItem(userStorageKey(), JSON.stringify(state.progress));
}

function setActiveProfile(user) {
  state.currentUser = user;
  els.profileName.textContent = user.displayName;
  els.profileMeta.textContent = uiValue("profileMeta", user);
  els.loginScreen.classList.add("hidden");
  document.body.classList.remove("login-open");
}

function showLogin() {
  stopSpeaking();
  clearInterval(state.challengeTimer);
  clearTimeout(state.albumTimer);
  state.currentUser = null;
  state.progress = defaultProgress();
  els.profileName.textContent = uiText("notLoggedIn");
  els.profileMeta.textContent = uiText("chooseProfile");
  els.passwordInput.value = "";
  els.loginFeedback.textContent = uiText("testPasswords");
  els.loginScreen.classList.remove("hidden");
  document.body.classList.add("login-open");
  renderProgress();
}

async function activateProfile(username, options = {}) {
  const user = USERS[username];
  if (!user) return;

  setActiveProfile(user);
  localStorage.setItem(CURRENT_USER_KEY, username);
  state.grade = options.keepCurrentGrade ? state.grade : user.defaultGrade;
  window.history.replaceState({}, "", `?grade=${state.grade}`);
  if (els.gradeSelect.options.length) els.gradeSelect.value = state.grade;
  loadProgress();
  maybeGiveLoginReward();
  renderProgress();
  await loadWords();
}

function loginSelectedProfile() {
  const user = USERS[state.selectedLoginUser];
  const password = els.passwordInput.value.trim();

  if (!user || password !== user.password) {
    els.loginFeedback.textContent = uiText("wrongPassword");
    els.passwordInput.focus();
    return;
  }

  activateProfile(user.username);
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function showRewardToast(message) {
  if (!els.rewardToast) return;

  els.rewardToast.textContent = message;
  els.rewardToast.classList.remove("show");
  els.rewardToast.style.opacity = "0";
  els.rewardToast.style.transform = "translate(-50%, -20px) scale(0.92)";
  void els.rewardToast.offsetWidth;
  els.rewardToast.classList.add("show");
  els.rewardToast.style.opacity = "1";
  els.rewardToast.style.transform = "translate(-50%, 0) scale(1)";
  clearTimeout(showRewardToast.timer);
  showRewardToast.timer = setTimeout(() => {
    els.rewardToast.classList.remove("show");
    els.rewardToast.style.opacity = "0";
    els.rewardToast.style.transform = "translate(-50%, -20px) scale(0.92)";
  }, 1300);
}

function daysBetween(firstDate, secondDate) {
  const first = new Date(`${firstDate}T00:00:00`);
  const second = new Date(`${secondDate}T00:00:00`);
  return Math.round((second - first) / 86400000);
}

function dateAfter(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function xpLevel(points = state.progress.points) {
  return Math.floor(points / 100) + 1;
}

function learnerTitle() {
  const level = xpLevel();
  if (level >= 8) return uiText("titleChampion");
  if (level >= 5) return uiText("titleQuestMaster");
  if (level >= 3) return uiText("titlePhraseExplorer");
  return uiText("titleWordRookie");
}

function unlockedRewards() {
  const points = state.progress.points;
  return [
    points >= 50 ? (state.uiLanguage === "zh" ? "头像：Buddy Spark" : "Avatar: Buddy Spark") : null,
    points >= 120 ? (state.uiLanguage === "zh" ? "主题：糖果任务" : "Theme: Candy Quest") : null,
    points >= 220 ? (state.uiLanguage === "zh" ? "宝物：金色铅笔" : "Treasure: Golden Pencil") : null,
    points >= 350 ? (state.uiLanguage === "zh" ? "称号：PSLE探索者" : "Title: PSLE Explorer") : null,
    (state.progress.streak || 0) >= 3 ? (state.uiLanguage === "zh" ? "光环：连续学习火焰" : "Aura: Streak Flame") : null,
    (state.progress.quizCombo || 0) >= 5 ? (state.uiLanguage === "zh" ? "徽章外观：连击之星" : "Badge Skin: Combo Star") : null
  ].filter(Boolean);
}

function dailyQuestStats() {
  ensureDailyQuest();
  return state.progress.dailyQuest;
}

function ensureDailyQuest() {
  const today = todayKey();
  if (!state.progress.dailyQuest || state.progress.dailyQuest.date !== today) {
    state.progress.dailyQuest = { date: today, learned: 0, quizzes: 0, speedRuns: 0, listening: 0 };
  }
}

function addDailyQuestProgress(key, amount = 1) {
  ensureDailyQuest();
  state.progress.dailyQuest[key] = (state.progress.dailyQuest[key] || 0) + amount;
}

function isDailyQuestComplete() {
  const stats = dailyQuestStats();
  return stats.learned >= 5 && stats.quizzes >= 3 && stats.speedRuns >= 1 && stats.listening >= 1;
}

function maybeGiveLoginReward() {
  const today = todayKey();
  if (state.progress.lastLoginRewardDate === today) return;
  state.progress.lastLoginRewardDate = today;
  state.progress.unlockedThemes = state.progress.unlockedThemes || [];
  addPoints(5);
  showRewardToast(uiText("loginReward"));
  saveProgress();
}

function claimDailyReward() {
  const today = todayKey();
  if (!isDailyQuestComplete()) {
    showRewardToast(uiText("finishQuestFirst"));
    return;
  }
  if (state.progress.claimedQuestDate === today) {
    showRewardToast(uiText("chestAlreadyClaimed"));
    return;
  }
  state.progress.claimedQuestDate = today;
  addPoints(30);
  if (!state.progress.badges.includes("Daily Quest Clear")) {
    state.progress.badges.push("Daily Quest Clear");
  }
  saveProgress();
  renderAll();
  showRewardToast(uiText("chestReward"));
}

function getLesson(word) {
  const match = word.meaning.match(/第(\d+)课/);
  return match ? match[1] : "other";
}

function getQuizPrompt(word) {
  return `Find: ${word.pinyin || "listen"}`;
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function highlightTarget(text, char) {
  const safeText = escapeHTML(text);
  const safeChar = escapeHTML(char);
  return safeText.replaceAll(safeChar, `<strong>${safeChar}</strong>`);
}

function stripLabel(text, label) {
  return String(text || "").replace(label, "").trim();
}

function makeChallengeCombo(word) {
  const char = word.char;
  const phrase = word.phrase && word.phrase.includes(char) ? word.phrase : `${char}${word.phrase || ""}`;
  const sentence = stripLabel(word.good_sentence, "好句：");
  const shortSentence = sentence.includes(char) ? sentence : `${phrase}可以帮助我记住${char}。`;
  const pieces = [
    phrase,
    `${phrase}${char}`,
    shortSentence
  ];
  let combo = pieces.join(" · ");

  while ((combo.match(new RegExp(char, "g")) || []).length < 3) {
    combo += ` · ${char}`;
  }

  return combo;
}

function makeMixedChallengeText(word) {
  const combo = makeChallengeCombo(word);
  const pinyin = word.pinyin ? `(${word.pinyin})` : "";
  return shuffle([combo, pinyin]).filter(Boolean).join(" · ");
}

function getEnglishHint(word) {
  return ENGLISH_HINTS[word.phrase] || "";
}

function wordsWithEnglishHints(words) {
  return words.filter(word => getEnglishHint(word));
}

const COMPO_THEMES = [
  {
    title: "帮助别人",
    opening: "一个风和日丽的下午，我在校园里看见一位同学遇到了困难。",
    middle: "我没有袖手旁观，而是主动走上前去，耐心地帮助他。虽然事情不大，却让我明白了助人为乐的意义。",
    ending: "从那以后，我提醒自己要多关心身边的人，让校园变得更温暖。"
  },
  {
    title: "勇敢面对困难",
    opening: "每个人都会遇到困难，重要的是我们用什么态度去面对。",
    middle: "一开始，我感到紧张又害怕，可是我告诉自己不能轻易放弃。我深深吸了一口气，认真思考解决办法。",
    ending: "这件事让我明白，只要勇敢尝试，再大的困难也能一步一步克服。"
  },
  {
    title: "珍惜时间",
    opening: "时间像流水一样，一去不回头。",
    middle: "以前，我常常拖拖拉拉，把宝贵的时间浪费掉。后来，我学会先订计划，再一步一步完成任务。",
    ending: "我终于明白，珍惜时间就是珍惜自己的成长机会。"
  },
  {
    title: "健康生活",
    opening: "健康的身体是学习和生活的重要基础。",
    middle: "我们应该多运动，少吃不健康的食物，也要保持充足的睡眠。这样，上课时才会更有精神。",
    ending: "养成良好的生活习惯，能让我们每天都充满活力。"
  }
];

const ORAL_PATTERNS = [
  "我认为，这种做法是值得鼓励的，因为它表现出关心别人和负责任的态度。",
  "如果我是视频中的同学，我会先冷静下来，再想办法解决问题。",
  "在日常生活中，我也遇过类似的情况，所以我明白互相帮助很重要。",
  "这件事提醒我们，不能只想到自己，也要考虑别人的感受。",
  "总的来说，只要大家愿意多走一步，很多问题都可以变得更好。"
];

const PSLE_PRACTICE_SETS = [
  {
    compoTitle: "口试主题作文：为别人着想",
    compoPrompt: "题目：一次为别人着想的经历。请写清楚事情发生在哪里、你看到什么行为、你的感受和看法，以及你学到的道理。",
    oralTitle: "口试手册主题（一）：为别人着想",
    readingPassage: "在图书馆里，学生应该注意自己的行为。有人一边吃东西一边看书，也有人大声说话，影响了其他同学。",
    oralQuestion: "请按手册的三类问题练习：一、谈谈录像中没有为别人着想的行为；二、分享你在公共场所看到或做过的相关经历；三、你认为学校或家长可以怎样教导孩子多为别人着想？",
    source: "2024 五、六年级口试手册_事项 revised.pdf",
    values: "尊重／关怀／和谐",
    strategy: "答题提示：先用 5W1H 描述内容，再用 FABCC 说感受、看法、原因、批评/称赞和总结。",
    themeWords: ["为别人着想", "图书馆", "保持安静", "公德心", "尊重", "关怀"]
  },
  {
    compoTitle: "口试主题作文：注意安全",
    compoPrompt: "题目：一次危险的经历。请写清楚危险行为是什么、你或别人怎样处理，以及为什么安全意识很重要。",
    oralTitle: "口试手册主题（二）：注意安全",
    readingPassage: "过马路时，我们应该注意安全。有学生戴着耳机准备过马路，朋友及时提醒他；也有学生使用交通灯，左右看清楚后才过马路。",
    oralQuestion: "请按手册的三类问题练习：一、说出录像中没有注意安全的行为；二、分享你见过的危险行为或你会怎样提醒朋友；三、你认为教导学生注意安全重要吗？为什么？",
    source: "2024 五、六年级口试手册_事项 revised.pdf",
    values: "责任感",
    strategy: "可用句式：我认为这样做是不对的，因为……如果我在场，我会……总的来说，我们应该注意安全。",
    themeWords: ["安全", "过马路", "交通规则", "危险", "提醒", "责任感"]
  },
  {
    compoTitle: "口试主题作文：好人好事",
    compoPrompt: "题目：一件好人好事。请写清楚谁需要帮助、你或别人做了什么、结果如何，以及这件事带给你的启发。",
    oralTitle: "口试手册主题（三）：好人好事",
    readingPassage: "我们要多做好事，成为其他人的好榜样。有人收集可回收物品帮助有需要的人，也有人主动帮助身边的同学或邻居。",
    oralQuestion: "请按手册的三类问题练习：一、说说你最欣赏录像中的哪一件好事；二、分享你帮助别人或被别人帮助的经历；三、学校或家长可以怎样鼓励孩子多做好事？",
    source: "2024 五、六年级口试手册_事项 revised.pdf",
    values: "关怀",
    strategy: "可用好句：赠人玫瑰，手有余香。回答时要有个人例子，不要只说空泛道理。",
    themeWords: ["好人好事", "帮助", "关怀", "榜样", "义工", "称赞"]
  },
  {
    compoTitle: "口试主题作文：保护环境",
    compoPrompt: "题目：保护环境，从我做起。请写一个你看到或参与的环保行动，并说明为什么保护环境人人有责。",
    oralTitle: "口试手册主题（四）：保护环境",
    readingPassage: "我们可以尽自己的一份力，保持周围环境的清洁。同学们可以捡垃圾、进行垃圾分类，也可以提醒别人把垃圾丢进垃圾桶。",
    oralQuestion: "请按手册的三类问题练习：一、谈谈录像中的环保行为或破坏环境的行为；二、分享你看过或做过的环保行动；三、学校还可以举办什么活动来提高环保意识？",
    source: "2024 五、六年级口试手册_事项 revised.pdf",
    values: "责任感／关怀",
    strategy: "回答时可以比较两类行为：破坏环境 vs 保护环境，再提出家庭、学校、社会三个层面的建议。",
    themeWords: ["保护环境", "垃圾分类", "环保", "责任感", "清洁", "回收"]
  },
  {
    compoTitle: "口试主题作文：自律",
    compoPrompt: "题目：我学会了自律。请写一个因为没有安排好时间而遇到麻烦的经历，以及你后来怎样改正。",
    oralTitle: "口试手册主题（五）：自律",
    readingPassage: "时间是很宝贵的，不管是学习或休闲活动，我们都要分配好时间。有人列了作业清单，却只顾看电视和玩手机，到了晚上才赶功课。",
    oralQuestion: "请按手册的三类问题练习：一、你认为录像中女生的行为正确吗？二、你平时怎样管理时间？三、你同意“一寸光阴一寸金”吗？为什么？",
    source: "2024 五、六年级口试手册_事项 revised.pdf",
    values: "自律",
    strategy: "问题三可用 PEEL：Point 观点、Elaborate 原因、Example 例子、Link Back 回扣观点。",
    themeWords: ["自律", "时间", "分配", "珍惜", "计划", "拖延"]
  },
  {
    compoTitle: "口试主题作文：快乐地学习",
    compoPrompt: "题目：一堂有趣的课。请写清楚这堂课怎样进行、为什么有趣，以及你从中学到什么。",
    oralTitle: "口试手册主题（六）：快乐地学习",
    readingPassage: "学习可以是好玩又有趣的一件事。老师可以通过实验、表演、游戏或科技，让同学们在轻松的过程中学习新知识。",
    oralQuestion: "请按手册的三类问题练习：一、录像中哪一堂课让你印象深刻？二、分享你上过的一堂有趣的课；三、除了课室，你还可以从哪里学到新知识？",
    source: "2024 五、六年级口试手册_事项 revised.pdf",
    values: "卓越／责任感",
    strategy: "回答时要说出具体学习方式，例如科技、户外学习、比赛、图书馆或课外活动。",
    themeWords: ["快乐地学习", "知识", "有趣", "科技", "图书馆", "课外活动"]
  },
  {
    compoTitle: "口试主题作文：小组活动",
    compoPrompt: "题目：一次小组活动。请写清楚组员如何分工、遇到什么问题、大家怎样合作完成任务。",
    oralTitle: "口试手册主题（七）：小组活动",
    readingPassage: "在小组作业中，每个组员都应该尽力把自己负责的部分做好。如果有人没有责任感，其他组员可能会感到不满，也会影响整体进度。",
    oralQuestion: "请按手册的三类问题练习：一、你会像录像中不负责任的男孩那样做吗？二、分享你参与小组活动的经验；三、学校为什么要安排学生进行小组活动？",
    source: "2024 五、六年级口试手册_事项 revised.pdf",
    values: "责任感／应变／和谐",
    strategy: "可用表达：分工合作、集思广益、发挥团队精神、尽自己的一份力。",
    themeWords: ["小组活动", "责任感", "合作", "团队精神", "分工", "集思广益"]
  },
  {
    compoTitle: "口试主题作文：向朋友学习",
    compoPrompt: "题目：我从朋友身上学到的一件事。请写清楚朋友有什么优点、你怎样向他学习，以及你有什么改变。",
    oralTitle: "口试手册主题（八）：向朋友学习",
    readingPassage: "除了一起玩耍，我们还有很多地方可以向朋友学习。当我们在学习中遇到困难时，可以向朋友请教，也可以和朋友交换笔记和看法。",
    oralQuestion: "请按手册的三类问题练习：一、如果做功课遇到困难，你会怎么做？二、你和朋友之间还可以怎样互相学习？三、向朋友学习是不是最好的方法？为什么？",
    source: "2024 五、六年级口试手册_事项 revised.pdf",
    values: "责任感／应变／和谐",
    strategy: "回答时可说学习方法、好品质、新技能、好习惯，也要说明为什么值得学习。",
    themeWords: ["朋友", "学习", "请教", "交换", "经验", "好习惯"]
  }
];

const THEME_PHRASE_BANK = {
  "帮助": ["伸出援手", "助人为乐", "互相关心", "雪中送炭"],
  "合作": ["齐心协力", "分工合作", "同心协力", "互相配合"],
  "困难": ["克服困难", "坚持不懈", "迎难而上", "不轻言放弃"],
  "时间": ["珍惜时间", "争分夺秒", "合理安排", "今日事今日毕"],
  "健康": ["强身健体", "精神饱满", "养成习惯", "保持健康"],
  "责任": ["认真负责", "尽心尽力", "承担责任", "值得称赞"]
};

const ORAL_MODEL_ANSWERS = {
  "为别人着想": "我认为录像中那些没有为别人着想的行为是不对的。图书馆是大家安静阅读和学习的地方，如果有人一边吃东西一边看书，或大声说话，就会影响别人。看到这样的行为，我会感到失望，因为他们只想到自己，没有尊重其他使用图书馆的人。如果我在场，我会礼貌地提醒他们保持安静，也会请他们到食堂才吃东西。我自己也曾经在图书馆提醒朋友把声音放低。总的来说，在公共场所我们要为别人着想，注意自己的言行举止。",
  "注意安全": "我认为录像中戴着耳机过马路的行为非常危险。过马路时，我们应该集中精神，看清楚交通灯，也要左右观察来往车辆。看到朋友及时提醒他，我感到很安心，因为这样可以避免意外发生。如果我是他的朋友，我也会上前阻止他，并提醒他不要边走边听音乐。我曾经看过有人在路边玩手机，差点没有注意到车辆。总的来说，安全是每个人的责任，我们要遵守交通规则，保护自己也保护别人。",
  "好人好事": "我最欣赏录像中愿意帮助别人的行为。无论是收集可回收物品帮助有需要的人，还是主动帮助身边的同学，这些都是值得称赞的好事。看到这样的行为，我感到很温暖，因为他们用实际行动关心别人。如果我有机会，我也会尽自己的能力帮助别人，例如把文具借给同学，或在老人需要帮助时主动上前。我认为学校可以举办好人好事周，鼓励同学们多做好事。总的来说，赠人玫瑰，手有余香，我们应该把关怀化为行动。",
  "保护环境": "我认为保护环境是每个人都应该尽力去做的事。录像中的同学捡垃圾、进行垃圾分类，这些行为都值得我们学习。看到他们为校园环境出一份力，我感到很开心，因为干净的环境需要大家共同维护。如果我看到有人把垃圾留在长凳上，我会礼貌地提醒他把垃圾丢进垃圾桶。在生活中，我也会自备购物袋，减少使用塑料袋。学校可以举办环保活动，让同学们了解垃圾分类的重要性。总的来说，保护环境，人人有责。",
  "自律": "我认为录像中女生的行为是不正确的。她虽然列出了作业清单，却没有按照计划完成，反而一直看电视和玩手机，最后才匆忙赶功课。看到她这样做，我感到失望，因为她没有分配好时间，也没有做到自律。如果我是她，我会先完成重要的功课，再安排休息时间。我平时会使用任务清单，把重要的事情先做完。总的来说，一寸光阴一寸金，寸金难买寸光阴。我们要珍惜时间，养成自律的好习惯。",
  "快乐地学习": "我会喜欢录像中那样有趣的课堂。老师通过实验、表演、游戏或科技来教学，可以让同学们更投入，也能更容易记住所学的知识。看到同学们快乐地学习，我感到很羡慕，因为这样的学习方式既轻松又有效。我曾经上过一堂有趣的科学课，老师让我们动手做实验，我不但学到知识，也更加喜欢学习。除了课室，我们还可以从图书馆、网络和课外活动中学习新知识。总的来说，学习可以很有趣，关键是要主动参与。",
  "小组活动": "我不会像录像中不负责任的男孩那样做。小组活动需要每个组员尽力完成自己的部分，如果有人只顾做自己的事，就会影响整个小组。看到这样的行为，我会感到生气，因为他没有责任感，也没有合作精神。如果我在场，我会提醒他尽快完成自己的任务，也会和组员一起分工合作。我曾经参加小组专题作业，大家互相配合，最后顺利完成任务。总的来说，小组活动能培养责任感和团队精神，我们要尽自己的一份力。",
  "向朋友学习": "如果我做功课时遇到困难，我会先自己思考，再向老师或朋友请教。录像中的男孩遇到难题时懂得寻求帮助，我认为这是正确的做法。看到他愿意向朋友学习，我感到很开心，因为朋友之间不只是一起玩，也可以互相帮助和进步。我也曾经和同学交换笔记，从他们身上学到更好的读书方法。除了功课，我们还可以向朋友学习好习惯和好品质。总的来说，三人行，必有我师。我们要虚心学习别人的优点。"
};

function modelAnswerForSet(set) {
  const theme = Object.keys(ORAL_MODEL_ANSWERS).find(key => set.oralTitle.includes(key));
  return ORAL_MODEL_ANSWERS[theme] || "我认为这个主题和我们的日常生活有密切关系。回答时，我会先说清楚自己的看法，再解释原因，并分享一个个人经验。最后，我会用总的来说作总结，回到主题和价值观。";
}

function suggestedPhrasesForSet(set) {
  const phrases = [];
  set.themeWords.forEach(word => {
    Object.entries(THEME_PHRASE_BANK).forEach(([theme, items]) => {
      if (word.includes(theme) || theme.includes(word)) {
        phrases.push(...items);
      }
    });
  });
  return [...new Set(phrases)].slice(0, 6);
}

function uniquePhrases(words) {
  const seen = new Set();
  return words
    .map(word => ({
      phrase: word.phrase,
      sentence: stripLabel(word.good_sentence, "好句："),
      char: word.char,
      pinyin: word.pinyin
    }))
    .filter(item => {
      if (!item.phrase || seen.has(item.phrase)) return false;
      seen.add(item.phrase);
      return true;
    });
}

function chooseChineseVoice() {
  if (!("speechSynthesis" in window)) return null;

  const voices = speechSynthesis.getVoices();
  const chineseVoices = voices.filter(voice => /^zh/i.test(voice.lang));
  const preferredNames = [
    "xiaoxiao",
    "xiaoyi",
    "xiaobei",
    "ting-ting",
    "tingting",
    "mei-jia",
    "meijia",
    "sin-ji",
    "sinji",
    "yuna"
  ];

  return chineseVoices.find(voice =>
    preferredNames.some(name => voice.name.toLowerCase().includes(name))
  ) || chineseVoices.find(voice => voice.lang === "zh-CN") || chineseVoices[0] || voices[0] || null;
}

function dictionaryAudioUrl(text) {
  const content = String(text || "").trim().slice(0, 180);
  return `/api/tts?text=${encodeURIComponent(content)}`;
}

function stopActiveAudio() {
  if (!state.activeAudio) return;
  state.activeAudio.pause();
  state.activeAudio.removeAttribute("src");
  state.activeAudio.load();
  state.activeAudio = null;
}

function getAudioPlayer() {
  let audio = document.getElementById("nihao-tts-audio");
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = "nihao-tts-audio";
    audio.preload = "auto";
    audio.setAttribute("playsinline", "");
    audio.style.display = "none";
    document.body.appendChild(audio);
  }
  return audio;
}

function speakWithBrowserVoice(text, options = {}) {
  if (!("speechSynthesis" in window)) return false;

  const content = String(text || "").trim();
  if (!content) return false;

  const voice = chooseChineseVoice();
  const utterance = new SpeechSynthesisUtterance(content);
  utterance.lang = voice?.lang || "zh-CN";
  utterance.voice = voice;
  utterance.pitch = options.pitch || 1.18;
  utterance.rate = options.rate || 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
  return true;
}

function speak(text, options = {}) {
  const content = String(text || "").trim();
  if (!content) return Promise.resolve(false);

  stopActiveAudio();
  if ("speechSynthesis" in window) speechSynthesis.cancel();

  if (IS_GITHUB_PAGES) {
    return Promise.resolve(speakWithBrowserVoice(content, options));
  }

  const audio = getAudioPlayer();
  state.activeAudio = audio;
  audio.onended = () => {
    if (state.activeAudio === audio) state.activeAudio = null;
  };
  audio.onerror = () => {
    if (state.activeAudio === audio) state.activeAudio = null;
    console.warn("Audio failed to load:", content);
  };
  audio.src = dictionaryAudioUrl(content);
  audio.currentTime = 0;
  return audio.play().then(() => true).catch(error => {
    console.warn("Audio play failed", error);
    if (state.activeAudio === audio) state.activeAudio = null;
    return false;
  });
}

if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = chooseChineseVoice;
}

function stopSpeaking() {
  clearAlbumSpeechTimers();
  stopActiveAudio();
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

function clearAlbumSpeechTimers() {
  state.albumSpeechTimers.forEach(timer => clearTimeout(timer));
  state.albumSpeechTimers = [];
}

function stopAlbumAudio() {
  clearTimeout(state.albumTimer);
  clearAlbumSpeechTimers();
  state.albumPlaying = false;
  if (els.albumPlayButton) {
    els.albumPlayButton.textContent = uiText("resumeAuto");
  }
  stopSpeaking();
}

function openSoundLink(word) {
  window.open(word.sound_url, "_blank", "noopener");
}

function recordActivity() {
  const today = todayKey();
  const lastActive = state.progress.lastActiveDate;

  if (lastActive === today) return;

  if (lastActive && daysBetween(lastActive, today) === 1) {
    state.progress.streak += 1;
  } else {
    state.progress.streak = 1;
  }

  state.progress.lastActiveDate = today;
}

function addPoints(amount) {
  recordActivity();
  state.progress.points += amount;
  checkBadges();
  saveProgress();
  renderProgress();
  showRewardToast(`+${amount} XP`);
}

function markSaved(word) {
  const key = wordKey(word);
  if (state.progress.saved[key]) {
    delete state.progress.saved[key];
  } else {
    state.progress.saved[key] = word;
    addPoints(2);
  }
  saveProgress();
  renderAll();
}

function markMastered(word) {
  state.progress.mastered[wordKey(word)] = word;
  addDailyQuestProgress("learned");
  addPoints(5);
  saveProgress();
  renderAll();
}

function recordQuizAnswer(word, isCorrect) {
  state.progress.completedQuizzes += 1;
  addDailyQuestProgress("quizzes");

  if (isCorrect) {
    state.progress.correctAnswers += 1;
    state.progress.quizCombo = (state.progress.quizCombo || 0) + 1;
    state.progress.mastered[wordKey(word)] = word;
    delete state.progress.mistakes[wordKey(word)];
    addPoints(10);
  } else {
    state.progress.quizCombo = 0;
    const misses = (state.progress.mistakes[wordKey(word)]?.misses || 0) + 1;
    const intervals = [0, 1, 3, 7];
    state.progress.mistakes[wordKey(word)] = {
      ...word,
      misses,
      dueDate: dateAfter(intervals[Math.min(misses - 1, intervals.length - 1)])
    };
  }

  checkBadges();
  saveProgress();
  renderAll();
}

function checkBadges() {
  const badges = state.progress.badges;
  const add = badge => {
    if (!badges.includes(badge)) badges.push(badge);
  };

  if (state.progress.points >= 50) add("Vocabulary Starter");
  if (state.progress.points >= 150) add("Chinese Explorer");
  if (state.progress.streak >= 3) add("3-Day Listener");
  if ((state.progress.quizCombo || 0) >= 5) add("Combo Builder");
  if (state.progress.correctAnswers >= 20) add("Quiz Master");
  if ((state.progress.listenedStories || 0) >= 3) add("Podcast Explorer");
  if (Object.keys(state.progress.saved).length >= 10) add("Collector");
  if (Object.keys(state.progress.mastered).length >= 30) add("Character Champion");
}

function displayBadgeName(badge) {
  if (state.uiLanguage !== "zh") return badge;
  const badgeNames = {
    "Vocabulary Starter": "词汇起步徽章",
    "Chinese Explorer": "华文探索者",
    "3-Day Listener": "三天聆听徽章",
    "Combo Builder": "连击高手",
    "Quiz Master": "测验达人",
    "Podcast Explorer": "磨耳朵探索者",
    "Collector": "收藏达人",
    "Character Champion": "汉字小冠军",
    "Speed Challenger": "限时挑战者",
    "Boss Challenger": "终极挑战者",
    "Daily Quest Clear": "每日任务完成"
  };
  return badgeNames[badge] || badge;
}

function renderProgress() {
  els.points.textContent = state.progress.points;
  els.streak.textContent = state.progress.streak;
  els.masteredCount.textContent = Object.keys(state.progress.mastered).length;
  els.completedQuizzes.textContent = state.progress.completedQuizzes;
  els.correctAnswers.textContent = state.progress.correctAnswers;
  els.dailyStreak.textContent = state.progress.streak;
  els.quizCombo.textContent = state.progress.quizCombo || 0;
  els.storiesListened.textContent = state.progress.listenedStories || 0;
  els.mistakeCount.textContent = Object.keys(state.progress.mistakes).length;
  els.savedCount.textContent = Object.keys(state.progress.saved).length;

  els.badges.innerHTML = "";
  if (state.progress.badges.length === 0) {
    els.badges.innerHTML = `<li>${uiText("noBadges")}</li>`;
  } else {
    state.progress.badges.forEach(badge => {
      const li = document.createElement("li");
      li.textContent = displayBadgeName(badge);
      els.badges.appendChild(li);
    });
  }

  renderLevelAndUnlocks();
  renderDailyQuest();
  renderDashboard();
  renderMissions();
}

function renderLevelAndUnlocks() {
  if (!els.levelCard || !els.unlocksList) return;

  const level = xpLevel();
  const nextLevelXp = level * 100;
  const currentLevelStart = (level - 1) * 100;
  const progress = clamp((state.progress.points - currentLevelStart) / 100, 0, 1);
  const rewards = unlockedRewards();

  els.levelCard.innerHTML = `
    <strong>${uiValue("levelLabel", level)}</strong>
    <span>${learnerTitle()}</span>
    <div class="mission-progress"><i style="width:${progress * 100}%"></i></div>
    <small>${uiValue("xpToNext", state.progress.points, nextLevelXp)}</small>
  `;

  els.unlocksList.innerHTML = rewards.length
    ? rewards.map(reward => `<li>${escapeHTML(reward)}</li>`).join("")
    : `<li>${uiText("unlockHint")}</li>`;
}

function renderDailyQuest() {
  if (!els.questLearnStep) return;

  const stats = dailyQuestStats();
  const complete = isDailyQuestComplete();
  const claimed = state.progress.claimedQuestDate === todayKey();
  els.questLearnStep.textContent = state.uiLanguage === "zh" ? `学习 ${Math.min(stats.learned, 5)}/5` : `Learn ${Math.min(stats.learned, 5)}/5`;
  els.questQuizStep.textContent = state.uiLanguage === "zh" ? `测验 ${Math.min(stats.quizzes, 3)}/3` : `Quiz ${Math.min(stats.quizzes, 3)}/3`;
  els.questSpeedStep.textContent = state.uiLanguage === "zh" ? `挑战 ${Math.min(stats.speedRuns, 1)}/1` : `Speed Run ${Math.min(stats.speedRuns, 1)}/1`;
  els.questListenStep.textContent = state.uiLanguage === "zh" ? `听力/PSLE ${Math.min(stats.listening, 1)}/1` : `Listen/PSLE ${Math.min(stats.listening, 1)}/1`;
  els.dailyQuestSummary.textContent = claimed
    ? (state.uiLanguage === "zh" ? "今天的宝箱已经领取，明天再来完成新任务。" : "Chest claimed today. Come back tomorrow for a new quest.")
    : complete
      ? (state.uiLanguage === "zh" ? "每日任务已完成，可以领取宝箱。" : "Daily quest complete. Claim your treasure chest.")
      : uiText("questSummary");
  els.claimDailyRewardButton.disabled = !complete || claimed;
  els.claimDailyRewardButton.textContent = claimed ? uiText("claimed") : complete ? uiText("claimChest") : uiText("lockedChest");
}

function updateMission(bar, status, current, target, doneText, progressText) {
  const progress = clamp(current / target, 0, 1);
  bar.style.width = `${progress * 100}%`;
  status.textContent = progress >= 1 ? doneText : progressText;
}

function renderMissions() {
  const masteredCount = Object.keys(state.progress.mastered).length;
  const quizCount = state.progress.completedQuizzes;
  const challengeCount = state.progress.challengePlays || 0;
  const listenCount = state.progress.listenedStories || 0;

  updateMission(
    els.missionWordBar,
    els.missionWordStatus,
    masteredCount,
    5,
    state.uiLanguage === "zh" ? "任务完成：学会5个词语" : "Mission cleared: 5 words learned",
    state.uiLanguage === "zh" ? `${Math.min(masteredCount, 5)}/5 个词语已掌握` : `${Math.min(masteredCount, 5)}/5 words cleared`
  );
  updateMission(
    els.missionReviewBar,
    els.missionReviewStatus,
    quizCount,
    3,
    state.uiLanguage === "zh" ? "任务完成：测验训练完成" : "Mission cleared: quiz training done",
    state.uiLanguage === "zh" ? `${Math.min(quizCount, 3)}/3 题测验` : `${Math.min(quizCount, 3)}/3 quiz answers`
  );
  updateMission(
    els.missionChallengeBar,
    els.missionChallengeStatus,
    challengeCount,
    1,
    state.uiLanguage === "zh" ? "任务完成：已尝试限时挑战" : "Mission cleared: speed run tried",
    state.uiLanguage === "zh" ? `${Math.min(challengeCount, 1)}/1 次限时挑战` : `${Math.min(challengeCount, 1)}/1 speed run`
  );
  updateMission(
    els.missionListenBar,
    els.missionListenStatus,
    listenCount,
    1,
    state.uiLanguage === "zh" ? "任务完成：已完成听力练习" : "Mission cleared: story listened",
    state.uiLanguage === "zh" ? `${Math.min(listenCount, 1)}/1 次听力练习` : `${Math.min(listenCount, 1)}/1 story listened`
  );
}

function applyFilters() {
  const lesson = els.lessonFilter.value;
  const query = els.searchInput.value.trim().toLowerCase();

  state.filteredWords = state.words.filter(word => {
    const matchesLesson = lesson === "all" || getLesson(word) === lesson;
    const text = `${word.char} ${word.pinyin} ${word.meaning} ${word.phrase} ${word.association} ${word.good_sentence}`.toLowerCase();
    return matchesLesson && text.includes(query);
  });
}

function renderLessonFilter() {
  const lessons = [...new Set(state.words.map(getLesson))]
    .filter(lesson => lesson !== "other")
    .sort((a, b) => Number(a) - Number(b));

  els.lessonFilter.innerHTML = `<option value="all">${uiText("allLessons")}</option>`;
  lessons.forEach(lesson => {
    const option = document.createElement("option");
    option.value = lesson;
    option.textContent = uiValue("lessonName", lesson);
    els.lessonFilter.appendChild(option);
  });
}

function frequencyScore(word) {
  const chars = [...word.char];
  const commonScore = chars.reduce((score, char) => score + (HIGH_FREQUENCY_CHARS.has(char) ? 4 : 0), 0);
  const helperScore = word.helper_source === "manual" ? 8 : 0;
  const savedScore = state.progress.saved[wordKey(word)] ? 3 : 0;
  const mistakeScore = state.progress.mistakes[wordKey(word)] ? 6 : 0;
  const phraseScore = word.phrase && word.phrase.includes(word.char) ? 2 : 0;
  return commonScore + helperScore + savedScore + mistakeScore + phraseScore;
}

function albumWords() {
  const words = [...state.filteredWords];
  if (state.albumMode === "random") return shuffle(words);
  return words.sort((a, b) => frequencyScore(b) - frequencyScore(a));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function speechDurationMs(text, kind) {
  const content = String(text || "").trim();
  if (!content) return 0;
  const chineseCount = (content.match(/[\u4e00-\u9fff]/g) || []).length;
  const otherCount = Math.max(0, content.length - chineseCount);
  const base = kind === "sentence" ? 1300 : kind === "phrase" ? 900 : 700;
  const perChineseChar = kind === "sentence" ? 380 : kind === "phrase" ? 340 : 300;
  return base + chineseCount * perChineseChar + otherCount * 120;
}

function albumSpeechParts(word) {
  if (!word) return [];
  const phrase = word.phrase && word.phrase !== word.char ? word.phrase : "";
  const sentence = stripLabel(word.good_sentence || "", "好句：").trim();
  return [
    {
      text: word.char,
      delay: 0,
      kind: "word",
      options: { pitch: 1.2, rate: 0.82 }
    },
    phrase
      ? {
          text: phrase,
          delay: 1100,
          kind: "phrase",
          options: { pitch: 1.16, rate: 0.78, queue: true }
        }
      : null,
    sentence
      ? {
          text: sentence,
          delay: phrase ? 3000 : 1300,
          kind: "sentence",
          options: { pitch: 1.08, rate: 0.72, queue: true }
        }
      : null
  ].filter(Boolean);
}

function albumSpeechText(word) {
  if (!word) return "";
  return albumSpeechParts(word)
    .map(part => part.text)
    .filter(Boolean)
    .join("。");
}

function albumQuickSpeechText(word) {
  if (!word) return "";
  const phrase = picturePhraseForWord(word);
  return phrase || word.char;
}

function albumCardDelayMs(word) {
  const longestSpeechEnd = albumSpeechParts(word).reduce(
    (latest, part) => Math.max(latest, part.delay + speechDurationMs(part.text, part.kind)),
    0
  );
  return clamp(
    longestSpeechEnd + ALBUM_EXTRA_DELAY_MS,
    ALBUM_MIN_INTERVAL_MS,
    ALBUM_MAX_INTERVAL_MS
  );
}

function scheduleNextAlbumCard(word) {
  clearTimeout(state.albumTimer);
  if (!state.albumPlaying || !word) return;
  state.albumTimer = setTimeout(() => moveAlbum(1, { auto: true }), albumCardDelayMs(word));
}

function setAlbumSoundButton(enabled, labelKey = null) {
  if (!els.albumSoundButton) return;
  els.albumSoundButton.textContent = uiText(labelKey || (enabled ? "soundOn" : "enableSound"));
  els.albumSoundButton.classList.toggle("saved", enabled);
}

function markAlbumSoundBlocked() {
  state.albumSoundEnabled = false;
  setAlbumSoundButton(false, "soundBlocked");
}

function speakAlbumWord(word, options = {}) {
  if ((!state.albumPlaying && !options.force) || !word || !state.albumSoundEnabled) {
    return Promise.resolve(false);
  }

  clearAlbumSpeechTimers();
  return speak(albumQuickSpeechText(word), { pitch: 1.12, rate: 0.82 });
}

function speakWordNow(word) {
  if (!word) return;
  stopSpeaking();
  state.albumSoundEnabled = true;
  setAlbumSoundButton(true);
  speak(albumQuickSpeechText(word), { pitch: 1.12, rate: 0.82 }).then(success => {
    if (!success) markAlbumSoundBlocked();
  });
}

function setAlbumPlaying(playing) {
  state.albumPlaying = playing;
  if (els.albumPlayButton) {
    els.albumPlayButton.textContent = playing ? uiText("pauseAuto") : uiText("resumeAuto");
  }
  clearTimeout(state.albumTimer);
  clearAlbumSpeechTimers();
  if (!playing) stopSpeaking();
  if (playing) {
    const currentWord = state.filteredWords[state.albumIndex];
    speakAlbumWord(currentWord);
    scheduleNextAlbumCard(currentWord);
  }
}

function enableAlbumSound() {
  if (state.albumSoundEnabled) {
    state.albumSoundEnabled = false;
    stopSpeaking();
    setAlbumSoundButton(false);
    return;
  }

  state.albumSoundEnabled = true;
  setAlbumSoundButton(true);
  const currentWord = state.filteredWords[state.albumIndex];
  speakAlbumWord(currentWord, { force: true }).then(success => {
    if (!success) markAlbumSoundBlocked();
  });
  if (state.albumPlaying) scheduleNextAlbumCard(currentWord);
}

function moveAlbum(direction, options = {}) {
  if (state.filteredWords.length === 0) return;
  clearTimeout(state.albumTimer);
  clearAlbumSpeechTimers();
  if (options.speakNow) stopSpeaking();
  if (options.speakNow) {
    state.albumSoundEnabled = true;
    setAlbumSoundButton(true);
  }
  if (typeof options.keepPlaying === "boolean") state.albumPlaying = options.keepPlaying;
  state.albumIndex = (state.albumIndex + direction + state.filteredWords.length) % state.filteredWords.length;
  renderFlashcards({ speakNow: options.speakNow });
  if (options.speakNow && !state.albumPlaying) {
    const currentWord = state.filteredWords[state.albumIndex];
    speakAlbumWord(currentWord, { force: true });
  }
}

function meaningVisualForWord(word) {
  const text = [
    word.char,
    word.phrase,
    word.association,
    word.good_sentence,
    word.helper_english,
    getEnglishHint(word),
    word.meaning
  ].filter(Boolean).join(" ").toLowerCase();

  const visuals = [
    { keys: ["安全", "危险", "交通", "马路", "规则", "safe", "danger", "road"], icon: "🛡️", theme: "safety" },
    { keys: ["时间", "珍惜", "计划", "马上", "迟", "早", "time", "plan", "hurry"], icon: "⏰", theme: "time" },
    { keys: ["帮助", "关怀", "朋友", "合作", "责任", "help", "friend", "care", "team"], icon: "🤝", theme: "people" },
    { keys: ["证明", "证", "考试", "成绩", "奖", "榜样", "proof", "witness", "score", "award"], icon: "🏅", theme: "achievement" },
    { keys: ["学习", "读", "书", "写", "老师", "学生", "知识", "study", "read", "teacher", "school"], icon: "📚", theme: "study" },
    { keys: ["花", "树", "草", "山", "水", "风", "雨", "云", "太阳", "自然", "flower", "tree", "rain", "wind", "water"], icon: "🌈", theme: "nature" },
    { keys: ["家", "爸爸", "妈妈", "哥哥", "妹妹", "家庭", "father", "mother", "family"], icon: "🏠", theme: "home" },
    { keys: ["开心", "快乐", "笑", "幸福", "喜欢", "有趣", "happy", "fun", "like"], icon: "😊", theme: "happy" },
    { keys: ["悲", "伤", "哭", "痛", "烦恼", "害怕", "sad", "worry", "fear"], icon: "💧", theme: "feeling" },
    { keys: ["健康", "运动", "身体", "锻炼", "strong", "health", "exercise"], icon: "🏃", theme: "health" },
    { keys: ["钱", "货币", "买", "卖", "价值", "money", "currency", "value"], icon: "💰", theme: "money" },
    { keys: ["电", "火", "光", "科技", "机器", "science", "technology", "fire"], icon: "💡", theme: "science" },
    { keys: ["车", "船", "走", "跑", "来", "去", "travel", "bus", "car"], icon: "🚌", theme: "travel" },
    { keys: ["吃", "喝", "饭", "食物", "茶", "food", "eat", "drink"], icon: "🍜", theme: "food" },
    { keys: ["看", "听", "说", "问", "话", "口", "耳", "眼", "see", "listen", "speak"], icon: "👂", theme: "language" }
  ];

  const matched = visuals.find(visual => visual.keys.some(key => text.includes(key.toLowerCase())));
  if (matched) return matched;

  const fallbackIcons = ["✨", "🎯", "🧠", "🌟", "🧩", "📝"];
  const index = [...word.char].reduce((sum, char) => sum + char.charCodeAt(0), 0) % fallbackIcons.length;
  return { icon: fallbackIcons[index], theme: "default" };
}

function picturePhraseForWord(word) {
  const phrase = (word.phrase || "").replace(/^好词：/, "").trim();
  if (phrase) return phrase;

  const association = (word.association || "").replace(/^好词：/, "").trim();
  if (association) return association;

  return word.char;
}

function renderAlbumCard(word, position, total) {
  const key = wordKey(word);
  const visual = meaningVisualForWord(word);
  const picturePhrase = picturePhraseForWord(word);
  const sentence = stripLabel(word.good_sentence || "", "好句：").trim();
  const card = document.createElement("article");
  card.className = "word-card album-card";
  card.innerHTML = `
    <div class="album-counter">${position + 1} / ${total}</div>
    <div class="meaning-picture meaning-picture-${visual.theme}" role="img" aria-label="${escapeHTML(picturePhrase)}">
      <span class="picture-icon">${visual.icon}</span>
      <span class="picture-main-char">${escapeHTML(word.char)}</span>
      <span class="picture-pinyin">${escapeHTML(word.pinyin || "")}</span>
      <span class="picture-word">好词：${escapeHTML(picturePhrase)}</span>
      ${sentence ? `<span class="picture-sentence">好句：${escapeHTML(sentence)}</span>` : ""}
    </div>
    ${word.helper_source === "manual" ? `<div class="helper-badge">${uiText("myHaoci")}</div>` : ""}
    <div class="card-actions">
      <button class="mini-button listen-button" type="button" data-action="speak">${uiText("listen")}</button>
      <button class="mini-button ${state.progress.saved[key] ? "saved" : ""}" type="button" data-action="save">
        ${state.progress.saved[key] ? uiText("saved") : uiText("save")}
      </button>
      <button class="mini-button" type="button" data-action="master">${uiText("know")}</button>
      <button class="mini-button" type="button" data-action="quiz">${uiText("quiz")}</button>
      <button class="mini-button" type="button" data-action="edit-helper">${uiText("editHaoci")}</button>
    </div>
  `;

  card.addEventListener("click", event => {
    if (event.target.closest("button")) return;
    setAlbumPlaying(false);
  });
  card.querySelector('[data-action="speak"]').addEventListener("click", () => {
    speakWordNow(word);
  });
  card.querySelector('[data-action="save"]').addEventListener("click", () => markSaved(word));
  card.querySelector('[data-action="master"]').addEventListener("click", () => markMastered(word));
  card.querySelector('[data-action="quiz"]').addEventListener("click", () => {
    showTab("quiz");
    setAlbumPlaying(false);
    renderQuiz(word);
  });
  card.querySelector('[data-action="edit-helper"]').addEventListener("click", () => {
    setAlbumPlaying(false);
    editWordHelper(word);
  });
  return card;
}

function renderFlashcards(options = {}) {
  applyFilters();
  els.flashcards.innerHTML = "";
  const orderedWords = albumWords();
  state.filteredWords = orderedWords;
  if (state.albumIndex >= orderedWords.length) state.albumIndex = 0;
  els.wordCount.textContent = uiValue("wordCount", orderedWords.length, state.grade, state.albumMode);

  if (orderedWords.length === 0) {
    els.flashcards.innerHTML = `<p class="empty-state">${uiText("noWordsMatch")}</p>`;
    setAlbumPlaying(false);
    return;
  }

  els.flashcards.appendChild(renderAlbumCard(orderedWords[state.albumIndex], state.albumIndex, orderedWords.length));
  if (document.getElementById("learn-panel")?.classList.contains("active")) {
    setAlbumPlaying(state.albumPlaying);
  }
}

function editWordHelper(word) {
  stopAlbumAudio();
  state.helperEditingWord = word;
  els.helperEditor.hidden = false;
  els.helperEditorTitle.textContent = `${uiText("editHaoci")}: ${word.char}`;
  els.helperPhraseInput.value = word.phrase || word.char;
  els.helperSentenceInput.value = (word.good_sentence || "").replace(/^好句：/, "");
  els.helperEditorFeedback.textContent = "";
  els.helperPhraseInput.focus();
  els.helperEditor.scrollIntoView({ behavior: "smooth", block: "center" });
}

function closeWordHelperEditor() {
  state.helperEditingWord = null;
  els.helperEditor.hidden = true;
  els.helperEditorFeedback.textContent = "";
}

async function saveWordHelperEdit() {
  const word = state.helperEditingWord;
  if (!word) return;

  const cleanPhrase = els.helperPhraseInput.value.trim();
  if (!cleanPhrase) {
    els.helperEditorFeedback.textContent = uiText("haociRequired");
    return;
  }

  try {
    const response = await fetch("/api/word_helper", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        char: word.char,
        grade: word.grade,
        meaning: word.meaning,
        phrase: cleanPhrase,
        sentence: els.helperSentenceInput.value.trim()
      })
    });
    const result = await response.json();
    if (!response.ok) {
      els.helperEditorFeedback.textContent = result.error || uiText("saveFailed");
      return;
    }

    word.phrase = cleanPhrase;
    word.association = `好词：${cleanPhrase}`;
    word.good_sentence = els.helperSentenceInput.value.trim() ? `好句：${els.helperSentenceInput.value.trim()}` : "";
    word.helper_source = "manual";
    state.dictationWords = buildDictationWords(state.words);
    state.dictationCurrent = null;
    saveProgress();
    closeWordHelperEditor();
    renderAll();
    showRewardToast(uiText("savedMyHaoci"));
  } catch (error) {
    console.error(error);
    els.helperEditorFeedback.textContent = uiText("saveFailed");
  }
}

function renderQuiz(forcedWord) {
  const pool = state.filteredWords.length >= 4 ? state.filteredWords : state.words;

  if (pool.length < 4) {
    els.quizQuestion.textContent = uiText("addMoreQuiz");
    els.quizOptions.innerHTML = "";
    els.quizFeedback.textContent = "";
    return;
  }

  const answer = forcedWord || shuffle(pool)[0];
  const choices = shuffle([
    answer,
    ...shuffle(pool.filter(word => wordKey(word) !== wordKey(answer))).slice(0, 3)
  ]);

  state.quizAnswer = answer;
  els.quizQuestion.textContent = getQuizPrompt(answer);
  els.quizFeedback.textContent = "";
  els.quizOptions.innerHTML = "";

  choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice.char;
    button.title = choice.meaning;
    button.addEventListener("click", () => {
      const isCorrect = wordKey(choice) === wordKey(answer);
      recordQuizAnswer(answer, isCorrect);
      els.quizFeedback.textContent = isCorrect
        ? uiText("correctPoints")
        : uiValue("reviewWord", answer);
      setTimeout(() => renderQuiz(), 900);
    });
    els.quizOptions.appendChild(button);
  });
}

function dictationReviewWord(item) {
  return {
    char: item.word,
    pinyin: item.pinyin || "",
    meaning: state.uiLanguage === "zh" ? "好词听写" : "good phrase dictation",
    grade: item.grade || state.grade,
    phrase: item.word,
    association: item.char ? `目标字：${item.char}` : "好词听写",
    good_sentence: item.sentence ? `好句：${item.sentence}` : "",
    helper_source: "dictation"
  };
}

function dictationPhraseFromWord(word) {
  const phrase = picturePhraseForWord(word);
  if (!phrase || phrase === word.char) return "";
  return phrase;
}

function buildDictationWords(words) {
  const seen = new Set();
  return words
    .map(word => {
      const phrase = dictationPhraseFromWord(word);
      if (!phrase || seen.has(phrase)) return null;
      seen.add(phrase);
      return {
        word: phrase,
        char: word.char,
        pinyin: word.pinyin || "",
        grade: word.grade || state.grade,
        sentence: stripLabel(word.good_sentence || "", "好句：").trim()
      };
    })
    .filter(Boolean);
}

function currentDictationWord() {
  const groupWords = currentDictationGroupWords();
  if (!state.dictationCurrent && groupWords.length) {
    state.dictationCurrent = shuffle(groupWords)[0];
  }
  return state.dictationCurrent;
}

function dictationGroups() {
  const groups = [];
  for (let index = 0; index < state.dictationWords.length; index += 10) {
    groups.push(state.dictationWords.slice(index, index + 10));
  }
  return groups;
}

function currentDictationGroupWords() {
  const groups = dictationGroups();
  if (state.dictationGroupIndex >= groups.length) state.dictationGroupIndex = 0;
  return groups[state.dictationGroupIndex] || [];
}

function renderDictationGroups() {
  if (!els.dictationGroupSelect) return;

  const groups = dictationGroups();
  els.dictationGroupSelect.innerHTML = "";
  if (!groups.length) {
    const option = document.createElement("option");
    option.value = "0";
    option.textContent = uiValue("dictationMissing", state.grade);
    els.dictationGroupSelect.appendChild(option);
    els.dictationGroupSelect.disabled = true;
    return;
  }

  els.dictationGroupSelect.disabled = false;
  groups.forEach((group, index) => {
    const option = document.createElement("option");
    const start = index * 10 + 1;
    const end = start + group.length - 1;
    option.value = String(index);
    option.textContent = uiValue("dictationGroupOption", index + 1, start, end, group.length);
    els.dictationGroupSelect.appendChild(option);
  });
  els.dictationGroupSelect.value = String(Math.min(state.dictationGroupIndex, groups.length - 1));
}

function renderDictation() {
  renderDictationGroups();
  const groupWords = currentDictationGroupWords();
  const total = groupWords.length;
  const current = currentDictationWord();
  els.dictationSource.textContent = total
    ? uiValue("dictationSourceReady", state.grade)
    : uiValue("dictationMissing", state.grade);
  els.dictationProgress.textContent = uiValue("dictationWordsReady", total);
  els.dictationScore.textContent = uiValue("dictationScoreText", state.progress.dictationCorrect || 0, state.progress.dictationAttempts || 0);
  els.dictationFeedback.textContent = current
    ? uiText("dictationInstruction")
    : uiText("dictationImportFirst");
  els.dictationAnswerCard.hidden = true;
  els.dictationAnswerCard.innerHTML = "";
}

function newDictationWord() {
  const groupWords = currentDictationGroupWords();
  if (!groupWords.length) {
    renderDictation();
    return;
  }
  state.dictationCurrent = shuffle(groupWords)[0];
  renderDictation();
  playDictationWord(0.86);
}

function playDictationWord(rate = 0.86) {
  stopAlbumAudio();
  const current = currentDictationWord();
  if (!current) return;
  speak(current.word, { pitch: 1.08, rate });
}

function revealDictationAnswer() {
  const current = currentDictationWord();
  if (!current) return;
  const reviewWord = dictationReviewWord(current);
  const key = wordKey(reviewWord);
  state.progress.dictationReveals = state.progress.dictationReveals || {};
  const revealCount = (state.progress.dictationReveals[key]?.count || 0) + 1;
  state.progress.dictationReveals[key] = {
    ...reviewWord,
    count: revealCount,
    lastRevealed: todayKey()
  };
  const misses = Math.max(revealCount, state.progress.mistakes[key]?.misses || 0);
  const intervals = [0, 1, 3, 7];
  state.progress.mistakes[key] = {
    ...reviewWord,
    misses,
    revealCount,
    dueDate: dateAfter(intervals[Math.min(misses - 1, intervals.length - 1)])
  };
  saveProgress();
  renderReview();
  els.dictationAnswerCard.hidden = false;
  els.dictationAnswerCard.innerHTML = `
    <strong>${escapeHTML(current.word)}</strong>
    <span>${escapeHTML(current.char || "")} ${escapeHTML(current.pinyin || "")}</span>
    ${current.sentence ? `<small>${escapeHTML(current.sentence)}</small>` : ""}
  `;
  els.dictationFeedback.textContent = uiValue("shownTimes", revealCount);
}

function recordDictationResult(isCorrect) {
  const current = currentDictationWord();
  if (!current) return;
  const reviewWord = dictationReviewWord(current);
  state.progress.dictationAttempts = (state.progress.dictationAttempts || 0) + 1;

  if (isCorrect) {
    state.progress.dictationCorrect = (state.progress.dictationCorrect || 0) + 1;
    state.progress.mastered[wordKey(reviewWord)] = reviewWord;
    delete state.progress.mistakes[wordKey(reviewWord)];
    addPoints(6);
  } else {
    const misses = (state.progress.mistakes[wordKey(reviewWord)]?.misses || 0) + 1;
    const intervals = [0, 1, 3, 7];
    state.progress.mistakes[wordKey(reviewWord)] = {
      ...reviewWord,
      misses,
      dueDate: dateAfter(intervals[Math.min(misses - 1, intervals.length - 1)])
    };
    state.progress.quizCombo = 0;
  }

  saveProgress();
  renderProgress();
  renderReview();
  renderDictation();
  els.dictationFeedback.textContent = isCorrect
    ? uiText("dictationCorrectFeedback")
    : uiText("dictationReviewFeedback");
}

function reviewScore(item) {
  const mistakeWeight = item.misses || 0;
  const savedBonus = state.progress.saved[wordKey(item)] ? 1 : 0;
  const dueBonus = !item.dueDate || item.dueDate <= todayKey() ? 6 : 0;
  return dueBonus + mistakeWeight * 3 + savedBonus;
}

function recommendedWords() {
  const mistakes = Object.values(state.progress.mistakes);
  const saved = Object.values(state.progress.saved);
  const combined = [...mistakes, ...saved];
  const unique = {};
  combined.forEach(word => {
    unique[wordKey(word)] = word;
  });

  return Object.values(unique)
    .sort((a, b) => reviewScore(b) - reviewScore(a))
    .slice(0, 18);
}

function renderWordList(container, words, emptyText) {
  container.innerHTML = "";
  if (words.length === 0) {
    container.innerHTML = `<p class="empty-state">${emptyText}</p>`;
    return;
  }

  words.forEach(word => {
    const item = document.createElement("article");
    item.className = "review-item";
    item.innerHTML = `
      <div class="review-char">${word.char}</div>
      <div>
        <h3>${word.pinyin || ""} · ${word.phrase || word.meaning}</h3>
        <p>${word.association || ""}</p>
        <p>${word.good_sentence || ""}</p>
        ${word.dueDate ? `<p>${escapeHTML(uiValue("revisionDue", word.dueDate))}</p>` : ""}
      </div>
      <button class="mini-button" type="button">${uiText("practice")}</button>
    `;
    item.querySelector("button").addEventListener("click", () => {
      showTab("quiz");
      renderQuiz(word);
    });
    container.appendChild(item);
  });
}

function renderReview() {
  renderWordList(
    els.reviewList,
    recommendedWords(),
    uiText("reviewEmpty")
  );
}

function renderCollection() {
  renderWordList(
    els.collectionList,
    Object.values(state.progress.saved),
    uiText("collectionEmpty")
  );
}

function basePhraseForWord(word) {
  const phrase = (word.phrase || "").replace(/^好词：/, "").trim();
  if (phrase && phrase.includes(word.char)) return phrase;

  const association = (word.association || "").replace(/^好词：/, "").trim();
  if (association && association.includes(word.char)) return association;

  return word.char;
}

function contextPhrasesForWord(word) {
  const target = word.char;
  const base = basePhraseForWord(word);
  const rawPhrases = [
    base,
    `积累${base}`,
    `读懂${base}`,
    `记住${base}`,
    `使用${base}`,
    `${base}例子`,
    `复习${base}`,
    `用${base}造句`,
    `理解${base}`,
    `${base}小挑战`
  ];

  if (target.length === 1) {
    rawPhrases.push(`${target}字词语`, `${target}的好句`, `${base}练习`);
  } else {
    rawPhrases.push(`${target}精神`, `${target}方法`, `${target}好句`);
  }

  return [...new Set(rawPhrases)]
    .filter(phrase => phrase.includes(target) && phrase.length > target.length && phrase.length <= 10)
    .slice(0, 8);
}

function phraseTileForWord(word, index = 0) {
  const phrases = contextPhrasesForWord(word);
  return phrases[index % phrases.length] || word.char;
}

function setChallengeQuestion() {
  if (state.challengeWords.length < 4) return;

  const answer = shuffle(wordsWithEnglishHints(state.challengeWords))[0];
  const targetCount = 3 + Math.floor(Math.random() * 3);
  const tileCount = 10 + Math.floor(Math.random() * 7);
  const distractors = shuffle(state.challengeWords.filter(word => wordKey(word) !== wordKey(answer)))
    .slice(0, tileCount - targetCount);
  const tiles = shuffle([
    ...Array.from({ length: targetCount }, (_, index) => ({
      word: answer,
      phrase: phraseTileForWord(answer, index),
      isTarget: true
    })),
    ...distractors.map((word, index) => ({
      word,
      phrase: phraseTileForWord(word, index),
      isTarget: false
    }))
  ]);

  state.challengeAnswer = answer;
  state.challengeTargetsLeft = targetCount;
  els.challengeTarget.innerHTML = `
    <span class="target-clue">${uiText("findPhrases")}</span>
    <span class="target-meaning">${escapeHTML(getEnglishHint(answer))}</span>
    <span class="target-pinyin">${escapeHTML(answer.pinyin || "")}</span>
  `;
  els.challengeOptions.innerHTML = "";
  els.challengeFeedback.textContent = uiValue("findAll", targetCount);

  tiles.forEach(tile => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "challenge-option hunt-tile";
    button.innerHTML = `
      <span class="hunt-phrase">${escapeHTML(tile.phrase)}</span>
      <span class="hunt-meaning">${escapeHTML(getEnglishHint(tile.word))}</span>
    `;
    button.addEventListener("click", () => {
      if (tile.isTarget && !button.classList.contains("found")) {
        button.classList.add("found");
        button.disabled = true;
        state.challengeScore += 1;
        state.challengeTargetsLeft -= 1;
        els.challengeFeedback.textContent = state.challengeTargetsLeft === 0
          ? uiValue("roundCleared", state.challengeAnswer.char)
          : uiValue("moreToFind", state.challengeTargetsLeft);
        addPoints(3);
        els.challengeScore.textContent = state.challengeScore;
        if (state.challengeTargetsLeft === 0) {
          showRewardToast(uiText("roundClearToast"));
          setTimeout(() => setChallengeQuestion(), CHALLENGE_ROUND_PAUSE_MS);
        }
      } else if (!tile.isTarget) {
        button.classList.add("missed");
        button.disabled = true;
        els.challengeFeedback.textContent = uiText("differentFamily");
        const mistakeKey = wordKey(state.challengeAnswer);
        const misses = (state.progress.mistakes[mistakeKey]?.misses || 0) + 1;
        const intervals = [0, 1, 3, 7];
        state.progress.mistakes[wordKey(state.challengeAnswer)] = {
          ...state.challengeAnswer,
          misses,
          dueDate: dateAfter(intervals[Math.min(misses - 1, intervals.length - 1)])
        };
        saveProgress();
      }
    });
    els.challengeOptions.appendChild(button);
  });
}

function startChallenge() {
  clearInterval(state.challengeTimer);
  state.progress.challengePlays = (state.progress.challengePlays || 0) + 1;
  addDailyQuestProgress("speedRuns");
  addPoints(2);
  const sourceWords = state.filteredWords.length >= 4 ? state.filteredWords : state.words;
  const hintedWords = wordsWithEnglishHints(sourceWords);
  state.challengeWords = shuffle(hintedWords).slice(0, 40);
  state.challengeScore = 0;
  state.challengeTime = CHALLENGE_DURATION_SECONDS;
  els.challengeScore.textContent = "0";
  els.challengeTime.textContent = String(CHALLENGE_DURATION_SECONDS);
  els.challengeFeedback.textContent = "";

  if (state.challengeWords.length < 4) {
    els.challengeFeedback.textContent = uiText("needFourWords");
    return;
  }

  setChallengeQuestion();
  renderMissions();
  state.challengeTimer = setInterval(() => {
    state.challengeTime -= 1;
    els.challengeTime.textContent = state.challengeTime;

    if (state.challengeTime <= 0) {
      clearInterval(state.challengeTimer);
      els.challengeOptions.innerHTML = "";
      els.challengeTarget.textContent = "--";
      els.challengeFeedback.textContent = uiValue("finishedScore", state.challengeScore);
      if (state.challengeScore >= 10 && !state.progress.badges.includes("Speed Challenger")) {
        state.progress.badges.push("Speed Challenger");
      }
      saveProgress();
      renderProgress();
    }
  }, 1000);
}

function startBossChallenge() {
  showTab("challenge");
  const masteredCount = Object.keys(state.progress.mastered).length;
  if (masteredCount < 5) {
    els.challengeFeedback.textContent = uiText("bossUnlock");
    showRewardToast(uiText("bossLocked"));
    return;
  }
  startChallenge();
  addPoints(8);
  if (!state.progress.badges.includes("Boss Challenger")) {
    state.progress.badges.push("Boss Challenger");
  }
  els.challengeFeedback.textContent = uiText("bossStarted");
  saveProgress();
  renderProgress();
}

function buildPodcastStory() {
  const pool = state.filteredWords.length >= 6 ? state.filteredWords : state.words;
  const strongerPool = wordsWithEnglishHints(pool);
  const phraseSource = strongerPool.length >= 6 ? strongerPool : pool;
  const phraseItems = uniquePhrases(shuffle(phraseSource)).slice(0, 6);
  state.podcastWords = phraseItems.map(item => ({
    char: item.char,
    pinyin: item.pinyin,
    phrase: item.phrase,
    good_sentence: item.sentence
  }));

  if (state.podcastWords.length === 0) {
    state.podcastStory = "请先选择一个年级，然后再开始听好词好句练习。";
    return;
  }

  const theme = shuffle(COMPO_THEMES)[0];
  const oralPattern = shuffle(ORAL_PATTERNS)[0];
  const phrases = phraseItems.map(item => item.phrase).join("、");
  const phraseLines = phraseItems
    .slice(0, 5)
    .map((item, index) => {
      const meaning = getEnglishHint({ phrase: item.phrase });
      const meaningText = meaning ? `（${meaning}）` : "";
      return `${index + 1}. ${item.phrase}${meaningText}。${item.sentence || `学习「${item.char}」时，可以用「${item.phrase}」来帮助记忆。`}`;
    })
    .join("\n");
  const selectedPhrases = phraseItems.slice(0, 3).map(item => item.phrase);
  const bridgeSentence = selectedPhrases.length
    ? `今天的小作文会练习这些好词：${selectedPhrases.join("、")}。`
    : "今天的小作文会练习课本里的生字和好词。";

  state.podcastStory = [
    `欢迎来到 NiHao Buddy 好词好句听力练习。今天的主题是：${theme.title}。`,
    `第一部分：先听好词。${phrases}。请一边听，一边想这些词可以放进什么作文情节里。`,
    `第二部分：听好句。\n${phraseLines}`,
    `第三部分：口试表达句。${oralPattern}`,
    `第四部分：小作文示范。${bridgeSentence}${theme.opening}${theme.middle}${theme.ending}`,
    `最后复习一次：${phrases}。听完后，可以选一个好词，自己造一句话。`
  ].join("\n\n");
}

function renderPodcast() {
  if (!state.podcastStory) buildPodcastStory();

  els.podcastWords.innerHTML = "";
  state.podcastWords.forEach(word => {
    const chip = document.createElement("span");
    chip.textContent = `${word.char} ${word.pinyin || ""}`;
    els.podcastWords.appendChild(chip);
  });

  els.podcastStory.textContent = state.podcastStory;
}

function playPodcast() {
  stopAlbumAudio();
  if (!state.podcastStory) buildPodcastStory();
  state.progress.listenedStories = (state.progress.listenedStories || 0) + 1;
  addDailyQuestProgress("listening");
  speak(state.podcastStory, { pitch: 1.28, rate: 0.82 });
  addPoints(4);
  renderMissions();
}

function chineseLength(text) {
  return (text.match(/[\u4e00-\u9fff]/g) || []).length;
}

function countMatches(text, words) {
  return words.filter(word => text.includes(word)).length;
}

function scoreBand(score, max) {
  const ratio = score / max;
  if (ratio >= 0.85) return uiText("scoreStrong");
  if (ratio >= 0.65) return uiText("scoreDeveloping");
  if (ratio >= 0.45) return uiText("scoreNeedsDetail");
  return uiText("scoreTryAgain");
}

function renderMarking(container, title, score, max, points) {
  container.innerHTML = `
    <div class="marking-score">
      <strong>${score}/${max}</strong>
      <span>${scoreBand(score, max)}</span>
    </div>
    <h4>${title}</h4>
    <ul>
      ${points.map(point => `<li>${escapeHTML(point)}</li>`).join("")}
    </ul>
    <p class="marking-note">${uiText("unofficialNote")}</p>
  `;
}

function currentPsleSet() {
  if (!state.psleSet) state.psleSet = shuffle(PSLE_PRACTICE_SETS)[0];
  return state.psleSet;
}

function renderPslePractice() {
  const set = currentPsleSet();
  els.psleCompoTitle.textContent = set.compoTitle;
  els.psleCompoPrompt.textContent = set.compoPrompt;
  els.psleOralTitle.textContent = set.oralTitle;
  els.psleReadingPassage.textContent = `来源：${set.source || "NiHao Buddy"}｜价值观：${set.values || "PSLE 口试"}｜情境：${set.readingPassage}`;
  els.psleOralQuestion.textContent = `会话问题：${set.oralQuestion} ${set.strategy || ""}`;
  els.psleModelAnswer.textContent = modelAnswerForSet(set);
}

function newPsleSet() {
  state.psleSet = shuffle(PSLE_PRACTICE_SETS)[0];
  els.psleCompoAnswer.value = "";
  els.psleOralAnswer.value = "";
  els.psleCompoFeedback.innerHTML = "";
  els.psleOralFeedback.innerHTML = "";
  renderPslePractice();
}

function playOralPart(part) {
  stopAlbumAudio();
  const set = currentPsleSet();
  const modelAnswer = modelAnswerForSet(set);
  const textByPart = {
    passage: `${set.oralTitle}。${set.readingPassage}`,
    question: `${set.oralQuestion}。${set.strategy || ""}`,
    model: `示范答案。${modelAnswer}`
  };
  speak(textByPart[part] || modelAnswer, { pitch: 1.12, rate: 0.78 });
}

function markComposition() {
  const set = currentPsleSet();
  const answer = els.psleCompoAnswer.value.trim();
  const length = chineseLength(answer);
  const themeHits = countMatches(answer, set.themeWords);
  const hasOpening = /一开始|那天|有一次|星期|放学|早上|下午/.test(answer);
  const hasProblem = /困难|问题|着急|害怕|紧张|麻烦|不知所措|伤心/.test(answer);
  const hasAction = /于是|后来|我决定|我马上|我帮助|我努力|解决|练习/.test(answer);
  const hasReflection = /明白|学到|以后|从此|道理|启发/.test(answer);
  let score = 0;

  score += Math.min(8, Math.floor(length / 25));
  score += Math.min(6, themeHits * 2);
  score += hasOpening ? 3 : 0;
  score += hasProblem ? 4 : 0;
  score += hasAction ? 4 : 0;
  score += hasReflection ? 3 : 0;
  score = clamp(score, 0, 30);

  const tips = [
    length >= 180
      ? (state.uiLanguage === "zh" ? "篇幅足够，内容比较充实。" : "Length is healthy for practice.")
      : (state.uiLanguage === "zh" ? "内容还可以更具体，练习时尽量写到至少180个华文字。" : "Add more details. Aim for at least 180 Chinese characters in this practice box."),
    themeHits >= 3
      ? (state.uiLanguage === "zh" ? "你已经使用了几个主题词，表达更贴题。" : "You used several theme words.")
      : (state.uiLanguage === "zh" ? `可以多用主题词：${set.themeWords.join("、")}。` : `Try to use more topic words: ${set.themeWords.join("、")}。`),
    hasOpening && hasProblem && hasAction
      ? (state.uiLanguage === "zh" ? "故事结构清楚，有情境、问题和行动。" : "Story flow is clear: situation, problem, action.")
      : (state.uiLanguage === "zh" ? "故事结构要更清楚：情境、问题、行动、结果。" : "Make the story clearer: situation, problem, action, result."),
    hasReflection
      ? (state.uiLanguage === "zh" ? "结尾有反思或学到的道理。" : "You included a reflection or lesson learnt.")
      : (state.uiLanguage === "zh" ? "结尾可以加入反思，例如“我明白了……”“我学到……”。" : "Add a final reflection using 明白、学到、以后 or 道理."),
    set.source
      ? (state.uiLanguage === "zh" ? `资料主题：${set.oralTitle}。结尾可以扣回价值观：${set.values || "责任感、关怀、和谐"}。` : `Source theme: ${set.oralTitle}. Use the same values in your ending: ${set.values || "责任感、关怀、和谐"}。`)
      : (state.uiLanguage === "zh" ? "结尾要回到题目主题。" : "Keep your ending linked to the theme."),
    state.uiLanguage === "zh"
      ? `可尝试的好词：${suggestedPhrasesForSet(set).join("、") || "认真负责、坚持不懈、互相关心"}。`
      : `Stronger phrases to try: ${suggestedPhrasesForSet(set).join("、") || "认真负责、坚持不懈、互相关心"}。`
  ];

  state.progress.psleAttempts = state.progress.psleAttempts || [];
  state.progress.psleAttempts.push({ type: "composition", score, max: 30, date: todayKey(), theme: set.compoTitle });
  addDailyQuestProgress("listening");
  addPoints(5);
  renderMarking(els.psleCompoFeedback, uiText("compoFeedback"), score, 30, tips);
}

function markOralAnswer() {
  const set = currentPsleSet();
  const answer = els.psleOralAnswer.value.trim();
  const length = chineseLength(answer);
  const themeHits = countMatches(answer, set.themeWords);
  const hasOpinion = /我认为|我觉得|我同意|我不同意|值得/.test(answer);
  const hasReason = /因为|所以|原因|这是因为/.test(answer);
  const hasExample = /例如|比如|有一次|在学校|在家里|我也/.test(answer);
  const hasConclusion = /总的来说|最后|因此|这提醒我们/.test(answer);
  let score = 0;

  score += Math.min(8, Math.floor(length / 18));
  score += hasOpinion ? 5 : 0;
  score += hasReason ? 5 : 0;
  score += hasExample ? 5 : 0;
  score += hasConclusion ? 3 : 0;
  score += Math.min(4, themeHits);
  score = clamp(score, 0, 30);

  const tips = [
    length >= 80
      ? (state.uiLanguage === "zh" ? "作答内容足够，可以作为口试练习。" : "Answer has enough speaking content for practice.")
      : (state.uiLanguage === "zh" ? "可以说得更完整，尽量回答4到6句华文句子。" : "Speak more. Try to give at least 4-6 Chinese sentences."),
    hasOpinion ? (state.uiLanguage === "zh" ? "你有清楚表达看法。" : "You gave a clear opinion.") : (state.uiLanguage === "zh" ? "开头先表明看法，例如：我认为……" : "Start with a clear opinion, for example: 我认为……"),
    hasReason ? (state.uiLanguage === "zh" ? "你有说明原因。" : "You explained your reason.") : (state.uiLanguage === "zh" ? "用“因为/所以”把原因说清楚。" : "Use 因为/所以 to explain your reason."),
    hasExample ? (state.uiLanguage === "zh" ? "你加入了个人或学校生活例子。" : "You included a personal or school example.") : (state.uiLanguage === "zh" ? "加入一个学校或家庭生活的例子。" : "Add one example from school or home life."),
    hasConclusion ? (state.uiLanguage === "zh" ? "结尾有总结。" : "You ended with a conclusion.") : (state.uiLanguage === "zh" ? "结尾可用“总的来说”或“这提醒我们”。" : "End with 总的来说 or 这提醒我们."),
    set.strategy || "Use 5W1H plus FABCC: 感受、看法、原因、批评/称赞、总结。",
    state.uiLanguage === "zh"
      ? `可用口试句式：${suggestedPhrasesForSet(set).slice(0, 4).join("、") || "我认为、因为、例如、总的来说"}。`
      : `Useful oral phrases: ${suggestedPhrasesForSet(set).slice(0, 4).join("、") || "我认为、因为、例如、总的来说"}。`
  ];

  state.progress.psleAttempts = state.progress.psleAttempts || [];
  state.progress.psleAttempts.push({ type: "oral", score, max: 30, date: todayKey(), theme: set.oralTitle });
  addDailyQuestProgress("listening");
  addPoints(5);
  renderMarking(els.psleOralFeedback, uiText("oralFeedback"), score, 30, tips);
}

function startOralRecording() {
  stopAlbumAudio();
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    els.psleOralFeedback.innerHTML = `<p class="empty-state">${uiText("recordingUnsupported")}</p>`;
    return;
  }

  state.recognition = new Recognition();
  state.recognition.lang = "zh-CN";
  state.recognition.continuous = true;
  state.recognition.interimResults = true;
  state.isRecording = true;
  els.psleOralFeedback.innerHTML = `<p class="empty-state">${uiText("recordingNow")}</p>`;

  state.recognition.onresult = event => {
    let transcript = "";
    for (let index = 0; index < event.results.length; index += 1) {
      transcript += event.results[index][0].transcript;
    }
    els.psleOralAnswer.value = transcript;
  };
  state.recognition.onerror = event => {
    els.psleOralFeedback.innerHTML = `<p class="empty-state">${escapeHTML(uiValue("recordingIssue", event.error))}</p>`;
  };
  state.recognition.onend = () => {
    state.isRecording = false;
  };
  state.recognition.start();
}

function stopOralRecording() {
  if (state.recognition && state.isRecording) {
    state.recognition.stop();
  }
  state.isRecording = false;
}

function renderDashboard() {
  if (!els.dashboardGrid) return;

  const mistakes = Object.values(state.progress.mistakes || {});
  const revealWords = Object.values(state.progress.dictationReveals || {})
    .sort((a, b) => (b.count || 0) - (a.count || 0));
  const revealTotal = revealWords.reduce((sum, word) => sum + (word.count || 0), 0);
  const revealSummary = revealWords
    .slice(0, 5)
    .map(word => `${word.char} x${word.count || 0}`)
    .join("、") || uiText("noReveals");
  const attempts = state.progress.psleAttempts || [];
  const recentScores = attempts.slice(-4).map(item => {
    const type = state.uiLanguage === "zh"
      ? (item.type === "composition" ? "作文" : "口试")
      : item.type;
    return `${type}: ${item.score}/${item.max}`;
  }).join(", ") || uiText("noAttempts");
  const weakWords = mistakes
    .sort((a, b) => (b.misses || 0) - (a.misses || 0))
    .slice(0, 6)
    .map(word => `${word.char} (${word.pinyin || ""})`)
    .join("、") || uiText("noWeakWords");
  const dueToday = mistakes.filter(word => !word.dueDate || word.dueDate <= todayKey()).length;
  const averageScore = attempts.length
    ? Math.round(attempts.reduce((sum, item) => sum + (item.score / item.max) * 100, 0) / attempts.length)
    : 0;

  els.dashboardGrid.innerHTML = `
    <article class="dashboard-card">
      <strong>${Object.keys(state.progress.mastered).length}</strong>
      <span>${uiText("wordsLearned")}</span>
      <p>${uiValue("dashboardSavedWords", Object.keys(state.progress.saved).length)}</p>
    </article>
    <article class="dashboard-card">
      <strong>${dueToday}</strong>
      <span>${uiText("dueForReview")}</span>
      <p>${weakWords}</p>
    </article>
    <article class="dashboard-card">
      <strong>${averageScore || "--"}${averageScore ? "%" : ""}</strong>
      <span>${uiText("psleAverage")}</span>
      <p>${recentScores}</p>
    </article>
    <article class="dashboard-card">
      <strong>${revealTotal}</strong>
      <span>${uiText("dictationReveals")}</span>
      <p>${revealSummary}</p>
    </article>
    <article class="dashboard-card">
      <strong>${learnerTitle()}</strong>
      <span>${uiText("suggestedNext")}</span>
      <p>${dueToday ? uiText("dashboardReviewFirst") : uiText("dashboardClearQuest")}</p>
    </article>
  `;
}

const SAMPLE_IMPORT_CSV = `char,pinyin,meaning,grade
坚持,jiān chí,persevere,custom
责任,zé rèn,responsibility,custom
互相帮助,hù xiāng bāng zhù,help one another,custom
珍惜时间,zhēn xī shí jiān,cherish time,custom`;

async function importLearningData() {
  const csvText = els.importText.value.trim();
  if (!csvText) {
    els.importFeedback.textContent = uiText("pasteCsvFirst");
    return;
  }

  els.importFeedback.textContent = uiText("importingData");

  try {
    const response = await fetch("/api/import_words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        csvText,
        grade: els.importGrade.value.trim() || "custom"
      })
    });
    const result = await response.json();
    if (!response.ok) {
      els.importFeedback.textContent = result.error || uiText("importFailed");
      return;
    }

    const importedGrade = els.importGrade.value.trim() || "custom";
    els.importFeedback.textContent = uiValue("importSavedTo", result.message, result.saved_to);
    await loadGrades();
    state.grade = importedGrade;
    els.gradeSelect.value = importedGrade;
    window.history.replaceState({}, "", `?grade=${state.grade}`);
    await loadWords();
  } catch (error) {
    console.error(error);
    els.importFeedback.textContent = uiText("importServerFailed");
  }
}

async function importWordHelpers() {
  const csvText = els.helperImportText.value.trim();
  if (!csvText) {
    els.helperImportFeedback.textContent = uiText("pasteHelperFirst");
    return;
  }

  els.helperImportFeedback.textContent = uiText("importingHelper");

  try {
    const response = await fetch("/api/import_word_helpers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        csvText,
        grade: els.helperImportGrade.value.trim()
      })
    });
    const result = await response.json();
    if (!response.ok) {
      const skippedText = result.skipped?.length ? uiValue("skippedRows", result.skipped.length) : "";
      els.helperImportFeedback.textContent = `${result.error || uiText("importFailed")}${skippedText}`;
      return;
    }

    const skippedText = result.skipped?.length ? uiValue("skippedMismatch", result.skipped.length) : "";
    els.helperImportFeedback.textContent = `${result.message}${skippedText}`;
    state.albumIndex = 0;
    await loadWords();
  } catch (error) {
    console.error(error);
    els.helperImportFeedback.textContent = uiText("importServerFailed");
  }
}

function loadImportFile() {
  const file = els.importFile.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    els.importText.value = String(reader.result || "");
    els.importFeedback.textContent = uiValue("loadedFile", file.name);
  };
  reader.onerror = () => {
    els.importFeedback.textContent = uiText("readFileFailed");
  };
  reader.readAsText(file, "utf-8");
}

function sourcePayload() {
  return {
    content_type: els.sourceType.value,
    content: els.sourceContent.value.trim(),
    pinyin: els.sourcePinyin.value.trim(),
    meaning: els.sourceMeaning.value.trim(),
    grade: els.sourceGrade.value.trim() || "custom",
    theme: els.sourceTheme.value.trim(),
    note: els.sourceNote.value.trim()
  };
}

async function saveManualSource() {
  const payload = sourcePayload();
  if (!payload.content) {
    els.sourceFeedback.textContent = uiText("enterSource");
    return;
  }

  els.sourceFeedback.textContent = uiText("savingSource");

  try {
    const response = await fetch("/api/learning_sources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) {
      els.sourceFeedback.textContent = result.error || uiText("couldNotSave");
      return;
    }

    els.sourceFeedback.textContent = result.also_added_to_word_bank
      ? uiValue("addedToWordBase", result.message)
      : result.message;

    await renderSourceLibrary();
    if (result.also_added_to_word_bank) {
      await loadGrades();
      state.grade = payload.grade;
      els.gradeSelect.value = payload.grade;
      window.history.replaceState({}, "", `?grade=${state.grade}`);
      await loadWords();
    }
  } catch (error) {
    console.error(error);
    els.sourceFeedback.textContent = uiText("saveFailed");
  }
}

async function renderSourceLibrary() {
  if (!els.sourceLibraryList) return;

  try {
    const response = await fetch("/api/learning_sources");
    const sources = await response.json();
    if (!sources.length) {
      els.sourceLibraryList.innerHTML = `<p class="empty-state">${uiText("sourceEmpty")}</p>`;
      return;
    }

    els.sourceLibraryList.innerHTML = "";
    sources.forEach(source => {
      const article = document.createElement("article");
      article.className = "source-library-item";
      article.innerHTML = `
        <div>
          <span>${escapeHTML(source.content_type)} · ${escapeHTML(source.grade || "custom")}</span>
          <strong>${escapeHTML(source.content)}</strong>
          <p>${escapeHTML(source.meaning || source.theme || uiText("savedLearningSource"))}</p>
          ${source.note ? `<small>${escapeHTML(source.note)}</small>` : ""}
        </div>
        <button class="mini-button" type="button">${uiText("listen")}</button>
      `;
      article.querySelector("button").addEventListener("click", () => speak(source.content));
      els.sourceLibraryList.appendChild(article);
    });
  } catch (error) {
    console.error(error);
    els.sourceLibraryList.innerHTML = `<p class="empty-state">${uiText("sourceLoadFailed")}</p>`;
  }
}

function showTab(tabName, options = {}) {
  const currentTab = document.querySelector(".tab-panel.active")?.id.replace("-panel", "");
  const isLeavingLearn = currentTab === "learn" && tabName !== "learn";
  if (isLeavingLearn || tabName !== "learn") {
    stopAlbumAudio();
  } else if (currentTab && currentTab !== tabName) {
    stopSpeaking();
  }
  document.querySelectorAll(".tab-button").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });
  let activePanel = null;
  document.querySelectorAll(".tab-panel").forEach(panel => {
    const isActive = panel.id === `${tabName}-panel`;
    panel.classList.toggle("active", isActive);
    if (isActive) activePanel = panel;
  });
  if (tabName === "learn") {
    setAlbumPlaying(state.albumPlaying);
  }

  const shouldScroll = options.scroll !== false;
  if (shouldScroll && activePanel) {
    requestAnimationFrame(() => {
      activePanel.scrollIntoView({ behavior: "smooth", block: "start" });
      const heading = activePanel.querySelector("h2, h3");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    });
  }
}

function renderAll() {
  renderProgress();
  renderFlashcards();
  renderDictation();
  renderReview();
  renderCollection();
  renderPodcast();
  renderPslePractice();
  renderSourceLibrary();
  renderMissions();
  applyLanguage();
}

async function loadSourceStatus() {
  if (IS_GITHUB_PAGES) {
    els.sourceStatus.textContent = "GitHub Pages static demo: core vocabulary works; local Flask unlocks import and database tools.";
    els.sourceStatus.title = "Static GitHub Pages mode";
    return;
  }

  try {
    const response = await fetch("/api/source");
    const source = await response.json();
    els.sourceStatus.textContent = uiValue("sourceStatus", source.name, source.active_data);
    els.sourceStatus.title = source.status;
  } catch {
    els.sourceStatus.textContent = uiText("usingLocalData");
  }
}

async function loadGrades() {
  let grades = [];
  try {
    const response = await fetch("/api/grades");
    if (!response.ok) throw new Error("API unavailable");
    grades = await response.json();
  } catch (error) {
    console.warn("Using static grade data", error);
    grades = await loadStaticGrades();
  }

  els.gradeSelect.innerHTML = "";
  grades.forEach(item => {
    const option = document.createElement("option");
    option.value = item.grade;
    option.textContent = `P${item.grade} (${item.total} words)`;
    els.gradeSelect.appendChild(option);
  });

  if (!grades.some(item => item.grade === state.grade)) {
    state.grade = grades[0]?.grade || "1";
  }
  els.gradeSelect.value = state.grade;
}

async function loadWords() {
  const gradeToLoad = state.grade;
  const loadToken = ++state.loadToken;

  state.words = [];
  state.dictationWords = [];
  state.dictationCurrent = null;
  state.dictationGroupIndex = 0;
  state.filteredWords = [];
  state.podcastStory = "";
  els.wordCount.textContent = uiValue("loadingWords", gradeToLoad);
  els.flashcards.innerHTML = `<p class="empty-state">${uiText("loadingWordQuest")}</p>`;
  els.quizQuestion.textContent = uiText("loadingQuiz");
  els.quizOptions.innerHTML = "";

  try {
    const response = await fetch(`/api/words?grade=${gradeToLoad}`);
    if (!response.ok) throw new Error("API unavailable");
    if (loadToken !== state.loadToken || gradeToLoad !== state.grade) return;
    state.words = await response.json();
  } catch (error) {
    console.warn("Using static word data", error);
    state.words = await loadStaticWords(gradeToLoad);
  }
  state.dictationWords = buildDictationWords(state.words);
  if (loadToken !== state.loadToken || gradeToLoad !== state.grade) return;

  state.filteredWords = state.words;
  renderLessonFilter();
  renderAll();
  renderQuiz();
  buildPodcastStory();
  renderPodcast();
}

function resetProgress() {
  const learner = state.currentUser?.displayName || uiText("thisLearner");
  if (!confirm(uiValue("resetConfirm", learner))) return;
  localStorage.removeItem(userStorageKey());
  state.progress = defaultProgress();
  renderAll();
}

function bindEvents() {
  document.querySelectorAll(".profile-choice").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedLoginUser = button.dataset.loginUser;
      document.querySelectorAll(".profile-choice").forEach(choice => {
        choice.classList.toggle("active", choice === button);
      });
      els.passwordInput.value = "";
      els.loginFeedback.textContent = uiValue("enterPasswordFor", USERS[state.selectedLoginUser].displayName);
      els.passwordInput.focus();
    });
  });

  els.loginButton.addEventListener("click", loginSelectedProfile);
  els.passwordInput.addEventListener("keydown", event => {
    if (event.key === "Enter") loginSelectedProfile();
  });
  els.logoutButton.addEventListener("click", () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    showLogin();
  });

  els.uiLanguageSelect.addEventListener("change", () => {
    state.uiLanguage = els.uiLanguageSelect.value;
    localStorage.setItem(UI_LANGUAGE_KEY, state.uiLanguage);
    renderAll();
  });

  document.querySelectorAll(".mode-button").forEach(button => {
    button.addEventListener("click", () => {
      state.appMode = button.dataset.modeChoice || "student";
      localStorage.setItem(APP_MODE_KEY, state.appMode);
      stopAlbumAudio();
      applyLanguage();
      showTab("home");
    });
  });

  document.querySelectorAll(".tab-button").forEach(button => {
    button.addEventListener("pointerdown", () => {
      if (button.dataset.tab !== "learn") stopAlbumAudio();
    });
    button.addEventListener("click", () => showTab(button.dataset.tab));
  });
  document.getElementById("hero-word-album-button")?.addEventListener("click", () => showTab("learn"));
  document.querySelectorAll(".feature-card").forEach(card => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.addEventListener("pointerdown", () => {
      if (card.dataset.tabTarget !== "learn") stopAlbumAudio();
    });
    card.addEventListener("click", () => showTab(card.dataset.tabTarget));
    card.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      showTab(card.dataset.tabTarget);
    });
  });

  els.gradeSelect.addEventListener("change", () => {
    state.grade = els.gradeSelect.value;
    state.albumIndex = 0;
    window.history.replaceState({}, "", `?grade=${state.grade}`);
    loadWords();
  });

  els.lessonFilter.addEventListener("change", () => {
    state.albumIndex = 0;
    renderFlashcards();
    renderQuiz();
  });

  els.searchInput.addEventListener("input", () => {
    state.albumIndex = 0;
    renderFlashcards();
    renderQuiz();
  });

  els.albumSoundButton.addEventListener("click", enableAlbumSound);
  els.albumPrevButton.addEventListener("click", () => {
    moveAlbum(-1, { keepPlaying: state.albumPlaying, speakNow: true });
  });
  els.albumNextButton.addEventListener("click", () => {
    moveAlbum(1, { keepPlaying: state.albumPlaying, speakNow: true });
  });
  els.albumPlayButton.addEventListener("click", () => {
    const shouldPlay = !state.albumPlaying;
    if (shouldPlay) {
      state.albumSoundEnabled = true;
      setAlbumSoundButton(true);
    }
    setAlbumPlaying(shouldPlay);
  });
  els.albumRandomButton.addEventListener("click", () => {
    state.albumMode = "random";
    state.albumIndex = 0;
    state.albumPlaying = true;
    renderFlashcards();
  });
  els.albumFrequencyButton.addEventListener("click", () => {
    state.albumMode = "frequency";
    state.albumIndex = 0;
    state.albumPlaying = true;
    renderFlashcards();
  });
  document.getElementById("save-helper-button").addEventListener("click", saveWordHelperEdit);
  document.getElementById("cancel-helper-button").addEventListener("click", closeWordHelperEditor);

  document.getElementById("claim-daily-reward-button").addEventListener("click", claimDailyReward);
  document.getElementById("boss-challenge-button").addEventListener("click", startBossChallenge);
  document.getElementById("new-quiz-button").addEventListener("click", () => renderQuiz());
  document.getElementById("new-dictation-button").addEventListener("click", newDictationWord);
  els.dictationGroupSelect.addEventListener("change", () => {
    state.dictationGroupIndex = Number(els.dictationGroupSelect.value) || 0;
    state.dictationCurrent = null;
    renderDictation();
  });
  document.getElementById("play-dictation-button").addEventListener("click", () => playDictationWord(0.86));
  document.getElementById("replay-dictation-button").addEventListener("click", () => playDictationWord(0.68));
  document.getElementById("reveal-dictation-button").addEventListener("click", revealDictationAnswer);
  document.getElementById("dictation-correct-button").addEventListener("click", () => recordDictationResult(true));
  document.getElementById("dictation-review-button").addEventListener("click", () => recordDictationResult(false));
  document.getElementById("next-dictation-button").addEventListener("click", newDictationWord);
  document.getElementById("refresh-review-button").addEventListener("click", renderReview);
  document.getElementById("start-challenge-button").addEventListener("click", startChallenge);
  document.getElementById("new-podcast-button").addEventListener("click", () => {
    buildPodcastStory();
    renderPodcast();
  });
  document.getElementById("play-podcast-button").addEventListener("click", playPodcast);
  document.getElementById("stop-podcast-button").addEventListener("click", stopSpeaking);
  document.getElementById("new-psle-button").addEventListener("click", newPsleSet);
  document.getElementById("play-oral-passage-button").addEventListener("click", () => playOralPart("passage"));
  document.getElementById("play-oral-question-button").addEventListener("click", () => playOralPart("question"));
  document.getElementById("play-model-answer-button").addEventListener("click", () => playOralPart("model"));
  document.getElementById("stop-oral-audio-button").addEventListener("click", stopSpeaking);
  document.getElementById("mark-compo-button").addEventListener("click", markComposition);
  document.getElementById("record-oral-button").addEventListener("click", startOralRecording);
  document.getElementById("stop-recording-button").addEventListener("click", stopOralRecording);
  document.getElementById("mark-oral-button").addEventListener("click", markOralAnswer);
  document.getElementById("sample-import-button").addEventListener("click", () => {
    els.importText.value = SAMPLE_IMPORT_CSV;
    els.importFeedback.textContent = uiText("sampleLoaded");
  });
  document.getElementById("import-file").addEventListener("change", loadImportFile);
  document.getElementById("import-data-button").addEventListener("click", importLearningData);
  document.getElementById("import-helper-button").addEventListener("click", importWordHelpers);
  document.getElementById("save-source-button").addEventListener("click", saveManualSource);
  document.getElementById("listen-source-button").addEventListener("click", () => {
    const text = els.sourceContent.value.trim();
    if (!text) {
      els.sourceFeedback.textContent = uiText("enterSource");
      return;
    }
    speak(text, { pitch: 1.2, rate: 0.85 });
  });
  document.getElementById("refresh-sources-button").addEventListener("click", renderSourceLibrary);
  document.getElementById("refresh-dashboard-button").addEventListener("click", renderDashboard);
  document.getElementById("reset-progress-button").addEventListener("click", resetProgress);
  document.getElementById("clear-collection-button").addEventListener("click", () => {
    state.progress.saved = {};
    saveProgress();
    renderAll();
  });
}

async function init() {
  bindEvents();
  applyLanguage();
  window.scrollTo({ top: 0, left: 0 });
  setTimeout(() => window.scrollTo({ top: 0, left: 0 }), 150);
  await loadSourceStatus();
  await loadGrades();
  await renderSourceLibrary();

  const savedUsername = localStorage.getItem(CURRENT_USER_KEY);
  if (savedUsername && USERS[savedUsername]) {
    await activateProfile(savedUsername, { keepCurrentGrade: false });
  } else {
    showLogin();
  }
}

init();
