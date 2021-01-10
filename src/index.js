import Weather from './weather';

const weather = new Weather();
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(weather.setPosition);
} else { 
  weather.showMessage("Geolocation is not supported by this browser.", true);
}

const searchCity = document.querySelector('.submit-city');
searchCity.addEventListener('click', weather.listCities, false);