"use strict";

const MAX_NUMBER = 20;
const INITIAL_SCORE = 20;

let secretNumber = generateRandomNumber(MAX_NUMBER);
let score = INITIAL_SCORE;
let highscore = 0;

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

function updateBodyStyle(backgroundClass, numberClass) {
  document.querySelector("body").classList.add(backgroundClass);
  document.querySelector(".number").classList.add(numberClass);
}

const checkGuess = () => {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    displayMessage("⛔️ No number!");
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    document.querySelector(".number").textContent = secretNumber;

    updateBodyStyle("bg-green-900", "text-4xl");

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

  displayMessage("Start guessing...");
  updateScore(score);
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";

  updateBodyStyle("bg-zinc-950", "text-3xl");
};

document.querySelector(".check").addEventListener("click", checkGuess);
document.querySelector(".again").addEventListener("click", resetGame);
