// DOM Elements
const weatherInfo = document.querySelector('.weather-info');
const weatherIcon = document.querySelector('.weather-icon i');
const tempValue = document.querySelector('.temp-value');
const weatherDescription = document.getElementById('weather');
const windSpeed = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('btn');
const errorMessage = document.querySelector('.error-message');
const loader = document.querySelector('.loader');

// API Configuration
const API_KEY = 'ce9c9800ef814874a02163602242212';
const API_URL = 'https://api.weatherapi.com/v1/current.json';

// Weather icon mapping
const weatherIcons = {
    'Sunny': 'fas fa-sun',
    'Clear': 'fas fa-sun',
    'Partly cloudy': 'fas fa-cloud-sun',
    'Cloudy': 'fas fa-cloud',
    'Overcast': 'fas fa-cloud',
    'Mist': 'fas fa-smog',
    'Patchy rain possible': 'fas fa-cloud-rain',
    'Patchy snow possible': 'fas fa-snowflake',
    'Patchy sleet possible': 'fas fa-cloud-rain',
    'Patchy freezing drizzle possible': 'fas fa-cloud-rain',
    'Thundery outbreaks possible': 'fas fa-bolt',
    'Blowing snow': 'fas fa-snowflake',
    'Blizzard': 'fas fa-snowflake',
    'Fog': 'fas fa-smog',
    'Light rain': 'fas fa-cloud-rain',
    'Moderate rain': 'fas fa-cloud-rain',
    'Heavy rain': 'fas fa-cloud-showers-heavy',
    'Light snow': 'fas fa-snowflake',
    'Moderate snow': 'fas fa-snowflake',
    'Heavy snow': 'fas fa-snowflake',
    'default': 'fas fa-cloud'
};

// Functions
function showLoader() {
    loader.classList.remove('hide');
    weatherInfo.classList.add('hide');
    errorMessage.classList.add('hide');
}

function hideLoader() {
    loader.classList.add('hide');
}

function showError(message) {
    errorMessage.querySelector('p').textContent = message;
    errorMessage.classList.remove('hide');
    weatherInfo.classList.add('hide');
}

function updateWeatherIcon(condition) {
    const iconClass = weatherIcons[condition] || weatherIcons.default;
    weatherIcon.className = iconClass;
}

async function getWeather(city) {
    if (!city.trim()) {
        showError('Please enter a city name');
        return;
    }

    try {
        showLoader();

        const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&aqi=no`);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message || 'City not found. Please check the spelling and try again.');
        }

        // Update UI with weather data
        updateWeatherIcon(data.current.condition.text);
        tempValue.textContent = Math.round(data.current.temp_c);
        weatherDescription.textContent = data.current.condition.text;
        windSpeed.textContent = `${data.current.wind_kph} km/h`;
        humidity.textContent = `${data.current.humidity}%`;
        pressure.textContent = `${data.current.pressure_mb} mb`;

        // Show weather info
        weatherInfo.classList.remove('hide');
        errorMessage.classList.add('hide');

    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message || 'Failed to fetch weather data. Please try again.');
    } finally {
        hideLoader();
    }
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    getWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        getWeather(city);
    }
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    cityInput.focus();
});