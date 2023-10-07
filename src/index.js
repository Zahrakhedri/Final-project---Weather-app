function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];
  return `${day}  ${hours}:${minutes}`;
}

function displayForecast(response) {
  let weatherForecast = document.querySelector("#forecast");
  let days = ["sun", "mon", "thu"];
  let forecastHtml = `<div class="row">`;
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `    <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon"><img src="#" alt="" /></div>
            <div class="weather-forecast-temperature">
              <span class="max-temp">18° </span>
              <span class="min-temp">12°</span>
            </div>
          </div>
  `;
  });
  forecastHtml = forecastHtml + `</div>`;
  weatherForecast.innerHTML = forecastHtml;
}

function showTemperature(response) {
  let cityName = document.querySelector("h1");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celciusTemperature = response.data.main.temp;
  cityName.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#city-input");
  search(inputElement.value);
  celcuisLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celcuisLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celcuisLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celcuisLink = document.querySelector("#celcius-link");
celcuisLink.addEventListener("click", displayCelciusTemperature);

search("san francisco");
displayForecast();
