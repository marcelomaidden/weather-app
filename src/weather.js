class Weather {
  constructor() {
    this.showSpinner = this.showSpinner.bind(this);
    this.listCities = this.listCities.bind(this);
    this.filterCities = this.filterCities.bind(this);
  }

  showSpinner(active) {
    let spinner = document.querySelector('.spinner-border');
    spinner.setAttribute('class', `spinner-border ${active==true?"d-flex":"d-none"}`);
  }

  filterCities(beginCharacter) {
    let promise = new Promise((resolve, reject) => {
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
    });
    return promise
  }
  
  async listCities(event) {
    let searchCity = document.querySelector('.search-city');
    let beginCharacter = searchCity.value;
    if (beginCharacter) {
      this.showSpinner(true);
      let message = document.querySelector('.message');
      message.setAttribute('class', 'message d-flex');
      message.innerHTML = "Reading cities file";
      const fetchCities = await fetch('city.list.min.json');
      message.innerHTML = "File read, transforming in json";
      this.cities = await fetchCities.json();
      const ulCities = document.querySelector('.cities');
  
      message.innerHTML = "Fetching cities";
      message.setAttribute('class', 'message d-none');
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
  
      let selectCities = document.querySelector('.select-cities');
      selectCities.setAttribute('class', 'dropdown select-cities d-flex');

      this.showSpinner(false);
    }
  }
}

export default Weather;