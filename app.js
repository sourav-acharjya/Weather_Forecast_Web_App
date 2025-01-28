const apiKey = "put your own api key..";
let currentCity = "Jhargram"; // Default city

window.onload = function () {
  fetchWeatherData(currentCity);
};

// Function to handle search input
function searchCity() {
  const city = document.getElementById("city-input").value;
  if (city) {
    currentCity = city;
    fetchWeatherData(city);
  }
}

// Fetch weather data from the API
function fetchWeatherData(city) {
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Function to update the UI with weather data
function updateUI(data) {
  const temperature = data.current.temp_c;
  const weatherCondition = data.current.condition.text;
  const airQuality = data.current.air_quality.pm10;

  document.getElementById("temperature").textContent = temperature;
  document.getElementById("weather-condition").textContent = weatherCondition;
  document.getElementById(
    "aqi"
  ).textContent = `Air Quality (PM10): ${airQuality}`;

  // Change background based on weather condition
  if (weatherCondition.toLowerCase().includes("sunny")) {
    setWeatherBackground("sunny");
  } else if (weatherCondition.toLowerCase().includes("cloudy")) {
    setWeatherBackground("cloudy");
  } else if (weatherCondition.toLowerCase().includes("rain")) {
    setWeatherBackground("rainy");
  } else {
    setWeatherBackground("night");
  }
}

// Set weather background based on condition
function setWeatherBackground(condition) {
  const allConditions = ["sunny", "rainy", "cloudy", "night"];
  allConditions.forEach((cond) => {
    document.body.classList.remove(cond);
    document.querySelector(`.weather-bg.${cond}`).style.display = "none";
  });

  document.body.classList.add(condition);
  document.querySelector(`.weather-bg.${condition}`).style.display = "block";
}
