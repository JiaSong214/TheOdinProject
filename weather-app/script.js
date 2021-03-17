//API
const getCoordinates = async (cityName) => {
  const cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=b9c5c235eef17e0148585b7ce0b141d0`;

  const respond = await fetch(cityApi);
  const data = await respond.json();

  return data.coord;
}

const getWeatherData = async (coordinates) => {
  const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=metric&APPID=b9c5c235eef17e0148585b7ce0b141d0`;

  const respond = await fetch(api);
  const data = await respond.json();

  return data;
}

const handleData = async (cityName) => {
  let coord
  let data;

  try {
    coord = await getCoordinates(cityName);
    data = await getWeatherData(coord);

    renderDOM(data);
  }catch {
    renderErrorDOM();
  }
}

const submitForm = (e) =>{
  e.preventDefault();

  const input = document.querySelector('input');
  handleData(input.value);

  input.value = ``;
}


const matchIcon = (description) => {
  const findCode = () => {
    switch(description){
      case `Clear`:
        return `01d`;
      case `Clouds`:
        return `02d`;
      case `Rain`:
        return `09d`;
      case `Thunderstorm`:
        return `07d`;
      case `Snow`:
        return `13d`;
      case `Mist` || `Smoke` || `Haze` || `Dust` || `Fog` || `Sand` || `Ash` || `Squall` || `Tornado`:
        return `50d`;
      default:
        return `01d`;
    }
  }

  return `http://openweathermap.org/img/wn/${findCode()}@2x.png`;
}

const convertDate = (unix) => {
  const convertedDate = new Date(unix * 1000);
  const date = convertedDate.getDate();
  const month = convertedDate.getMonth();

  const monthsString = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Octr', 'Nov', 'Dec' ];

  return `${date} ${monthsString[month]}`;
}

const convertHour = (unix) => {
  const convertedDate = new Date(unix * 1000);
  const hours = convertedDate.getHours();
  const ampm = hours >= 12 ? ' pm' : 'am';
  const ampmHours = hours == 12 ? 12 : hours % 12;

  return `${ampmHours} ${ampm}`;
}

const renderDOM = (data) => {
  const container = document.querySelector('#container');
  container.classList.remove('err');

  //main information
  const cityName = document.querySelector('.cityBox .cityName');
  cityName.textContent = data.timezone;

  const weatherIcon = document.querySelector('.cityBox .weatherIcon');
  weatherIcon.src = matchIcon(data.current.weather[0].main)

  const temperature = document.querySelector('.cityBox .temperature');
  temperature.textContent = Math.round(data.current.temp);

  const summary = document.querySelector('.cityBox .summary');
  summary.textContent = data.current.weather[0].description;

  //hourly information
  const hourlyList = document.querySelector('.hourly ul');
  hourlyList.textContent = ``;

  for(let i=0; i<7; i++){
    const hourlyItem = document.createElement('li');

    const hourlyItem__title = document.createElement('h4');
    hourlyItem__title.textContent = convertHour(data.hourly[i].dt);

    const hourlyItem__icon = document.createElement('img');
    hourlyItem__icon.src = matchIcon(data.hourly[i].weather[0].main);

    const hourlyItem__temp = document.createElement('p');
    hourlyItem__temp.classList.add('temperature');
    hourlyItem__temp.textContent = Math.round(data.hourly[i].temp);

    const hourlyItem__tempSymbol = document.createElement('span');
    hourlyItem__tempSymbol.innerHTML = '&#176;'

    const hourlyItem__innerbox = document.createElement('div');
    hourlyItem__innerbox.append(hourlyItem__temp, hourlyItem__tempSymbol);

    const hourlyItem__summary = document.createElement('p');
    hourlyItem__summary.classList.add('summary');
    hourlyItem__summary.textContent = data.hourly[i].weather[0].main;

    hourlyList.append(hourlyItem);
    hourlyItem.append(hourlyItem__title, hourlyItem__icon, hourlyItem__innerbox, hourlyItem__summary);
  }

  //daily information
  const dailyList = document.querySelector('.daily ul');
  dailyList.textContent = ``;

  for(let i=0; i<7; i++){
    const dailyItem = document.createElement('li');

    const dailyItem__title = document.createElement('h4');
    dailyItem__title.textContent = convertDate(data.daily[i].dt);

    const dailyItem__icon = document.createElement('img');
    dailyItem__icon.src = matchIcon(data.hourly[i].weather[0].main);

    const dailyItem__temp = document.createElement('p');
    dailyItem__temp.classList.add('temperature');
    dailyItem__temp.textContent = Math.round(data.daily[i].temp.day);
    // `${data.daily[i].temp.min} / ${data.daily[i].temp.max}`

    const dailyItem__tempSymbol = document.createElement('span');
    dailyItem__tempSymbol.innerHTML = '&#176;'

    const dailyItem__innerbox = document.createElement('div');
    dailyItem__innerbox.append(dailyItem__temp, dailyItem__tempSymbol);

    const dailyItem__summary = document.createElement('p');
    dailyItem__summary.classList.add('summary');
    dailyItem__summary.textContent = data.daily[i].weather[0].main;

    dailyList.append(dailyItem);
    dailyItem.append(dailyItem__title, dailyItem__icon, dailyItem__innerbox, dailyItem__summary);
  }
}

const renderErrorDOM = () => {
  const container = document.querySelector('#container');
  container.classList.add('err');
}

const firstRendering = () => {
  handleData('sydney');
}

const searchForm = document.querySelector('.searchForm');
searchForm.addEventListener('submit', function(e) {submitForm(e)})
firstRendering();
