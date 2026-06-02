const STORAGE_KEY = "nihaoBuddyLearningData";
const CURRENT_USER_KEY = "nihaoBuddyCurrentUser";
const MAX_VISIBLE_CARDS = 120;
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
  }
};

function todayKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function defaultProgress() {
  return {
    points: 0,
    streak: 0,
    badges: [],
    completedQuizzes: 0,
    correctAnswers: 0,
    quizCombo: 0,
    listenedStories: 0,
    challengePlays: 0,
    lastActiveDate: "",
    mastered: {},
    mistakes: {},
    saved: {}
  };
}

const state = {
  grade: new URLSearchParams(window.location.search).get("grade") || "1",
  currentUser: null,
  selectedLoginUser: "enzo",
  words: [],
  filteredWords: [],
  quizAnswer: null,
  challengeAnswer: null,
  challengeWords: [],
  challengeScore: 0,
  challengeTime: 30,
  challengeTimer: null,
  loadToken: 0,
  podcastWords: [],
  podcastStory: "",
  progress: defaultProgress()
};

const els = {
  loginScreen: document.getElementById("login-screen"),
  loginButton: document.getElementById("login-button"),
  passwordInput: document.getElementById("password-input"),
  loginFeedback: document.getElementById("login-feedback"),
  profileName: document.getElementById("profile-name"),
  profileMeta: document.getElementById("profile-meta"),
  logoutButton: document.getElementById("logout-button"),
  sourceStatus: document.getElementById("source-status"),
  gradeSelect: document.getElementById("grade-select"),
  lessonFilter: document.getElementById("lesson-filter"),
  searchInput: document.getElementById("search-input"),
  flashcards: document.getElementById("flashcards"),
  wordCount: document.getElementById("word-count"),
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
  podcastWords: document.getElementById("podcast-words"),
  podcastStory: document.getElementById("podcast-story"),
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
  els.profileMeta.textContent = `${user.description} · P${user.defaultGrade} default`;
  els.loginScreen.classList.add("hidden");
  document.body.classList.remove("login-open");
}

function showLogin() {
  stopSpeaking();
  clearInterval(state.challengeTimer);
  state.currentUser = null;
  state.progress = defaultProgress();
  els.profileName.textContent = "Not logged in";
  els.profileMeta.textContent = "Choose a student profile";
  els.passwordInput.value = "";
  els.loginFeedback.textContent = "Test passwords: enzo123 or enya123";
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
  renderProgress();
  await loadWords();
}

