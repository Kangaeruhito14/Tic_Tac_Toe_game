// Select DOM Elements
const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#reset-btn');
const newGameBtn = document.querySelector('#new-btn');
const msgContainer = document.querySelector('.msg-container');
const msg = document.querySelector('#msg');
const gameContainer = document.querySelector('.game-container');
const modeSelection = document.querySelector('.mode-selection');
const singlePlayerBtn = document.querySelector('#single-player-btn');
const multiPlayerBtn = document.querySelector('#multi-player-btn');

let isSinglePlayer = false; // Track if in single-player mode
let turnO = true; // True if it's Player O's turn, false if Player X's turn
let count = 0; // To Track Draw

// Winning Patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Event listeners for Mode Selection
singlePlayerBtn.addEventListener('click', () => startGame(true));
multiPlayerBtn.addEventListener('click', () => startGame(false));

// Initialize Game
function startGame(singlePlayer) {
  isSinglePlayer = singlePlayer;
  modeSelection.style.display = 'none';
  gameContainer.style.display = 'flex';
  resetGame();
}

// Reset Game
function resetGame() {
  turnO = true;
  count = 0;
  msgContainer.classList.add('hide');
  boxes.forEach(box => {
    box.innerText = '';
    box.disabled = false;
  });
}

// Event Listeners for Game Boxes
boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    if (isSinglePlayer) {
      // Single Player Logic
      playerMove(box, 'O');
      if (!checkWinner() && count < 9) {
        setTimeout(computerMove, 500); // Computer makes a move after 500ms
      }
    } else {
      // Multiplayer Logic
      playerMove(box, turnO ? 'O' : 'X');
      turnO = !turnO;
    }
  });
});

// Player Move
function playerMove(box, player) {
  box.innerText = player;
  box.disabled = true;
  count++;
  if (checkWinner()) {
    msg.innerText = `Congratulations, ${player} wins!`;
    msgContainer.classList.remove('hide');
  } else if (count === 9) {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove('hide');
  }
}

// Computer Move (for single player)
function computerMove() {
  const emptyBoxes = [...boxes].filter(box => box.innerText === '');
  if (emptyBoxes.length === 0) return;

  const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  randomBox.innerText = 'X';
  randomBox.disabled = true;
  count++;
  
  if (checkWinner()) {
    msg.innerText = "Computer wins!";
    msgContainer.classList.remove('hide');
  } else if (count === 9) {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove('hide');
  }
}

// Check for Winner
function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText) {
      return true;
    }
  }
  return false;
}

// Reset & New Game Buttons
resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', () => {
  resetGame();
  gameContainer.style.display = 'none';
  modeSelection.style.display = 'flex';
});