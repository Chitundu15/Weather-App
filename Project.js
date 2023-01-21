let now = new Date();
let apiKey = "2b6fdad0cbd018949c50c70f72250726";

function displayDateAndTime(event) {
event.preventDefault();
let date = document.querySelector("#first-day");
let time = document.querySelector("#time");
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let today = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
date.innerHTML = `${today}`;
if (minutes < 10) {
  time.innerHTML = `${hours}:0${minutes}`;
} else {
  time.innerHTML = `${hours}:${minutes}`;
}
}

let time = document.querySelector("#search-button");
time.addEventListener("submit", displayDateAndTime);

//Current Weather
function displayCity(response) {
let temperature = Math.round(response.data.main.temp);
let city = response.data.name;
let temp = document.querySelector("#temperature");
temp.innerHTML = temperature;
let humidity = document.querySelector("#humid");
humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
let windspeed = document.querySelector("#wind");
windspeed.innerHTML = `Windspeed: ${(response.data.wind.speed)}mph`;
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
date.innerHTML = `${today}`;
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
}

function handleSubmit(event) {
event.preventDefault();
let input = document.querySelector("#search-input");
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCity);

}
let city = document.querySelector("#city-form");
city.addEventListener("submit", handleSubmit);


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