function loginSelectedProfile() {
  const user = USERS[state.selectedLoginUser];
  const password = els.passwordInput.value.trim();

  if (!user || password !== user.password) {
    els.loginFeedback.textContent = "Wrong password. Try enzo123 or enya123.";
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

function daysBetween(firstDate, secondDate) {
  const first = new Date(`${firstDate}T00:00:00`);
  const second = new Date(`${secondDate}T00:00:00`);
  return Math.round((second - first) / 86400000);
}

function getLesson(word) {
  const match = word.meaning.match(/第(\d+)课/);
  return match ? match[1] : "other";
}

function chooseChineseVoice() {
  if (!("speechSynthesis" in window)) return null;

  const voices = speechSynthesis.getVoices();
  const chineseVoices = voices.filter(voice => /^zh/i.test(voice.lang));
  const childLikeNames = ["xiaoxiao", "xiaoyi", "meijia", "ting-ting", "tingting", "sin-ji", "mei-jia"];

  return chineseVoices.find(voice =>
    childLikeNames.some(name => voice.name.toLowerCase().includes(name))
  ) || chineseVoices.find(voice => voice.lang === "zh-CN") || chineseVoices[0] || null;
}

function speak(text, options = {}) {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.voice = chooseChineseVoice();
  utterance.pitch = options.pitch || 1.18;
  utterance.rate = options.rate || 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = chooseChineseVoice;
}

function stopSpeaking() {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
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
  addPoints(5);
  saveProgress();
  renderAll();
}

function recordQuizAnswer(word, isCorrect) {
  state.progress.completedQuizzes += 1;

  if (isCorrect) {
    state.progress.correctAnswers += 1;
    state.progress.quizCombo = (state.progress.quizCombo || 0) + 1;
    state.progress.mastered[wordKey(word)] = word;
    delete state.progress.mistakes[wordKey(word)];
    addPoints(10);
  } else {
    state.progress.quizCombo = 0;
    state.progress.mistakes[wordKey(word)] = {
      ...word,
      misses: (state.progress.mistakes[wordKey(word)]?.misses || 0) + 1
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
    els.badges.innerHTML = "<li>No badges yet. Keep learning!</li>";
    return;
  }

  state.progress.badges.forEach(badge => {
    const li = document.createElement("li");
    li.textContent = badge;
    els.badges.appendChild(li);
  });

  renderMissions();
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
    "Mission cleared: 5 words learned",
    `${Math.min(masteredCount, 5)}/5 words cleared`
  );
  updateMission(
    els.missionReviewBar,
    els.missionReviewStatus,
    quizCount,
    3,
    "Mission cleared: quiz training done",
    `${Math.min(quizCount, 3)}/3 quiz answers`
  );
  updateMission(
    els.missionChallengeBar,
    els.missionChallengeStatus,
    challengeCount,
    1,
    "Mission cleared: speed run tried",
    `${Math.min(challengeCount, 1)}/1 speed run`
  );
  updateMission(
    els.missionListenBar,
    els.missionListenStatus,
    listenCount,
    1,
    "Mission cleared: story listened",
    `${Math.min(listenCount, 1)}/1 story listened`
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

  els.lessonFilter.innerHTML = '<option value="all">All lessons</option>';
  lessons.forEach(lesson => {
    const option = document.createElement("option");
    option.value = lesson;
    option.textContent = `Lesson ${lesson}`;
    els.lessonFilter.appendChild(option);
  });
}

function renderFlashcards() {
  applyFilters();
  els.flashcards.innerHTML = "";
  const visibleWords = state.filteredWords.slice(0, MAX_VISIBLE_CARDS);
  els.wordCount.textContent = state.filteredWords.length > visibleWords.length
    ? `${state.filteredWords.length} words found from P${state.grade}; showing first ${visibleWords.length}`
    : `${state.filteredWords.length} words shown from P${state.grade}`;

  if (state.filteredWords.length === 0) {
    els.flashcards.innerHTML = '<p class="empty-state">No words match this filter.</p>';
    return;
  }

  visibleWords.forEach(word => {
    const key = wordKey(word);
    const card = document.createElement("article");
    card.className = "word-card";
    card.innerHTML = `
      <div class="char">${word.char}</div>
      <div class="pinyin">${word.pinyin || ""}</div>
      <div class="meaning">${word.meaning}</div>
      <div class="phrase">${word.association || `好词：${word.phrase || word.char}`}</div>
      <div class="good-sentence">${word.good_sentence || ""}</div>
      <div class="card-actions">
        <button class="mini-button" type="button" data-action="speak">Listen</button>
        <button class="mini-button" type="button" data-action="sound-link">Audio</button>
        <button class="mini-button ${state.progress.saved[key] ? "saved" : ""}" type="button" data-action="save">
          ${state.progress.saved[key] ? "Saved" : "Save"}
        </button>
        <button class="mini-button" type="button" data-action="master">Know</button>
        <button class="mini-button" type="button" data-action="quiz">Quiz</button>
      </div>
    `;

    card.querySelector('[data-action="speak"]').addEventListener("click", () => speak(word.char));
    card.querySelector('[data-action="sound-link"]').addEventListener("click", () => openSoundLink(word));
    card.querySelector('[data-action="save"]').addEventListener("click", () => markSaved(word));
    card.querySelector('[data-action="master"]').addEventListener("click", () => markMastered(word));
    card.querySelector('[data-action="quiz"]').addEventListener("click", () => {
      showTab("quiz");
      renderQuiz(word);
    });
    els.flashcards.appendChild(card);
  });
}

function renderQuiz(forcedWord) {
  const pool = state.filteredWords.length >= 4 ? state.filteredWords : state.words;

  if (pool.length < 4) {
    els.quizQuestion.textContent = "Add more words to unlock quiz mode.";
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
  els.quizQuestion.textContent = `Find: ${answer.pinyin} - ${answer.phrase}`;
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
        ? "Correct. +10 points"
        : `Review: ${answer.char} (${answer.pinyin})`;
      setTimeout(() => renderQuiz(), 900);
    });
    els.quizOptions.appendChild(button);
  });
}

