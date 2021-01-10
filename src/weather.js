class Weather {
  constructor() {
    this.showSpinner = this.showSpinner.bind(this);
    this.listCities = this.listCities.bind(this);
    this.filterCities = this.filterCities.bind(this);
    this.showWeather = this.showWeather.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.setMessage = this.setMessage.bind(this);

    this.message = document.querySelector('.message');
  }

  setMessage(message) {
    this.message.innerHTML = message;
  }

  showMessage(active) {
    active?this.message.setAttribute('class', 'message d-flex'):this.message.setAttribute('class', 'message d-none');
  }

  showSpinner(active) {
    let spinner = document.querySelector('.spinner-border');
    spinner.setAttribute('class', `spinner-border ${active==true?"d-flex":"d-none"}`);
  }

  filterCities(beginCharacter) {
    let promise = new Promise((resolve, reject) => {
      try{
        let result = this.cities.map(({id, name}) => {
          if (name.toLowerCase().startsWith(beginCharacter.toLowerCase()))
          {
            return {id, name}
          }
          else
            return "fail"
        }).filter(city => {
          return city !== "fail"
        });
        return resolve(result)        
      }
      catch {
        return reject("An error ocurred while working on cities");
      }
    });
    return promise
  }

  async showWeather(event) {
    this.showSpinner(true);
    this.setMessage("Reading weather for the chosen city");
   
    let readWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${event.target.id}&appid=${API_KEY.API_KEY}`, 
    {
      method: 'GET',
    });
    let {weather, main} = await readWeather.json();
    console.log(weather,main);
    this.showSpinner(false);
  }
  
  async listCities(event) {
    let searchCity = document.querySelector('.search-city');
    let beginCharacter = searchCity.value;
    if (beginCharacter) {
      this.showSpinner(true);
      this.showMessage(true);
      this.setMessage("Reading cities file");
      const fetchCities = await fetch('city.list.min.json');
      this.setMessage("File read, transforming in json");
      this.cities = await fetchCities.json();
      const ulCities = document.querySelector('.cities');
  
      this.setMessage("Fetching cities");
      this.showMessage(false);
      this.cities = await this.filterCities(beginCharacter);
      
      ulCities.innerHTML = '';

      await this.cities.forEach(function({id, name}) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('id', id);
        a.setAttribute('class', 'dropdown-item');
        a.setAttribute('href', "#");
        a.innerText = name;
        li.appendChild(a);
        ulCities.appendChild(li);
      });
  
      let citiesDropdownItem = document.querySelectorAll('.dropdown-item');
      citiesDropdownItem.forEach(city => {
        city.addEventListener('click', this.showWeather, false);
      });

      let selectCities = document.querySelector('.select-cities');
      selectCities.setAttribute('class', 'dropdown select-cities d-flex');

      this.showSpinner(false);
    }
  }
}

export default Weather;