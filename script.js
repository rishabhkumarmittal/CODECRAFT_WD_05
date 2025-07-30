const API_KEY = 'b4fe31e0f0a066ccd783fac74d568162';
const cityEl = document.getElementById("city");
const dateTimeEl = document.getElementById("date-time");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("weather-icon");

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeather(lat, lon);
    });
  }
};

function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => updateWeather(data));
}

function fetchWeatherByInput() {
  const location = document.getElementById("location-input").value;
  if (!location) return;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => updateWeather(data));
}

function updateWeather(data) {
  cityEl.textContent = `${data.name}, ${data.sys.country}`;
  dateTimeEl.textContent = new Date().toLocaleString();
  tempEl.textContent = `${Math.round(data.main.temp)} °C`;
  descEl.textContent = data.weather[0].description;
  humidityEl.textContent = data.main.humidity;
  windEl.textContent = (data.wind.speed * 3.6).toFixed(1); // m/s to km/h
  iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

document.getElementById("location-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    fetchWeatherByInput();
  }
});

