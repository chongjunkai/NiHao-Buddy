const flashcardsDiv = document.getElementById("flashcards");
const gradeSelect = document.getElementById("grade");

async function fetchWords(grade) {
  const res = await fetch(`http://127.0.0.1:5000/api/words?grade=${grade}`);
  const data = await res.json();
  return data;
}

function playAudio(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  speechSynthesis.speak(utterance);
}

function renderFlashcards(words) {
  flashcardsDiv.innerHTML = "";
  words.forEach(word => {
    const card = document.createElement("div");
    card.className = "flashcard";
    card.innerHTML = `
      <div class="char">${word.char}</div>
      <div class="pinyin">${word.pinyin}</div>
      <div class="meaning">${word.meaning}</div>
      <button onclick="playAudio('${word.char}')">🔊 Hear</button>
    `;
    flashcardsDiv.appendChild(card);
  });
}

async function loadGrade() {
  const grade = gradeSelect.value;
  const words = await fetchWords(grade);
  renderFlashcards(words);
}

gradeSelect.addEventListener("change", loadGrade);

// Initial load
loadGrade();
