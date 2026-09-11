let level = 1;
let maxNumber = 10;
let targetNumber = 0;
let lives = 5;
let gameOver = false;

const form = document.getElementById('game-form');
const input = document.getElementById('guess-input');
const message = document.getElementById('message');
const livesDisplay = document.getElementById('lives-display');
const levelDisplay = document.getElementById('level-display');
const btnRestart = document.getElementById('btn-restart');
const btnLevelUp = document.getElementById('btn-level-up');
const btnRules = document.getElementById('btn-rules');
const rulesBox = document.getElementById('rules-box');

function startGame() {
    if (level === 1) maxNumber = 10;
    else if (level === 2) maxNumber = 50;
    else maxNumber = 100;

    targetNumber = Math.floor(Math.random() * maxNumber) + 1;
    lives = 5;
    gameOver = false;
    
    levelDisplay.textContent = level;
    livesDisplay.textContent = lives;
    message.textContent = `ทายเลข 1 ถึง ${maxNumber}`;
    message.className = "mt-6 text-center text-xl font-bold text-gray-700 dark:text-gray-300";
    
    input.value = "";
    input.disabled = false;
    input.focus();
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (gameOver) return;

    const guess = parseInt(input.value);
    if (isNaN(guess)) return;

    lives--;
    livesDisplay.textContent = lives;

    if (guess === targetNumber) {
        message.textContent = `🎉 ถูกต้อง! คำตอบคือ ${targetNumber}`;
        message.className = "mt-6 text-center text-xl font-bold text-green-500";
        endGame();
    } else if (lives === 0) {
        message.textContent = `💀 เกมโอเวอร์! คำตอบคือ ${targetNumber}`;
        message.className = "mt-6 text-center text-xl font-bold text-red-500";
        endGame();
    } else {
        if (guess > targetNumber) {
            message.textContent = "⬇️ มากไป ลองลดลงหน่อย";
            message.className = "mt-6 text-center text-xl font-bold text-orange-500";
        } else {
            message.textContent = "⬆️ น้อยไป ลองเพิ่มขึ้นหน่อย";
            message.className = "mt-6 text-center text-xl font-bold text-orange-500";
        }
    }
    input.value = "";
});

function endGame() {
    gameOver = true;
    input.disabled = true;
}

btnRestart.addEventListener('click', startGame);

btnLevelUp.addEventListener('click', function() {
    level++;
    startGame();
});

btnRules.addEventListener('click', function() {
    rulesBox.classList.toggle('hidden');
});

startGame();