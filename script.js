console.log("JS file is loaded!");

// ====================== GLOBAL ======================
let map;

// ====================== UNIT TOGGLE (WIND) ======================
let isMS = true;          // current unit
let baseWindSpeed = 0;   // original m/s value

// ====================== UNIT TOGGLE (TEMP) ======================
let isCelsius = true;
let baseTemp = 0;
let baseFeelsLike = 0;
let baseMinTemp = 0;
let baseMaxTemp = 0;

// ====================== SUNRISE / SUNSET ======================
let sunriseTime = 0;
let sunsetTime = 0;
let countdownInterval;

// ====================== GET WEATHER ======================
async function getWeather(city) {
  const apiKey = "2a2c7085def74894a11b67980277d22f";
  city = city.trim();
  if (!city) return;

  // Capitalize first letters
  city = city.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result.cod !== 200) {
      alert("City not found or API error!");
      return;
    }

    console.log("Weather Result:", result);

    // ====================== UPDATE LOCATION HEADING ======================
    document.getElementById("locationHeading").innerText = `Weather for ${result.name}`;

    // ====================== TEMP ======================
    baseTemp = result.main.temp;
    baseFeelsLike = result.main.feels_like;
    baseMinTemp = result.main.temp_min;
    baseMaxTemp = result.main.temp_max;

    document.querySelectorAll(".tempval").forEach(el => el.innerText = baseTemp);
    document.getElementById("feelslikevalue").innerText = baseFeelsLike;
    document.getElementById("mintempval").innerText = baseMinTemp;
    document.getElementById("maxtempval").innerText = baseMaxTemp;

    // reset temp toggle
    isCelsius = true;
    document.getElementById("tempToggle").innerText = "°C";
    document.querySelectorAll(".tempUnit").forEach(el => el.innerText = "°C");

    // ====================== HUMIDITY ======================
    document.querySelectorAll(".humidityvalue").forEach(el => el.innerText = result.main.humidity);
    document.getElementById("winddegreevalue").innerText = result.wind.deg;

    // ====================== WIND SPEED ======================
    baseWindSpeed = result.wind.speed;
    document.querySelectorAll(".windspeedvalue").forEach(el => el.innerText = baseWindSpeed);
    isMS = true;
    document.getElementById("speedToggle").innerText = "m/s";
    document.querySelectorAll(".windUnit").forEach(el => el.innerText = "m/s");

    // ====================== SUNRISE / SUNSET ======================
    sunriseTime = result.sys.sunrise * 1000;
    sunsetTime = result.sys.sunset * 1000;

    document.getElementById("sunrisevalue").innerText = new Date(sunriseTime).toLocaleTimeString();
    document.getElementById("sunsetvalue").innerText = new Date(sunsetTime).toLocaleTimeString();

    startSunCountdown();

    // ====================== SHOW MAP ======================
    showMap(result.coord.lat, result.coord.lon, result.name, result.main.temp, result.weather[0].main);

  } catch (error) {
    console.error("API Error:", error);
    alert("City not found or API error!");
  }
}

// ====================== SHOW MAP ======================
function showMap(lat, lon, city, temp, condition) {
  if (map) map.remove();

  map = L.map('map').setView([lat, lon], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  const weatherIcon = L.divIcon({
    className: "weather-marker",
    html: "📍",
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });

  L.marker([lat, lon], { icon: weatherIcon })
    .addTo(map)
    .bindPopup(`
      <div class="popup-card">
        <h4>${city}</h4>
        <p>🌡️ <strong>${temp}°C</strong></p>
        <p>☁️ ${condition}</p>
      </div>
    `)
    .openPopup();
}

// ====================== OTHER CITIES ======================
const otherCities = ["Seattle", "California", "Paris", "New York", "Japan", "Maldives"];

async function updateOtherCitiesWeather() {
  const apiKey = "2a2c7085def74894a11b67980277d22f";
  const rows = document.querySelectorAll("table tbody tr");

  for (let i = 0; i < otherCities.length; i++) {
    const city = otherCities[i];
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.cod !== 200) continue;

      const row = rows[i];
      row.querySelector(".cloud_pct").innerText = data.clouds.all;
      row.querySelector(".feels_like").innerText = data.main.feels_like;
      row.querySelector(".grnd_level").innerText = data.main.grnd_level || "-";
      row.querySelector(".humidity").innerText = data.main.humidity;
      row.querySelector(".pressure").innerText = data.main.pressure;
      row.querySelector(".sea_level").innerText = data.main.sea_level || "-";
      row.querySelector(".temp").innerText = data.main.temp;
      row.querySelector(".max_temp").innerText = data.main.temp_max;
      row.querySelector(".min_temp").innerText = data.main.temp_min;
    } catch (err) {
      console.error("Other cities weather error:", city, err);
    }
  }
}

