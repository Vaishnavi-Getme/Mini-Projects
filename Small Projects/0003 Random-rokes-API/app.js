// DOM Elements
const setupElement = document.getElementById('setup');
const deliveryElement = document.getElementById('delivery');
const jokeBtn = document.getElementById('btn');
const jokeContent = document.querySelector('.joke-content');
const emojiContainer = document.querySelector('.emoji-container');
const jokeCountElement = document.getElementById('joke-count');

// State
let jokeCount = 0;
const emojis = ['😄', '😆', '🤣', '😂', '😊', '😹', '🤪', '😛'];

// API URL
const API_URL = 'https://v2.jokeapi.dev/joke/Any?safe=true';

// Functions
async function getJoke() {
    try {
        // Show loading state
        jokeContent.classList.add('loading');
        setupElement.textContent = '';
        deliveryElement.textContent = '';

        const response = await fetch(API_URL);
        const data = await response.json();

        // Hide loading state
        jokeContent.classList.remove('loading');

        if (data.type === 'twopart') {
            setupElement.textContent = data.setup;
            // Add a small delay for the delivery for better effect
            setTimeout(() => {
                deliveryElement.textContent = data.delivery;
                showSuccessAnimation();
            }, 1500);
        } else {
            setupElement.textContent = data.joke;
            deliveryElement.textContent = '';
            showSuccessAnimation();
        }

        // Update joke count
        updateJokeCount();

        // Change emoji
        updateEmoji();

    } catch (error) {
        jokeContent.classList.remove('loading');
        setupElement.textContent = 'Oops! Something went wrong.';
        deliveryElement.textContent = 'Please try again.';
        console.error('Error fetching joke:', error);
    }
}

function updateJokeCount() {
    jokeCount++;
    jokeCountElement.textContent = jokeCount;
    localStorage.setItem('jokeCount', jokeCount);
}

function updateEmoji() {
    const emoji = document.createElement('i');
    emoji.className = 'far fa-laugh-beam';
    
    // Remove existing emoji
    emojiContainer.innerHTML = '';
    emojiContainer.appendChild(emoji);
}

function showSuccessAnimation() {
    jokeContent.classList.add('success');
    setTimeout(() => {
        jokeContent.classList.remove('success');
    }, 500);
}

// Event Listeners
jokeBtn.addEventListener('click', getJoke);

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    // Restore joke count from localStorage
    const savedCount = localStorage.getItem('jokeCount');
    if (savedCount) {
        jokeCount = parseInt(savedCount);
        jokeCountElement.textContent = jokeCount;
    }
    
    // Get first joke
    getJoke();
});
