let now = new Date();
let apiKey = "2b6fdad0cbd018949c50c70f72250726";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lusaka&key=b252t4b0o976488cbc694aa15c9f3361&units=metric`;
axios.get(apiUrl).then(displayTemp);

//Default City
function displayTemp(response){
  console.log(response.data)
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
description.innerHTML = response.data.condition.description;
temperature.innerHTML = Math.round(response.data.temperature.current);
city.innerHTML= response.data.city;
humidity.innerHTML = `Humidity: ${Math.round(response.data.temperature.humidity)}%`;
windspeed.innerHTML =`Windspeed: ${Math.round(response.data.wind.speed)}kmp/h`
}
function displayCity(response) {
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
  }
  //Search weather
  function handleSubmit(event) {
  event.preventDefault();
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