function reviewScore(item) {
  const mistakeWeight = item.misses || 0;
  const savedBonus = state.progress.saved[wordKey(item)] ? 1 : 0;
  return mistakeWeight * 3 + savedBonus;
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
      </div>
      <button class="mini-button" type="button">Practice</button>
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
    "No review list yet. Miss a quiz question or save words to get recommendations."
  );
}

function renderCollection() {
  renderWordList(
    els.collectionList,
    Object.values(state.progress.saved),
    "Your collection is empty. Save useful flashcards from the Learn tab."
  );
}

function setChallengeQuestion() {
  if (state.challengeWords.length < 4) return;

  const answer = shuffle(state.challengeWords)[0];
  const choices = shuffle([
    answer,
    ...shuffle(state.challengeWords.filter(word => wordKey(word) !== wordKey(answer))).slice(0, 3)
  ]);

  state.challengeAnswer = answer;
  els.challengeTarget.textContent = answer.char;
  els.challengeOptions.innerHTML = "";

  choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice.char;
    button.addEventListener("click", () => {
      if (wordKey(choice) === wordKey(state.challengeAnswer)) {
        state.challengeScore += 1;
        els.challengeFeedback.textContent = "Nice. Keep going.";
        addPoints(3);
      } else {
        els.challengeFeedback.textContent = `Missed: ${state.challengeAnswer.char}`;
        state.progress.mistakes[wordKey(state.challengeAnswer)] = {
          ...state.challengeAnswer,
          misses: (state.progress.mistakes[wordKey(state.challengeAnswer)]?.misses || 0) + 1
        };
        saveProgress();
      }
      els.challengeScore.textContent = state.challengeScore;
      setChallengeQuestion();
    });
    els.challengeOptions.appendChild(button);
  });
}

function startChallenge() {
  clearInterval(state.challengeTimer);
  state.progress.challengePlays = (state.progress.challengePlays || 0) + 1;
  addPoints(2);
  state.challengeWords = shuffle(state.filteredWords.length >= 4 ? state.filteredWords : state.words).slice(0, 40);
  state.challengeScore = 0;
  state.challengeTime = 30;
  els.challengeScore.textContent = "0";
  els.challengeTime.textContent = "30";
  els.challengeFeedback.textContent = "";

  if (state.challengeWords.length < 4) {
    els.challengeFeedback.textContent = "Need at least four words to start.";
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
      els.challengeFeedback.textContent = `Finished. Score: ${state.challengeScore}`;
      if (state.challengeScore >= 10 && !state.progress.badges.includes("Speed Challenger")) {
        state.progress.badges.push("Speed Challenger");
      }
      saveProgress();
      renderProgress();
    }
  }, 1000);
}

function buildPodcastStory() {
  const pool = state.filteredWords.length >= 6 ? state.filteredWords : state.words;
  state.podcastWords = shuffle(pool).slice(0, 6);

  if (state.podcastWords.length === 0) {
    state.podcastStory = "请先选择一个年级，然后再开始听故事。";
    return;
  }

  const chars = state.podcastWords.map(word => word.char).join("、");
  const phrases = state.podcastWords
    .map(word => word.phrase)
    .filter(Boolean)
    .slice(0, 4)
    .join("、");
  const [hero, friend, place, clue, action, treasure] = state.podcastWords;
  const sentence = word => (word?.good_sentence || "").replace(/^好句：/, "");

  state.podcastStory = [
    `欢迎来到 NiHao Buddy 睡前小播客。请闭上眼睛，慢慢呼吸。今天的魔法词是：${chars}。`,
    `小小探险家带着「${hero.char}」和「${friend.char}」出发了。他们走进一个会发光的词语森林，听见树叶轻轻地说：${phrases || chars}。`,
    `忽然，一张任务卡飘了下来。卡上写着：${sentence(place) || `请找到藏着「${place.char}」的地方。`}`,
    `探险家仔细听，认真想。他发现「${clue.char}」是线索，「${action.char}」是动作，「${treasure.char}」是宝物。`,
    `他轻轻念：${hero.char}，${friend.char}，${place.char}，${clue.char}，${action.char}，${treasure.char}。声音像小星星一样，一颗一颗落进心里。`,
    `故事结束前，我们再听一次：${chars}。先听，再说；先模仿，再读写。晚安，明天继续完成新的中文任务。`
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
  if (!state.podcastStory) buildPodcastStory();
  state.progress.listenedStories = (state.progress.listenedStories || 0) + 1;
  speak(state.podcastStory, { pitch: 1.28, rate: 0.82 });
  addPoints(4);
  renderMissions();
}

function showTab(tabName) {
  document.querySelectorAll(".tab-button").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });
  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === `${tabName}-panel`);
  });
}

