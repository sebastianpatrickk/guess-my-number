"use strict";

const MAX_NUMBER = 20;
const INITIAL_SCORE = 20;

const checkEl = document.querySelector(".check");
const guessEl = document.querySelector(".guess");

let secretNumber = generateRandomNumber(MAX_NUMBER);
let score = INITIAL_SCORE;
let highscore = 0;

function shootConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

function playSoundEffect() {
  const audio = new Audio("./sound-effect.mp3");
  audio.play();
}

function generateRandomNumber(maxNumber) {
  return Math.trunc(Math.random() * maxNumber) + 1;
}

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

function updateScore(newScore) {
  score = newScore;
  document.querySelector(".score").textContent = score;
}

function updateHighscore(newHighscore) {
  highscore = newHighscore;
  document.querySelector(".highscore").textContent = highscore;
}

const checkGuess = () => {
  const guess = Number(guessEl.value);

  if (!guess) {
    displayMessage("⛔️ No number!");
  } else if (guess === secretNumber) {
    checkEl.setAttribute("disabled", "");
    guessEl.setAttribute("disabled", "");
    displayMessage("🎉 Correct Number!");
    document.querySelector(".number").textContent = secretNumber;
    shootConfetti();
    playSoundEffect();

    if (score > highscore) {
      updateHighscore(score);
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      updateScore(score - 1);
    } else {
      displayMessage("💥 You lost the game!");
      updateScore(0);
    }
  }
};

const resetGame = () => {
  score = INITIAL_SCORE;
  secretNumber = generateRandomNumber(MAX_NUMBER);

  console.log(secretNumber);

  checkEl.removeAttribute("disabled");
  guessEl.removeAttribute("disabled");
  displayMessage("Start guessing...");
  updateScore(score);
  document.querySelector(".number").textContent = "?";
  guessEl.value = "";
};

checkEl.addEventListener("click", checkGuess);
document.querySelector(".again").addEventListener("click", resetGame);
