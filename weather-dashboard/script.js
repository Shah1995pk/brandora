// API Configuration
const API_KEY = 'b6fd43953d13a45e4d4a6b8854d4b215'; // Free tier OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const mainWeatherSection = document.getElementById('mainWeather');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const forecastSection = document.getElementById('forecastSection');
const hourlySection = document.getElementById('hourlySection');
const forecastContainer = document.getElementById('forecastContainer');
const hourlyContainer = document.getElementById('hourlyContainer');
const recentSearchesList = document.getElementById('recentSearchesList');
const lastUpdated = document.getElementById('lastUpdated');
const searchSuggestions = document.getElementById('searchSuggestions');

// State
let recentSearches = JSON.parse(localStorage.getItem('weatherRecentSearches')) || [];
let currentWeatherData = null;
let currentForecastData = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderRecentSearches();
    // Load weather for default city on startup
    searchWeather('London');
});

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        searchWeather(city);
        searchInput.value = '';
        searchSuggestions.classList.remove('active');
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            searchWeather(city);
            searchInput.value = '';
            searchSuggestions.classList.remove('active');
        }
    }
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 2) {
        fetchCitySuggestions(query);
    } else {
        searchSuggestions.classList.remove('active');
    }
});

currentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        loadingSpinner.classList.remove('hidden');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                searchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                showError('Unable to access your location. Please enable location permissions.');
                loadingSpinner.classList.add('hidden');
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
});

// Fetch city suggestions
async function fetchCitySuggestions(query) {
    try {
        const response = await fetch(
            `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
        );
        const cities = await response.json();
        
        if (cities.length > 0) {
            renderSuggestions(cities);
        } else {
            searchSuggestions.classList.remove('active');
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}

// Render city suggestions
function renderSuggestions(cities) {
    searchSuggestions.innerHTML = '';
    cities.forEach(city => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = `${city.name}, ${city.country}`;
        item.addEventListener('click', () => {
            searchWeather(city.name);
            searchInput.value = '';
            searchSuggestions.classList.remove('active');
        });
        searchSuggestions.appendChild(item);
    });
    searchSuggestions.classList.add('active');
}

// Search weather by city name
async function searchWeather(city) {
    loadingSpinner.classList.remove('hidden');
    hideError();
    
    try {
        // Get city coordinates
        const geoResponse = await fetch(
            `${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();
        
        if (!geoData.length) {
            showError(`City "${city}" not found. Please try another search.`);
            loadingSpinner.classList.add('hidden');
            return;
        }
        
        const { lat, lon, name } = geoData[0];
        searchWeatherByCoords(lat, lon, name);
    } catch (error) {
        showError('Error fetching weather data. Please try again.');
        loadingSpinner.classList.add('hidden');
        console.error('Error:', error);
    }
}

// Search weather by coordinates
async function searchWeatherByCoords(lat, lon, cityName = null) {
    try {
        // Fetch current weather and forecast
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
            fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        ]);
        
        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        currentWeatherData = await weatherResponse.json();
        currentForecastData = await forecastResponse.json();
        
        // Add to recent searches
        addToRecentSearches(currentWeatherData.name);
        
        // Display weather
        displayWeather();
        displayForecast();
        displayHourlyForecast();
        updateLastUpdated();
        
        loadingSpinner.classList.add('hidden');
        hideError();
    } catch (error) {
        showError('Error fetching weather data. Please try again.');
        loadingSpinner.classList.add('hidden');
        console.error('Error:', error);
    }
}

