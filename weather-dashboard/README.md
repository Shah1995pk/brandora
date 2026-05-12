# Weather Dashboard

**A professional, real-time weather dashboard application**

## 🌤️ Features

### ✨ Core Features
- **Current Weather Display** - Real-time temperature, conditions, and detailed metrics
- **5-Day Forecast** - Daily weather predictions with min/max temperatures
- **24-Hour Hourly Forecast** - Hour-by-hour weather updates
- **City Search** - Search any city worldwide with autocomplete suggestions
- **Geolocation** - Get weather for your current location
- **Recent Searches** - Quick access to previously searched cities (stored locally)
- **Detailed Metrics** - Humidity, wind speed, pressure, visibility, and more
- **Sun Times** - Sunrise and sunset information

### 🎨 Design Features
- **Modern Dark Theme** - Eye-friendly dark interface with gradient accents
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Polished hover effects and transitions
- **Real Weather Icons** - OpenWeatherMap weather condition icons
- **Professional Typography** - Clean, readable font hierarchy

## 🔧 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, flexbox, and grid
- **Vanilla JavaScript** - No dependencies
- **OpenWeatherMap API** - Free tier weather data
- **Geolocation API** - Browser-based location detection
- **LocalStorage** - Client-side data persistence

## 🚀 Getting Started

### Installation

1. **Clone or Download**
   ```bash
   git clone <repository-url>
   cd weather-dashboard
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - No server or build tools required!

### API Setup

The dashboard uses a free OpenWeatherMap API key. To use your own:

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key
4. Replace the `API_KEY` in `script.js` (line 2):
   ```javascript
   const API_KEY = 'your-api-key-here';
   ```

## 📖 Usage

### Search for a City
1. Type a city name in the search box
2. See autocomplete suggestions
3. Click a suggestion or press Enter
4. Weather data loads instantly

### Use Current Location
1. Click the location icon (🔍)
2. Allow browser location access
3. Weather for your location displays

### View Recent Searches
- Click any city in the "Recent Searches" section
- Remove a search by clicking the ×
- Searches persist in browser storage

### Understand the Metrics

- **Temperature** - Current air temperature in Celsius
- **Feels Like** - Perceived temperature factoring wind/humidity
- **Humidity** - Percentage of moisture in air
- **Wind Speed** - Speed in meters per second
- **Pressure** - Atmospheric pressure in millibars
- **Visibility** - How far you can see in kilometers
- **Precipitation** - Rainfall amount in millimeters
- **Sunrise/Sunset** - Times in local timezone

## 📁 File Structure

```
weather-dashboard/
├── index.html      # Main HTML structure
├── styles.css      # Complete styling
├── script.js       # JavaScript logic and API calls
├── README.md       # This file
└── API_GUIDE.md    # Detailed API documentation
```

## 🎨 Customization

### Change Color Scheme

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #FF6B6B;       /* Change this */
    --secondary-color: #4ECDC4;     /* Change this */
    --dark-bg: #0f172a;             /* Change this */
}
```

### Modify Temperature Units

Change units parameter in `script.js`:

```javascript
// From: units=metric (Celsius)
// To: units=imperial (Fahrenheit)
```

Then update the display templates to show °F instead of °C.

### Add More Weather Details

Add new DOM elements in `index.html` and update the `displayWeather()` function in `script.js`:

```javascript
document.getElementById('newMetric').textContent = currentWeatherData.newValue;
```

## 🔌 API Reference

### OpenWeatherMap Endpoints Used

1. **Geocoding API**
   - Forward Geocoding: Convert city name to coordinates
   - Endpoint: `geo/1.0/direct`

2. **Current Weather API**
   - Get current weather for coordinates
   - Endpoint: `data/2.5/weather`

3. **Forecast API**
   - Get 5-day/3-hour forecast
   - Endpoint: `data/2.5/forecast`

For detailed API documentation, see `API_GUIDE.md`

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Security Notes

- API key is exposed in client-side code (fine for free tier with rate limits)
- For production, use a backend server to protect your API key
- Consider implementing authentication for higher API limits

## ⚠️ Limitations

- **Free Tier Limits**
  - 60 calls/minute
  - 1,000 calls/day
  - 5-day forecast data

- **Features Not Included**
  - Air quality data (requires separate API)
  - UV index (requires separate API)
  - Historical weather data
  - Weather alerts

## 🐛 Troubleshooting

### Weather Icons Not Showing
- Check internet connection (icons load from OpenWeatherMap CDN)
- Verify API key is valid
- Check browser console for errors

### Location Not Working
- Enable location permissions in browser settings
- Some browsers require HTTPS for geolocation
- Check if browser supports Geolocation API

### "City Not Found" Error
- Verify city spelling
- Try with country code (e.g., "London, UK")
- Try a different city

### API Rate Limit
- Wait a few minutes before making new requests
- Upgrade OpenWeatherMap subscription for higher limits

## 🚀 Deployment

### GitHub Pages
```bash
git add .
git commit -m "Deploy weather dashboard"
git push origin main
```

Then enable GitHub Pages in repository settings.

### Netlify
1. Connect your GitHub repository
2. Netlify automatically deploys on push
3. Get a free domain

### Vercel
1. Import your GitHub repository
2. One-click deployment
3. Free HTTPS and CDN

## 📊 Performance

- **Load Time** - < 2 seconds on 4G
- **Bundle Size** - ~50KB (HTML + CSS + JS)
- **API Calls** - 2-3 per search
- **Caching** - Uses browser cache for icons

## 📝 License

Free to use and modify. OpenWeatherMap API data is used under their terms.

## 🤝 Contributing

Feel free to fork, modify, and improve!

## 📧 Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation
- Check browser console for errors

---

**Made with ❤️ for weather enthusiasts**

**Last Updated:** May 2026
