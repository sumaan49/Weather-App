
function getTime() {
  const time = document.querySelector('.time');
  let currentTime = new Date().toLocaleString();
  time.innerHTML = currentTime;
}

const userInput = document.querySelector('.userInput');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeather(userInput.value);
  form.reset();
})


async function getWeather(location) {
  const API_KEY = '59cbdfb65fdbf0c6d242e666b469b429'
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`, {mode: 'cors'});
    const data = await response.json();
    const processedData = processData(data);
    display(processedData);

  } catch(error) {
    alert(error)
  }
}

function processData(data) {
  const refinedData = {
    location: data.name,
    country: data.sys.country,
    status: data.weather[0].description,
    temperature: data.main.temp - 273,
    max: data.main.temp_max,
    min: data.main.temp_min
  };
  return refinedData;
}

function display(data) {
  const location = document.querySelector('.location');
  const status = document.querySelector('.status');
  const temperature = document.querySelector('.temperature');

  location.innerHTML = `${data.location}, ${data.country}`;
  status.innerHTML = data.status;
  temperature.innerHTML = toFahrenheit(data.temperature);

}

function toFahrenheit(temperature) {
  temperature = parseFloat(temperature);
  temperatureerature = Math.round((temperature = (temperature - 32) * (5/9)));
  return temperature;
}

function toCelsius(temperature) {
  temperature = parseFloat(temperature);
  temperature = Math.round((temperature = (temperature - 32) * (5 / 9)));
  return temperature;
}