// Display current weather
function displayWeather() {
    if (!currentWeatherData) return;
    
    const { name, sys, main, weather, wind, clouds, visibility } = currentWeatherData;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
    
    // Update elements
    document.getElementById('cityName').textContent = name + (sys.country ? `, ${sys.country}` : '');
    document.getElementById('weatherDate').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('temperature').textContent = Math.round(main.temp);
    document.getElementById('weatherDescription').textContent = weather[0].description;
    document.getElementById('feelsLike').textContent = Math.round(main.feels_like);
    document.getElementById('weatherIcon').src = iconUrl;
    
    // Update details
    document.getElementById('humidity').textContent = main.humidity;
    document.getElementById('windSpeed').textContent = wind.speed.toFixed(1);
    document.getElementById('pressure').textContent = main.pressure;
    document.getElementById('visibility').textContent = (visibility / 1000).toFixed(1);
    document.getElementById('precipitation').textContent = currentWeatherData.rain ? currentWeatherData.rain['1h'] : '0';
    document.getElementById('uvIndex').textContent = 'N/A'; // Requires separate API call
    
    // Sunrise and sunset
    document.getElementById('sunrise').textContent = formatTime(sys.sunrise);
    document.getElementById('sunset').textContent = formatTime(sys.sunset);
    
    mainWeatherSection.classList.remove('hidden');
}

// Display 5-day forecast
function displayForecast() {
    if (!currentForecastData) return;
    
    const forecasts = {};
    
    currentForecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        
        if (!forecasts[date]) {
            forecasts[date] = {
                temps: [],
                weather: item.weather[0],
                icon: item.weather[0].icon
            };
        }
        
        forecasts[date].temps.push(item.main.temp);
    });
    
    forecastContainer.innerHTML = '';
    
    Object.entries(forecasts).slice(0, 5).forEach(([date, data]) => {
        const maxTemp = Math.round(Math.max(...data.temps));
        const minTemp = Math.round(Math.min(...data.temps));
        const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-date">${formatDateShort(date)}</div>
            <img src="${iconUrl}" alt="Weather" class="forecast-icon" style="width: 60px; height: 60px;">
            <div class="forecast-temp">
                <span class="temp-max">${maxTemp}°</span>
                <span class="temp-min">${minTemp}°</span>
            </div>
            <div class="forecast-description">${data.weather.description}</div>
        `;
        forecastContainer.appendChild(card);
    });
    
    forecastSection.classList.remove('hidden');
}

// Display hourly forecast
function displayHourlyForecast() {
    if (!currentForecastData) return;
    
    hourlyContainer.innerHTML = '';
    
    currentForecastData.list.slice(0, 8).forEach(item => {
        const temp = Math.round(item.main.temp);
        const time = new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        
        const card = document.createElement('div');
        card.className = 'hourly-card';
        card.innerHTML = `
            <div class="hourly-time">${time}</div>
            <img src="${iconUrl}" alt="Weather" class="hourly-icon" style="width: 40px; height: 40px;">
            <div class="hourly-temp">${temp}°C</div>
        `;
        hourlyContainer.appendChild(card);
    });
    
    hourlySection.classList.remove('hidden');
}

// Add to recent searches
function addToRecentSearches(city) {
    if (!recentSearches.includes(city)) {
        recentSearches.unshift(city);
        if (recentSearches.length > 5) {
            recentSearches.pop();
        }
        localStorage.setItem('weatherRecentSearches', JSON.stringify(recentSearches));
        renderRecentSearches();
    }
}

// Render recent searches
function renderRecentSearches() {
    recentSearchesList.innerHTML = '';
    
    recentSearches.forEach(city => {
        const item = document.createElement('div');
        item.className = 'recent-search-item';
        item.innerHTML = `
            <i class="fas fa-history"></i>
            <span>${city}</span>
            <button class="close-btn" onclick="removeRecentSearch('${city}')">&times;</button>
        `;
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('close-btn')) {
                searchWeather(city);
            }
        });
        recentSearchesList.appendChild(item);
    });
}

// Remove recent search
function removeRecentSearch(city) {
    recentSearches = recentSearches.filter(c => c !== city);
    localStorage.setItem('weatherRecentSearches', JSON.stringify(recentSearches));
    renderRecentSearches();
}

// Utility functions
function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function formatDateShort(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function updateLastUpdated() {
    const now = new Date();
    lastUpdated.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Handle image load errors
window.addEventListener('error', (event) => {
    if (event.filename && event.filename.includes('openweathermap.org')) {
        console.warn('Weather icon failed to load, but weather data is still available');
    }
}, true);