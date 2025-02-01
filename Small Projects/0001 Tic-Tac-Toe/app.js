let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let scores = {
    X: 0,
    O: 0,
    draws: 0
};

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM Elements
const boxes = document.querySelectorAll(".box");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset-btn");
const newGameButton = document.getElementById("new-game");
const modal = document.getElementById("winner-modal");
const winnerMessage = document.getElementById("winner-message");
const playerX = document.querySelector(".player-x");
const playerO = document.querySelector(".player-o");
const xScore = document.getElementById("x-score");
const oScore = document.getElementById("o-score");
const drawScore = document.getElementById("draws");

// Event Listeners
boxes.forEach(box => box.addEventListener("click", handleBoxClick));
resetButton.addEventListener("click", resetBoard);
newGameButton.addEventListener("click", startNewGame);

function handleBoxClick(e) {
    const box = e.target;
    const index = box.dataset.index;

    if (gameBoard[index] !== "" || !gameActive) return;

    updateBox(box, index);
    checkGameResult();
    updatePlayerTurn();
}

function updateBox(box, index) {
    gameBoard[index] = currentPlayer;
    box.textContent = currentPlayer;
    box.classList.add(currentPlayer.toLowerCase());
}

function updatePlayerTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    
    // Update active player indicator
    if (currentPlayer === "X") {
        playerX.classList.add("active");
        playerO.classList.remove("active");
    } else {
        playerO.classList.add("active");
        playerX.classList.remove("active");
    }
}

function checkGameResult() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (
            gameBoard[a] &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        const winner = currentPlayer;
        scores[winner]++;
        updateScoreDisplay();
        showWinnerModal(`Player ${winner} Wins!`);
        return;
    }

    if (!gameBoard.includes("")) {
        gameActive = false;
        scores.draws++;
        updateScoreDisplay();
        showWinnerModal("It's a Draw!");
    }
}

function updateScoreDisplay() {
    xScore.textContent = scores.X;
    oScore.textContent = scores.O;
    drawScore.textContent = scores.draws;
}

function showWinnerModal(message) {
    winnerMessage.textContent = message;
    modal.classList.remove("hide");
}

function resetBoard() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    
    boxes.forEach(box => {
        box.textContent = "";
        box.classList.remove("x", "o");
    });
    
    statusDisplay.textContent = "Player X's turn";
    playerX.classList.add("active");
    playerO.classList.remove("active");
    modal.classList.add("hide");
}

function startNewGame() {
    resetBoard();
}

// Initialize the game
resetBoard();