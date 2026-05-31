// NiHao Buddy - Simple Game & Rewards System

let playerData = {
  points: 0,
  streak: 0,
  badges: [],
  completedQuizzes: 0,
  correctAnswers: 0
};

let currentQuizAnswer = null;

function loadPlayerData() {
  const saved = localStorage.getItem("nihaoBuddyPlayerData");
  if (saved) {
    playerData = JSON.parse(saved);
  }
  updateRewardsDisplay();
}

function savePlayerData() {
  localStorage.setItem("nihaoBuddyPlayerData", JSON.stringify(playerData));
}

function addPoints(amount) {
  playerData.points += amount;
  checkBadges();
  savePlayerData();
  updateRewardsDisplay();
}

function completeQuiz(isCorrect) {
  playerData.completedQuizzes += 1;

  if (isCorrect) {
    playerData.correctAnswers += 1;
    playerData.streak += 1;
    addPoints(10);
  } else {
    playerData.streak = 0;
  }

  checkBadges();
  savePlayerData();
  updateRewardsDisplay();
}

function checkBadges() {
  if (playerData.points >= 50 && !playerData.badges.includes("Vocabulary Starter")) {
    playerData.badges.push("Vocabulary Starter");
  }

  if (playerData.points >= 100 && !playerData.badges.includes("Chinese Explorer")) {
    playerData.badges.push("Chinese Explorer");
  }

  if (playerData.streak >= 3 && !playerData.badges.includes("3-Day Streak")) {
    playerData.badges.push("3-Day Streak");
  }

  if (playerData.correctAnswers >= 10 && !playerData.badges.includes("Quiz Master")) {
    playerData.badges.push("Quiz Master");
  }
}

function updateRewardsDisplay() {
  const pointsEl = document.getElementById("points");
  const streakEl = document.getElementById("streak");
  const badgesEl = document.getElementById("badges");

  if (pointsEl) pointsEl.textContent = playerData.points;
  if (streakEl) streakEl.textContent = playerData.streak;

  if (badgesEl) {
    badgesEl.innerHTML = "";

    if (playerData.badges.length === 0) {
      badgesEl.innerHTML = "<li>No badges yet. Keep learning!</li>";
    } else {
      playerData.badges.forEach(badge => {
        const li = document.createElement("li");
        li.textContent = "🏅 " + badge;
        badgesEl.appendChild(li);
      });
    }
  }
}

function resetProgress() {
  playerData = {
    points: 0,
    streak: 0,
    badges: [],
    completedQuizzes: 0,
    correctAnswers: 0
  };

  savePlayerData();
  updateRewardsDisplay();
}

function shuffleItems(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function renderQuizQuestion(words) {
  const quizQuestionEl = document.getElementById("quiz-question");
  const quizOptionsEl = document.getElementById("quiz-options");
  const quizFeedbackEl = document.getElementById("quiz-feedback");

  if (!quizQuestionEl || !quizOptionsEl || !quizFeedbackEl || words.length < 2) {
    return;
  }

  const choices = shuffleItems(words).slice(0, Math.min(4, words.length));
  const answer = choices[Math.floor(Math.random() * choices.length)];
  currentQuizAnswer = answer.meaning;

  quizQuestionEl.textContent = `What does "${answer.char}" mean?`;
  quizFeedbackEl.textContent = "";
  quizOptionsEl.innerHTML = "";

  shuffleItems(choices).forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice.meaning;
    button.addEventListener("click", () => {
      const isCorrect = choice.meaning === currentQuizAnswer;
      completeQuiz(isCorrect);
      quizFeedbackEl.textContent = isCorrect ? "Correct! +10 points" : `Not quite. Answer: ${currentQuizAnswer}`;
      setTimeout(() => renderQuizQuestion(words), 900);
    });
    quizOptionsEl.appendChild(button);
  });
}

window.addEventListener("DOMContentLoaded", loadPlayerData);
