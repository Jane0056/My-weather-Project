function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let formattedDay = days[date.getDay()];
  let formattedMonth = months[monthIndex];

  return `${formattedDay}, ${day} ${formattedMonth} ${year}, ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
let searchInput = document.getElementById("search-input");
let currentCity = document.getElementById("current-city");
let currentTemperatureValue = document.getElementById(
  "current-temperature-value"
);
let currentTemperatureIcon = document.querySelector(
  ".current-temperature-icon"
);
let currentDateElement = document.querySelector("#current-date");

let apiKey = "0c0fc4d0af9a25bbb3ad3644ab6e153c";

searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission
  let city = searchInput.value.trim();

  if (city) {
    fetchCityWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

function fetchCityWeather(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios
    .get(apiUrl)
    .then(function (response) {
      let data = response.data;
      let temperature = data.main.temp;

      currentCity.textContent = city;
      currentTemperatureValue.textContent = Math.round(temperature);

      // Update the weather icon based on the temperature
      updateWeatherIcon(temperature);
    })
    .catch(function (error) {
      if (error.response && error.response.status === 404) {
        alert("City not found. Please check your input and try again.");
      } else {
        alert("Unable to fetch weather data. Please try again later.");
      }
    });
}

// Display current date and time
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

function updateWeatherIcon(temperature) {
  if (temperature < 0) {
    currentTemperatureIcon.textContent = "❄️"; // Snowflake for freezing temperatures
  } else if (temperature <= 15) {
    currentTemperatureIcon.textContent = "🌥️"; // Cloudy for cold weather
  } else if (temperature <= 25) {
    currentTemperatureIcon.textContent = "☀️"; // Sun for mild weather
  } else if (temperature <= 35) {
    currentTemperatureIcon.textContent = "🌞"; // Bright sun for warm weather
  } else {
    currentTemperatureIcon.textContent = "🔥"; // Fire for hot weather
  }
}