function renderAll() {
  renderProgress();
  renderFlashcards();
  renderReview();
  renderCollection();
  renderPodcast();
  renderMissions();
}

async function loadSourceStatus() {
  try {
    const response = await fetch("/api/source");
    const source = await response.json();
    els.sourceStatus.textContent = `${source.name}: ${source.active_data}`;
    els.sourceStatus.title = source.status;
  } catch {
    els.sourceStatus.textContent = "Using local vocabulary data.";
  }
}

async function loadGrades() {
  const response = await fetch("/api/grades");
  const grades = await response.json();

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
  state.filteredWords = [];
  state.podcastStory = "";
  els.wordCount.textContent = `Loading P${gradeToLoad} words...`;
  els.flashcards.innerHTML = '<p class="empty-state">Loading this learner\'s word quest...</p>';
  els.quizQuestion.textContent = "Loading quiz...";
  els.quizOptions.innerHTML = "";

  const response = await fetch(`/api/words?grade=${gradeToLoad}`);
  if (loadToken !== state.loadToken || gradeToLoad !== state.grade) return;

  state.words = await response.json();
  if (loadToken !== state.loadToken || gradeToLoad !== state.grade) return;

  state.filteredWords = state.words;
  renderLessonFilter();
  renderAll();
  renderQuiz();
  buildPodcastStory();
  renderPodcast();
}

function resetProgress() {
  const learner = state.currentUser?.displayName || "this learner";
  if (!confirm(`Reset all local NiHao Buddy progress for ${learner}?`)) return;
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
      els.loginFeedback.textContent = `Enter the password for ${USERS[state.selectedLoginUser].displayName}.`;
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

  document.querySelectorAll(".tab-button").forEach(button => {
    button.addEventListener("click", () => showTab(button.dataset.tab));
  });
  document.querySelectorAll(".mission-card").forEach(card => {
    card.addEventListener("click", () => showTab(card.dataset.tabTarget));
  });

  els.gradeSelect.addEventListener("change", () => {
    state.grade = els.gradeSelect.value;
    window.history.replaceState({}, "", `?grade=${state.grade}`);
    loadWords();
  });

  els.lessonFilter.addEventListener("change", () => {
    renderFlashcards();
    renderQuiz();
  });

  els.searchInput.addEventListener("input", () => {
    renderFlashcards();
    renderQuiz();
  });

  document.getElementById("shuffle-button").addEventListener("click", () => {
    state.words = shuffle(state.words);
    renderFlashcards();
  });

  document.getElementById("new-quiz-button").addEventListener("click", () => renderQuiz());
  document.getElementById("refresh-review-button").addEventListener("click", renderReview);
  document.getElementById("start-challenge-button").addEventListener("click", startChallenge);
  document.getElementById("new-podcast-button").addEventListener("click", () => {
    buildPodcastStory();
    renderPodcast();
  });
  document.getElementById("play-podcast-button").addEventListener("click", playPodcast);
  document.getElementById("stop-podcast-button").addEventListener("click", stopSpeaking);
  document.getElementById("reset-progress-button").addEventListener("click", resetProgress);
  document.getElementById("clear-collection-button").addEventListener("click", () => {
    state.progress.saved = {};
    saveProgress();
    renderAll();
  });
}

async function init() {
  bindEvents();
  await loadSourceStatus();
  await loadGrades();

  const savedUsername = localStorage.getItem(CURRENT_USER_KEY);
  if (savedUsername && USERS[savedUsername]) {
    await activateProfile(savedUsername, { keepCurrentGrade: false });
  } else {
    showLogin();
  }
}

init();
