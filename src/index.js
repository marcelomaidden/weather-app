import Weather from './weather';

const weather = new Weather();

let searchCity = document.querySelector('.submit-city');
searchCity.addEventListener('click', weather.listCities, false);