// ====================== EVENT LISTENERS ======================
const cityInput = document.getElementById("cityInput");

if(cityInput) {
    cityInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city !== "") getWeather(city);
      }
    });
}

const searchBtn = document.getElementById("searchBtn");
if(searchBtn) {
    searchBtn.addEventListener("click", () => {
      const city = cityInput.value.trim();
      if (city !== "") getWeather(city);
    });
}

// ====================== VOICE SEARCH ======================
const voiceBtn = document.getElementById("voiceBtn");
if(voiceBtn) {
    voiceBtn.addEventListener("click", () => {
      if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        alert("Your browser does not support voice recognition. Use Chrome or Edge.");
        return;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();
      voiceBtn.innerText = "🎤 Listening...";

      recognition.onresult = (event) => {
        let city = event.results[0][0].transcript;
        city = city.replace(/[^a-zA-Z\s]/g, "").trim();
        city = city.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        cityInput.value = city;
        getWeather(city);
        voiceBtn.innerText = "🎤";
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        voiceBtn.innerText = "🎤";
      };

      recognition.onend = () => {
        voiceBtn.innerText = "🎤";
      };
    });
}

// ====================== WIND SPEED TOGGLE ======================
const speedToggle = document.getElementById("speedToggle");
if(speedToggle) {
    speedToggle.addEventListener("click", () => {
      isMS = !isMS;
      const value = isMS ? baseWindSpeed : (baseWindSpeed * 3.6).toFixed(1);
      const unit = isMS ? "m/s" : "km/h";
      document.querySelectorAll(".windspeedvalue").forEach(el => { el.innerText = value; });
      document.querySelectorAll(".windUnit").forEach(el => { el.innerText = unit; });
      speedToggle.innerText = unit;
    });
}

// ====================== TEMP TOGGLE ======================
const tempToggle = document.getElementById("tempToggle");
if(tempToggle) {
    tempToggle.addEventListener("click", () => {
      isCelsius = !isCelsius;
      const convert = c => isCelsius ? c : (c * 9 / 5 + 32).toFixed(1);
      const unit = isCelsius ? "°C" : "°F";
      document.querySelectorAll(".tempval").forEach(el => el.innerText = convert(baseTemp));
      document.getElementById("feelslikevalue").innerText = convert(baseFeelsLike);
      document.getElementById("mintempval").innerText = convert(baseMinTemp);
      document.getElementById("maxtempval").innerText = convert(baseMaxTemp);
      document.querySelectorAll(".tempUnit").forEach(el => el.innerText = unit);
      tempToggle.innerText = unit;
    });
}

// ====================== SUNRISE / SUNSET COUNTDOWN ======================
function startSunCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);

  function updateCountdown() {
    const now = Date.now();
    const sunriseDiff = sunriseTime - now;
    if (sunriseDiff > 0) {
      const h = Math.floor(sunriseDiff / 3600000);
      const m = Math.floor((sunriseDiff % 3600000) / 60000);
      document.getElementById("sunriseCountdown").innerText = `Sunrise in ${h}h ${m}m`;
    } else {
      document.getElementById("sunriseCountdown").innerText = "Sun has risen 🌅";
    }

    const sunsetDiff = sunsetTime - now;
    if (sunsetDiff > 0) {
      const h = Math.floor(sunsetDiff / 3600000);
      const m = Math.floor((sunsetDiff % 3600000) / 60000);
      document.getElementById("sunsetCountdown").innerText = `Sunset in ${h}h ${m}m`;
    } else {
      document.getElementById("sunsetCountdown").innerText = "Sun has set 🌙";
    }
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 60000);
}

// ====================== DEFAULT CITY ======================
window.addEventListener("DOMContentLoaded", () => {
  getWeather("Delhi");
  updateOtherCitiesWeather();
});

// ====================== CONTACT FORM - Using FormSubmit (No CDN needed) ======================
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;
  
  form.addEventListener("submit", function (e) {
    // FormSubmit will handle the submission natively
    // Just provide user feedback
    const submitBtn = form.querySelector("button[type='submit']");
    const feedback = document.getElementById("formFeedback");
    
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";
    feedback.innerText = "Sending your message...";
    feedback.style.color = "#ffc107";
  });
});