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

function updateBodyStyle(backgroundColor, numberWidth) {
  document.querySelector("body").style.backgroundColor = backgroundColor;
  document.querySelector(".number").style.width = numberWidth;
}

const checkGuess = () => {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    displayMessage("⛔️ No number!");
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    document.querySelector(".number").textContent = secretNumber;

    updateBodyStyle("#60b347", "30rem");

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

  updateBodyStyle("#222", "15rem");
};

document.querySelector(".check").addEventListener("click", checkGuess);
document.querySelector(".again").addEventListener("click", resetGame);
