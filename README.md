# 🌦️ Weather Web App

A responsive weather web application built with **HTML, CSS, Bootstrap, and JavaScript** that provides real-time weather information for cities worldwide. Features dynamic UI themes based on sunrise/sunset times, interactive maps, and voice search capability.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Learning Journey](#-learning-journey)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🔍 **City Search**: Search weather by city name with autocomplete support
- 🎤 **Voice Search**: Search using voice commands (Chrome/Edge)
- 🌡️ **Comprehensive Weather Data**:
  - Current, min & max temperature
  - Humidity levels
  - Wind speed (toggle between m/s and km/h)
  - Temperature unit toggle (°C and °F)
  - Sunrise & sunset times with countdown
- 🗺️ **Interactive Map**: LeafletJS integration showing weather location
- 🌍 **Multi-City Dashboard**: Displays weather for 6 predefined cities (Seattle, Paris, New York, Tokyo, Maldives, California)
- 🎨 **Dynamic Theming**:
  - 🌙 Night theme (before sunrise)
  - 🌅 Morning theme (sunrise time)
  - 🌇 Evening theme (sunset time)
- 📱 **Fully Responsive**: Mobile-first design using Bootstrap 5
- ⚡ **Fast & Lightweight**: No heavy dependencies, optimized performance
- 💬 **Contact Form**: Email notifications with FormSubmit

---

## 🖼️ Demo

### Live Features:
- Search Delhi, Meerut, or any city to see real-time weather
- Watch the screen colors change based on local sunrise/sunset
- Try voice search with "Search for London"
- Toggle temperature units with a single click
- Interactive map shows weather location

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|---------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6) |
| **UI Framework** | Bootstrap 5 |
| **Maps** | Leaflet.js |
| **APIs** | OpenWeatherMap API |
| **Email** | FormSubmit (no backend needed) |
| **Icons** | Bootstrap Icons |

---

## 📂 Project Structure

```
weather-app/
├── ss.html                 # Main weather page
├── map.html                # Map view
├── script.js               # Main JavaScript logic
├── map.js                  # Map-specific scripts
├── CSS/
│   ├── bootstrap.min.css   # Bootstrap framework
│   └── map.css             # Map styling
├── JS/
│   └── bootstrap.bundle.min.js  # Bootstrap JavaScript
├── README.md               # This file
└── [Other assets]
```

---

## 🚀 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls)
- No server required!

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Open in browser**
   ```bash
   # Option 1: Double-click ss.html file
   # Option 2: Use Live Server extension in VS Code
   # Option 3: Use Python server
   python -m http.server 8000
   ```

3. **Set up email notifications (Optional)**
   - Edit `ss.html` line 369
   - Change email in: `action="https://formsubmit.co/your_email@gmail.com"`

---

## 💻 Usage

### Search Weather
```
1. Type city name in search box
2. Press Enter OR click Search button
3. Weather updates automatically
4. Watch colors change based on sunrise/sunset!
```

### Features in Action

#### Unit Conversion
```
Click °C button → Converts to °F
Click m/s button → Converts to km/h
```

#### Voice Search
```
Click 🎤 button → Speak city name → Weather updates
```

#### Dynamic Background Theme
```
🌙 Before Sunrise → Dark Blue/Purple theme
🌅 After Sunrise → Golden/Orange theme  
🌇 After Sunset → Red/Orange theme
```

#### Interactive Map
```
Each weather search shows location on map
Popup displays city name, temperature, conditions
```

---

## 📡 API Reference

### OpenWeatherMap API
```javascript
// Endpoint
https://api.openweathermap.org/data/2.5/weather

// Parameters
- q: city name
- units: metric (Celsius)
- appid: your API key

// Response includes
- Temperature data
- Humidity
- Wind speed
- Sunrise/Sunset times
- Coordinates (for map)
```

**Get your free API key**: [openweathermap.org/api](https://openweathermap.org/api)

---

## 🔄 Learning Journey

### Challenge 1: API Selection
Initially used **API Ninja** which only returned coordinates, making city search difficult.

✅ **Solution**: Switched to **OpenWeatherMap API** for direct city-based queries.

### Challenge 2: Bootstrap CDN Issues
Bootstrap wasn't loading from CDN in some environments, causing JavaScript errors.

✅ **Solution**: 
- Downloaded Bootstrap locally
- Linked from `CSS/` and `JS/` folders
- Used browser console to debug

### Challenge 3: Email Notifications
EmailJS CDN was blocked on restricted networks.

✅ **Solution**: 
- Switched to **FormSubmit** (no server needed)
- Works with plain HTML forms
- No CDN dependencies

### Key Learnings
✅ Async/await for API calls  
✅ DOM manipulation with vanilla JavaScript  
✅ Responsive design with Bootstrap  
✅ Browser debugging & console usage  
✅ Working with external APIs & libraries  
✅ Problem-solving when CDNs are blocked  
✅ Dynamic styling & themes  

---

## 🎯 Future Enhancements

- [ ] 7-day & hourly forecast
- [ ] Geolocation auto-detection
- [ ] Save favorite cities
- [ ] Dark/Light mode toggle
- [ ] Weather alerts & notifications
- [ ] Air quality index (AQI)
- [ ] UV index & pollen count
- [ ] PWA (Progressive Web App)
- [ ] Offline support
- [ ] Multi-language support
- [ ] Historical weather data
- [ ] Weather comparison (2 cities)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Style
- Use ES6+ features
- Add comments for complex logic
- Keep functions modular and reusable
- Test on multiple devices/browsers

---

## 📄 License

This project is licensed under the **MIT License** - see LICENSE file for details.

---

## 📧 Contact & Support

- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Your Profile]

### Issues & Bugs
If you find a bug or have suggestions, please [open an issue](https://github.com/yourusername/weather-app/issues)

---

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org) - Weather API
- [Bootstrap](https://getbootstrap.com) - UI Framework
- [Leaflet.js](https://leafletjs.com) - Interactive Maps
- [FormSubmit](https://formsubmit.co) - Email Service

---

## 📊 Stats

- ⭐ Star this repo if you found it helpful!
- 🍴 Fork for your own version
- 👀 Watch for updates

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Status**: ✅ Active & Maintained
