const API_KEY = "40abefa0b6d043217ac0b4dd419b339a";
const GEOLOCATION_API = "http://api.openweathermap.org/geo/1.0/direct?q=";
const CURRENT_WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";
const WEATHER_FORECAST_API = "https://api.openweathermap.org/data/2.5/onecall?";
const limit = 1;
let city = "";
const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const form = document.getElementById("search-form");
const searchArea = document.getElementById("search-area");
const inputValue = document.getElementById("search");

const sLine = document.getElementById("s-line");

form.addEventListener("submit", () => {
  city = inputValue.value;
  inputValue.value = "";
  getGeolocation(city);
});

async function getGeolocation(city) {
  const resp = await fetch(
    GEOLOCATION_API + `${city}&limit=${limit}&appid=${API_KEY}`
  );
  const jsObject = await resp.json();

  let lat = jsObject[0].lat;
  let lon = jsObject[0].lon;
  getCurrentWeather(lat, lon);
  getWeatherForecast(lat, lon);
}

async function getCurrentWeather(lat, lon) {
  const resp = await fetch(
    CURRENT_WEATHER_API + `lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  const jsObject = await resp.json();
  displayInfo(
    KelvinToCel(jsObject.main.temp),
    KelvinToCel(jsObject.main.temp_min),
    KelvinToCel(jsObject.main.temp_max),
    jsObject.weather[0].description,
    jsObject.weather[0].icon
  );
}

async function getWeatherForecast(lat, lon) {
  const resp = await fetch(
    WEATHER_FORECAST_API +
      `lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`
  );
  const jsObject = await resp.json();
  displayWeatherForecast(jsObject.daily);
}

function displayInfo(ct, mint, maxt, wd, icon) {
  if (window.innerWidth <= 768) {
    searchArea.animate(
      { left: "50%", top: "5%", transform: "translate(-50%, -5%)" },
      { duration: 500, fill: "forwards" }
    );
  } else {
    searchArea.animate(
      { left: "50%", top: "10%", transform: "translate(-50%, -10%)" },
      { duration: 500, fill: "forwards" }
    );
  }

  const currentWeatherEl = document.getElementById("current-weather");
  currentWeatherEl.innerHTML = "";
  currentWeatherEl.innerHTML = `<h1 class="city">${city}</h1>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="icon">
        <h2 class="ct">${ct}°C</h2>
        <div class="min-max-temp">
          <h3>${mint}°C</h3>
          <h3>/</h3>
          <h3>${maxt}°C</h3>
        </div>
        <h3 class="w-description">${wd}</h3>`;
  currentWeatherEl.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 1000,
    fill: "forwards",
  });
  sLine.animate({ opacity: 1 }, { duration: 1000, fill: "forwards" });
}

function displayWeatherForecast(list) {
  const wForecastEl = document.getElementById("w-forecast");
  wForecastEl.innerHTML = "";
  for (let i = 1; i <= 6; i++) {
    let day = list[i];
    const day_ = document.createElement("div");
    day_.classList.add("day");
    day_.innerHTML += `
          <h3>${weekDay(day.dt)}</h3>
          <img src="https://openweathermap.org/img/w/${
            day.weather[0].icon
          }.png" alt="icon" />
          <p><span id="max-temp">${KelvinToCel(
            day.temp.min
          )}</span>/<span id="min-temp">${KelvinToCel(
      day.temp.max
    )}</span></p>`;
    wForecastEl.appendChild(day_);
  }
}

function weekDay(mls) {
  const day = new Date(mls * 1000);
  return week[day.getDay()];
}

function KelvinToCel(temp) {
  let newTemp = temp - 273;
  return newTemp.toFixed(1);
}
