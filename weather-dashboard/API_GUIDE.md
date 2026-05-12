# OpenWeatherMap API Guide

## Overview

This dashboard uses the **OpenWeatherMap API** (free tier) to fetch real-time weather data.

## Getting Your API Key

### Step 1: Sign Up
1. Go to [OpenWeatherMap.org](https://openweathermap.org/api)
2. Click "Sign Up"
3. Create a free account
4. Verify your email

### Step 2: Get API Key
1. Log in to your account
2. Go to "API Keys" section
3. Copy your API key
4. Keep it private!

### Step 3: Use in Dashboard
Open `script.js` and replace:
```javascript
const API_KEY = 'b6fd43953d13a45e4d4a6b8854d4b215';
```

With your key:
```javascript
const API_KEY = 'your-actual-api-key';
```

## API Endpoints Used

### 1. Geocoding API

**Purpose:** Convert city names to coordinates

**Endpoint:** `https://api.openweathermap.org/geo/1.0/direct`

**Parameters:**
- `q` - City name
- `limit` - Number of results (max 5)
- `appid` - Your API key

**Example Request:**
```
https://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=YOUR_KEY
```

**Response:**
```json
[
  {
    "name": "London",
    "lat": 51.5085,
    "lon": -0.1257,
    "country": "GB"
  }
]
```

### 2. Current Weather API

**Purpose:** Get current weather conditions

**Endpoint:** `https://api.openweathermap.org/data/2.5/weather`

**Parameters:**
- `lat` - Latitude
- `lon` - Longitude
- `units` - `metric` (Celsius) or `imperial` (Fahrenheit)
- `appid` - Your API key

**Example Request:**
```
https://api.openweathermap.org/data/2.5/weather?lat=51.5085&lon=-0.1257&units=metric&appid=YOUR_KEY
```

**Key Response Fields:**
```json
{
  "name": "London",
  "sys": {
    "sunrise": 1621921804,
    "sunset": 1621978261
  },
  "main": {
    "temp": 15.2,
    "feels_like": 14.8,
    "temp_min": 13.5,
    "temp_max": 16.8,
    "pressure": 1013,
    "humidity": 65
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "wind": {
    "speed": 3.5,
    "deg": 240
  },
  "clouds": {
    "all": 75
  },
  "visibility": 10000,
  "rain": {
    "1h": 0.1
  }
}
```

### 3. Forecast API

**Purpose:** Get 5-day/3-hour forecast

**Endpoint:** `https://api.openweathermap.org/data/2.5/forecast`

**Parameters:**
- `lat` - Latitude
- `lon` - Longitude
- `units` - `metric` or `imperial`
- `appid` - Your API key

**Example Request:**
```
https://api.openweathermap.org/data/2.5/forecast?lat=51.5085&lon=-0.1257&units=metric&appid=YOUR_KEY
```

**Response Structure:**
```json
{
  "list": [
    {
      "dt": 1621944000,
      "main": {
        "temp": 14.5,
        "feels_like": 14.1,
        "temp_min": 13.8,
        "temp_max": 14.5,
        "pressure": 1015,
        "humidity": 68
      },
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "wind": {
        "speed": 3.2,
        "deg": 245
      }
    }
    // ... more entries every 3 hours for 5 days
  ]
}
```

## Weather Icon Codes

Icons are displayed as images from OpenWeatherMap CDN:

**URL Format:**
```
https://openweathermap.org/img/wn/{icon_code}@2x.png
```

**Common Icons:**
- `01d` - Clear sky (day)
- `01n` - Clear sky (night)
- `02d` - Few clouds (day)
- `02n` - Few clouds (night)
- `03d` - Scattered clouds (day)
- `03n` - Scattered clouds (night)
- `04d` - Broken clouds (day)
- `04n` - Broken clouds (night)
- `09d` - Shower rain (day)
- `09n` - Shower rain (night)
- `10d` - Rain (day)
- `10n` - Rain (night)
- `11d` - Thunderstorm (day)
- `11n` - Thunderstorm (night)
- `13d` - Snow (day)
- `13n` - Snow (night)
- `50d` - Mist (day)
- `50n` - Mist (night)

## API Rate Limits (Free Tier)

- **Calls per minute:** 60
- **Calls per day:** 1,000
- **Forecast:** 5 days ahead
- **Data update frequency:** Every 10 minutes

## Rate Limiting Strategy

The dashboard implements:
- **Search debouncing** - Delays API calls while typing
- **Result caching** - Stores fetched data in memory
- **Browser caching** - Icons cached for faster loading

## Error Handling

### Common Error Responses

**Invalid API Key:**
```json
{
  "cod": "401",
  "message": "Invalid API key"
}
```

**City Not Found:**
```json
[]
```

**Rate Limit Exceeded:**
```json
{
  "cod": "429",
  "message": "You have exceeded the rate limit"
}
```

### Handling in Dashboard

The dashboard catches errors and displays user-friendly messages:
```javascript
if (!geoData.length) {
    showError(`City "${city}" not found. Please try another search.`);
}
```

## CORS & Proxy

OpenWeatherMap API supports CORS from browsers, so no proxy is needed!

If you encounter CORS issues:
1. Verify your API key is correct
2. Check browser console for actual error
3. Consider using a CORS proxy for production

## Environment Variables (Optional)

For security in production, use environment variables:

**.env file:**
```
VITE_WEATHER_API_KEY=your-api-key
VITE_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

**Access in code:**
```javascript
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
```

## Premium Features

Upgrade to paid plans for:
- Higher rate limits
- Historical data
- Air quality data
- Weather alerts
- More detailed forecasts

See [OpenWeatherMap Pricing](https://openweathermap.org/price)

## Troubleshooting

### Check if API is Working

Test in browser console:
```javascript
fetch('https://api.openweathermap.org/data/2.5/weather?lat=51.5&lon=-0.1&units=metric&appid=YOUR_KEY')
  .then(r => r.json())
  .then(d => console.log(d))
```

### Monitor API Calls

1. Open Browser DevTools (F12)
2. Go to "Network" tab
3. Make a search
4. See API calls and responses

### Check Rate Limits

Response headers include:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1621920000
```

## Best Practices

1. **Cache Results** ✅ Done
   - Don't repeat calls for same city within minutes

2. **Debounce Searches** ✅ Done
   - Wait for user to stop typing before searching

3. **Error Handling** ✅ Done
   - Show user-friendly error messages

4. **Rate Limiting** ✅ Done
   - Store searches, implement cooldown periods

5. **Secure API Key** ⚠️ Important
   - Never commit API keys to public repositories
   - Use environment variables in production
   - Consider backend proxy for sensitive apps

## Additional Resources

- [OpenWeatherMap Documentation](https://openweathermap.org/api)
- [Geocoding API Docs](https://openweathermap.org/api/geocoding-api)
- [Current Weather API Docs](https://openweathermap.org/current)
- [Forecast API Docs](https://openweathermap.org/forecast5)

---

**Last Updated:** May 2026