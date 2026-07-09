function updateWeather(response) {
  let temperatureElement = document.querySelector("#actual-temperature");
  let temperature = response.data.temperature.current;
  let cityNameElement = document.querySelector("#city-name");
  let descriptionElelment = document.querySelector("#status");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let pressureValueElement = document.querySelector("#pressure-value");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = response.data.temperature.feels_like;
  let iconElement = document.querySelector("#icon");

  cityNameElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElelment.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  pressureValueElement.innerHTML = `${response.data.temperature.pressure} hPa`;
  temperatureElement.innerHTML = Math.round(temperature);
  feelsLikeElement.innerHTML = `Feels like <strong>${Math.round(feelsLike)}°C</strong>`;
  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let dayOfMonth = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();

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
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = days[date.getDay()];
  let month = months[date.getMonth()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${dayOfMonth} ${month}<br /> ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "5bac517fb09b890c4230d5t470ofe359";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "5bac517fb09b890c4230d5t470ofe359";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5)
      forecastHtml += `
    <div class="day">
    <div class="day-name">${formatDay(day.time)}</div>
    <div class="day-icon">
    <img src="${day.condition.icon_url}" />
    </div>
    <div class="high">${Math.round(day.temperature.maximum)}°</div>
    <div class="low">${Math.round(day.temperature.minimum)}°</div>
    </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Kyiv");
