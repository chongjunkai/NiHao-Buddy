const STORAGE_KEY = "nihaoBuddyLearningData";

const state = {
  grade: new URLSearchParams(window.location.search).get("grade") || "1",
  words: [],
  filteredWords: [],
  quizAnswer: null,
  challengeAnswer: null,
  challengeWords: [],
  challengeScore: 0,
  challengeTime: 30,
  challengeTimer: null,
  progress: {
    points: 0,
    streak: 0,
    badges: [],
    completedQuizzes: 0,
    correctAnswers: 0,
    mastered: {},
    mistakes: {},
    saved: {}
  }
};

const els = {
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
  points: document.getElementById("points"),
  streak: document.getElementById("streak"),
  masteredCount: document.getElementById("mastered-count"),
  completedQuizzes: document.getElementById("completed-quizzes"),
  correctAnswers: document.getElementById("correct-answers"),
  mistakeCount: document.getElementById("mistake-count"),
  savedCount: document.getElementById("saved-count"),
  badges: document.getElementById("badges")
};

function wordKey(word) {
  return `${word.grade}:${word.char}:${word.meaning}`;
}

function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    state.progress = { ...state.progress, ...JSON.parse(saved) };
  } catch (error) {
    console.warn("Could not load saved progress", error);
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getLesson(word) {
  const match = word.meaning.match(/第(\d+)课/);
  return match ? match[1] : "other";
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function openSoundLink(word) {
  window.open(word.sound_url, "_blank", "noopener");
}

function addPoints(amount) {
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
    state.progress.streak += 1;
    state.progress.mastered[wordKey(word)] = word;
    delete state.progress.mistakes[wordKey(word)];
    addPoints(10);
  } else {
    state.progress.streak = 0;
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
  if (state.progress.streak >= 5) add("Streak Builder");
  if (state.progress.correctAnswers >= 20) add("Quiz Master");
  if (Object.keys(state.progress.saved).length >= 10) add("Collector");
  if (Object.keys(state.progress.mastered).length >= 30) add("Character Champion");
}

function renderProgress() {
  els.points.textContent = state.progress.points;
  els.streak.textContent = state.progress.streak;
  els.masteredCount.textContent = Object.keys(state.progress.mastered).length;
  els.completedQuizzes.textContent = state.progress.completedQuizzes;
  els.correctAnswers.textContent = state.progress.correctAnswers;
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
  els.wordCount.textContent = `${state.filteredWords.length} words shown from P${state.grade}`;

  if (state.filteredWords.length === 0) {
    els.flashcards.innerHTML = '<p class="empty-state">No words match this filter.</p>';
    return;
  }

  state.filteredWords.forEach(word => {
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
  const response = await fetch(`/api/words?grade=${state.grade}`);
  state.words = await response.json();
  state.filteredWords = state.words;
  renderLessonFilter();
  renderAll();
  renderQuiz();
}

function resetProgress() {
  if (!confirm("Reset all local NiHao Buddy progress?")) return;
  localStorage.removeItem(STORAGE_KEY);
  state.progress = {
    points: 0,
    streak: 0,
    badges: [],
    completedQuizzes: 0,
    correctAnswers: 0,
    mastered: {},
    mistakes: {},
    saved: {}
  };
  renderAll();
}

function bindEvents() {
  document.querySelectorAll(".tab-button").forEach(button => {
    button.addEventListener("click", () => showTab(button.dataset.tab));
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
  document.getElementById("reset-progress-button").addEventListener("click", resetProgress);
  document.getElementById("clear-collection-button").addEventListener("click", () => {
    state.progress.saved = {};
    saveProgress();
    renderAll();
  });
}

async function init() {
  loadProgress();
  bindEvents();
  renderProgress();
  await loadSourceStatus();
  await loadGrades();
  await loadWords();
}

init();
