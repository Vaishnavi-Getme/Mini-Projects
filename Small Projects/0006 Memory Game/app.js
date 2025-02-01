const gameBoard = document.getElementById("game-board");
const movesElement = document.getElementById("moves");
const timeElement = document.getElementById("time");

let cards = [
    "A", "A", "B", "B", "C", "C", "D", "D", 
    "E", "E", "F", "F", "G", "G", "H", "H"
];
let flippedCards = [];
let matchedCards = [];
let moveCount = 0;
let timer;
let time = 0;

function startTimer() {
    timer = setInterval(() => {
        time++;
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        timeElement.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function shuffleCards() {
    cards = [...cards].sort(() => Math.random() - 0.5);
}

function createCard(cardValue) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="back"></div>
        <div class="front">${cardValue}</div>
    `;
    card.addEventListener("click", () => flipCard(card, cardValue));
    return card;
}

function flipCard(card, cardValue) {
    if (flippedCards.length === 2 || card.classList.contains("flipped") || matchedCards.includes(card)) return;

    card.classList.add("flipped");
    flippedCards.push({ card, cardValue });

    if (flippedCards.length === 2) {
        moveCount++;
        movesElement.textContent = moveCount;
        checkForMatch();
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    
    if (firstCard.cardValue === secondCard.cardValue) {
        matchedCards.push(firstCard.card, secondCard.card);
        flippedCards = [];
        
        if (matchedCards.length === cards.length) {
            clearInterval(timer);
            setTimeout(() => {
                alert(`Congratulations! You won in ${moveCount} moves and ${time} seconds!`);
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.card.classList.remove("flipped");
            secondCard.card.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

function initializeGame() {
    // Reset game state
    gameBoard.innerHTML = "";
    flippedCards = [];
    matchedCards = [];
    moveCount = 0;
    time = 0;
    movesElement.textContent = "0";
    timeElement.textContent = "00:00";
    clearInterval(timer);
    
    // Shuffle and create cards
    shuffleCards();
    cards.forEach(cardValue => {
        gameBoard.appendChild(createCard(cardValue));
    });
    
    // Start the timer
    startTimer();
}

// Start the game when the page loads
window.onload = initializeGame;
