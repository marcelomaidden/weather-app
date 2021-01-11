/* eslint-disable no-undef */
import Giphy from './giphy';

const giphy = new Giphy();
class Weather {
  constructor() {
    this.showSpinner = this.showSpinner.bind(this);
    this.listCities = this.listCities.bind(this);
    this.filterCities = this.filterCities.bind(this);
    this.showWeather = this.showWeather.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.switchTemperature = this.switchTemperature.bind(this);
    this.message = document.querySelector('.message');
  }

  setMessage(message) {
    this.message.innerHTML = message;
  }

  showMessage(active) {
    if (active) { return this.message.setAttribute('class', 'message d-flex'); }
    return this.message.setAttribute('class', 'message d-none');
  }

  showSpinner(active) {
    this.spinner = document.querySelector('.spinner-border');
    this.spinner.setAttribute('class', `spinner-border ${active === true ? 'd-flex' : 'd-none'}`);
  }

  filterCities(beginCharacter) {
    const promise = new Promise((resolve, reject) => {
      try {
        const result = this.cities.map(({ id, name }) => {
          if (name.toLowerCase().startsWith(beginCharacter.toLowerCase())) {
            return { id, name };
          }
          return 'fail';
        }).filter(city => city !== 'fail');
        return resolve(result);
      } catch (e) {
        return reject(e);
      }
    });
    return promise;
  }

  switchTemperature() {
    const temperature = document.querySelector('.temperature');
    const sw = document.querySelector('#switch-temperature');
    let type = '';
    if (sw.checked) {
      this.temperature = parseFloat(this.temperature) * 1.8 + 32;
      type = 'Fahrenheit';
    } else {
      this.temperature = (parseFloat(this.temperature) - 32) / 1.8;
      type = 'celsius';
    }
    temperature.innerHTML = `Temperature: ${this.temperature.toLocaleString('en-IN', { maximumSignificantDigits: 4 })} ${type}`;
  }

  setPosition(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    const switchTemp = document.querySelector('#switch-temperature');
    switchTemp.addEventListener('click', this.switchTemperature, false);

    this.showWeather();
  }

  async showWeather(event) {
    this.showSpinner(true);
    this.setMessage('Reading weather for the chosen city');
    let readWeather = '';
    let city = '';
    try {
      if (this.latitude && this.longitude) {
        readWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=metric&appid=${API_KEY.API_KEY}`,
          {
            method: 'GET',
          });
        city = `Current coordinates = latitude: ${this.latitude}, longitude: ${this.longitude}`;
      } else {
        readWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${event.target.id}&units=metric&appid=${API_KEY.API_KEY}`,
          {
            method: 'GET',
          });

        city = event.target.innerText;
      }
      const { weather, main: info } = await readWeather.json();
      const { temp } = info;
      this.temperature = temp;

      const title = document.querySelector('.card-title');
      const text = document.querySelector('.card-text');
      const temperature = document.querySelector('.temperature');
      const { description, main: status } = weather[0];
      title.innerHTML = city;
      text.innerHTML = `${description}`;
      temperature.innerText = `Temperature: ${temp}`;
      const sw = document.querySelector('#switch-temperature');
      sw.checked = false;
      await giphy.fetchGif(`https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY.GIPHY_KEY}&s=${status}`);

      this.showSpinner(false);
      this.showMessage(false);
    } catch (e) {
      this.setMessage(e);
      this.showMessage(true);
    }
  }

  async listCities() {
    const searchCity = document.querySelector('.search-city');
    const beginCharacter = searchCity.value;
    this.longitude = null;
    this.latitude = null;
    if (beginCharacter) {
      this.showSpinner(true);
      this.showMessage(true);
      this.setMessage('Reading cities file');
      const fetchCities = await fetch('city.list.min.json');
      this.setMessage('File read, transforming in json');
      this.cities = await fetchCities.json();
      const ulCities = document.querySelector('.cities');

      this.setMessage('Fetching cities');
      this.showMessage(false);
      this.cities = await this.filterCities(beginCharacter);

      ulCities.innerHTML = '';

      await this.cities.forEach(({ id, name }) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('id', id);
        a.setAttribute('class', 'dropdown-item');
        a.setAttribute('href', '#');
        a.innerText = name;
        li.appendChild(a);
        ulCities.appendChild(li);
      });

      const citiesDropdownItem = document.querySelectorAll('.dropdown-item');
      citiesDropdownItem.forEach(city => {
        city.addEventListener('click', this.showWeather, false);
      });

      const selectCities = document.querySelector('.select-cities');
      selectCities.setAttribute('class', 'dropdown select-cities d-flex');

      this.showSpinner(false);
    }
  }
}

export default Weather;
/* eslint-enable no-undef */