let now = new Date();
let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
let defaultCity = "Lusaka";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayCity);

//Default City
function displayTemp(response){
  console.log(response);
let city = document.querySelector("#main-city");
let temperature = document.querySelector("#temperature");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humid");
let windspeed = document.querySelector("#wind");
let date = document.querySelector("#first-day");
let time = document.querySelector("#time");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let today = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
date.innerHTML = `Last Updated: ${today}`;
if (minutes < 10) {
  time.innerHTML = `${hours}:0${minutes}`;
} else {
  time.innerHTML = `${hours}:${minutes}`;
}
description.innerHTML = response.data.weather[0].description;
temperature.innerHTML = Math.round(response.data.main.temp);
city.innerHTML= response.data.city;
humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
windspeed.innerHTML =`Windspeed: ${Math.round(response.data.wind.speed)}kmp/h`
}


function displayCity(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let mainIcon  = document.querySelector("#main-icon");
  mainIcon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  let alternativeText = document.querySelector("#main-icon");
  alternativeText .setAttribute("alt",response.data.weather[0].description);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = temperature;
  let humidity = document.querySelector("#humid");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)}kmp/h`;
  let description = document.querySelector("#description");
  description.innerHTML=response.data.weather[0].description;
  let place = document.querySelector("#main-city");
  place.innerHTML = `Weather in ${city}`;
  let date = document.querySelector("#first-day");
  let time = document.querySelector("#time");
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let today = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  celcius = response.data.main.temp;
  date.innerHTML = `Last Updated: ${today}`;
  if (minutes < 10) {
    time.innerHTML = `${hours}:0${minutes}`;
  } else {
    time.innerHTML = `${hours}:${minutes}`;
  }
  if (hours < 10) {
    time.innerHTML = `0${hours}:${minutes}`;
  } else {
    time.innerHTML = `${hours}:${minutes}`;
  }
  getforecast(response.data.coord);
  }

  //Search weather
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
    let input = document.querySelector("#search-input");
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCity);
  }
  let city = document.querySelector("#city-form");
  city.addEventListener("submit", handleSubmit);
  
  //Current Weather
  function showLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCity);
  }
  function showMyPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
  }
  let button = document.querySelector("#current-button");
  button.addEventListener("click", showMyPosition);

  //Weekly Forecast
  function displayForecast(response){
    let foreCast = (response.data.daily);
    let forecast = document.querySelector("#week-forecast");
   let forecastHTML = `<div class="row">`;

  foreCast.forEach(function(foreCastDay, index) {
    if (index < 6){
    forecastHTML = forecastHTML + `<span class="col-2" id="weeklytemp">
    <Span class="weekly-date" id="this-week">${formatDay(foreCastDay.dt)}<br />
      <img src="http://openweathermap.org/img/wn/${foreCastDay.weather[0].icon}@2x.png" width="40px"/>
    <div class="temperatures">
      <span class="max-temp">
        ${Math.round(foreCastDay.temp.max)}°C
      </span>/
      <span class="min-temp">
        ${Math.round(foreCastDay.temp.max)}°C
      </span>
    </div>
    </Span>
  </Span>`; }
  })
    forecastHTML = forecastHTML+`</div>`;
  forecast.innerHTML=forecastHTML;
  }
  function getforecast(coordinates){
    console.log(coordinates);
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  function formatDay(timestamp){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date(timestamp *1000);
    let day = date.getDay();

    return days[day];
  }