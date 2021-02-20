const refinedData = {};
let query;
const city = document.querySelector('.location');
const status = document.querySelector('.status');
const temperature = document.querySelector('.temperature');
const max = document.querySelector('.max');
const min = document.querySelector('.min');
const feel = document.querySelector('.feel');
const humidity = document.querySelector('.humidity');
const userInput = document.querySelector('.userInput');
const form = document.querySelector('form');
const map = document.querySelector('.map');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeather(userInput.value);
  form.reset();
});

map.addEventListener('mouseenter', () => {
  document.querySelector('.getLocation').style.display = 'block';
});
map.addEventListener('mouseleave', () => {
  document.querySelector('.getLocation').style.display = 'none';
})

map.addEventListener('click', () => {

  function success(position) {
    console.log(position.coords.latitude);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let userLocation = `lat=${latitude}&lon=${longitude}`;
    getWeather(userLocation);
  }
  function error() {
    alert(error);
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert('Geolocation is not supported by your browser');
  }
})



async function getWeather(location) {
  var hasNumber = /\d/;
  if (!hasNumber.test(location)) {
    location = `q=${location}`;
  }
  const API_KEY = '59cbdfb65fdbf0c6d242e666b469b429'
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${location}&appid=${API_KEY}`, {mode: 'cors'});
    const data = await response.json();
    const processedData = processData(data);
    display(processedData);

  } catch(error) {
    displayError();
  }
}

function processData(data) {
  const temp = kelvinToFahrenheit(data.main.temp);

  refinedData.temperature = {
      value: temp,
      unit: 'fahrenheit'
  };
  refinedData.location = data.name;
  refinedData.country = data.sys.country;
  refinedData.status = data.weather[0].description
  refinedData.max = kelvinToFahrenheit(data.main.temp_max);
  refinedData.min = kelvinToFahrenheit(data.main.temp_min);
  refinedData.feel = kelvinToFahrenheit(data.main.feels_like);
  refinedData.humidity = data.main.humidity;
  return refinedData;
}

function display(data) {
  const error = document.querySelector('.error');
  error.style.display = 'none';
  userInput.style.border = '1px solid rgb(243, 243, 243)';

  city.innerHTML = `${data.location}, ${data.country}`;
  status.innerHTML = data.status;
  humidity.innerHTML = data.humidity + '%';
  temperature.innerHTML = data.temperature.value + '&degF';
  max.innerHTML = data.max + '&degF';
  min.innerHTML = data.min + '&degF';
  feel.innerHTML = data.feel + '&degF';
}

const checkbox = document.querySelector("[name=checkbox]");
checkbox.addEventListener('change', toggleTemperature);

function toggleTemperature(e) {
  if (e.target.checked) {
    temperature.innerHTML = toCelsius(refinedData.temperature.value) + '&degC';
    max.innerHTML = toCelsius(refinedData.max) + '&degC';
    min.innerHTML = toCelsius(refinedData.min) + '&degC';
    feel.innerHTML = toCelsius(refinedData.feel) + '&degC';
  } else {
    temperature.innerHTML = refinedData.temperature.value + '&degF';
    max.innerHTML = refinedData.max + '&degF';
    min.innerHTML = refinedData.min + '&degF';
    feel.innerHTML = refinedData.feel + '&degF';
  };
}


function displayError() {
  const error = document.querySelector('.error');
  error.style.display = 'block';
  userInput.style.border = '2px solid #F44336';
}










function toFahrenheit(temperature) {
  temperatureerature = Math.round((temperature = (temperature - 32) * (5/9)));
  return temperature;
}

function toCelsius(temperature) {
  temperature = Math.round((temperature = (temperature - 32) * (5 / 9)));
  return temperature;
}

function kelvinToFahrenheit(temperature) {
  temperature = Math.round((1.8 * (temperature - 273)) + 32);
  return temperature;
}





