import Weather from './weather';

const weather = new Weather();

let searchCity = document.querySelector('.search-city');
searchCity.addEventListener('keyup', weather.listCities, false);
