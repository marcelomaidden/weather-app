(()=>{"use strict";const e=new class{constructor(){this.showSpinner=this.showSpinner.bind(this),this.listCities=this.listCities.bind(this),this.filterCities=this.filterCities.bind(this),this.showWeather=this.showWeather.bind(this),this.showMessage=this.showMessage.bind(this),this.setMessage=this.setMessage.bind(this),this.message=document.querySelector(".message")}setMessage(e){this.message.innerHTML=e}showMessage(e){e?this.message.setAttribute("class","message d-flex"):this.message.setAttribute("class","message d-none")}showSpinner(e){document.querySelector(".spinner-border").setAttribute("class","spinner-border "+(1==e?"d-flex":"d-none"))}filterCities(e){return new Promise(((t,s)=>{try{return t(this.cities.map((({id:t,name:s})=>s.toLowerCase().startsWith(e.toLowerCase())?{id:t,name:s}:"fail")).filter((e=>"fail"!==e)))}catch{return s("An error ocurred while working on cities")}}))}async showWeather(e){this.showSpinner(!0),this.setMessage("Reading weather for the chosen city");let t=await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${e.target.id}&appid=2adf01b5e325f219ebee645945fa0afa`,{method:"GET"}),{weather:s,main:i}=await t.json();console.log(s,i),this.showSpinner(!1)}async listCities(e){let t=document.querySelector(".search-city").value;if(t){this.showSpinner(!0),this.showMessage(!0),this.setMessage("Reading cities file");const e=await fetch("city.list.min.json");this.setMessage("File read, transforming in json"),this.cities=await e.json();const s=document.querySelector(".cities");this.setMessage("Fetching cities"),this.showMessage(!1),this.cities=await this.filterCities(t),s.innerHTML="",await this.cities.forEach((function({id:e,name:t}){let i=document.createElement("li"),n=document.createElement("a");n.setAttribute("id",e),n.setAttribute("class","dropdown-item"),n.setAttribute("href","#"),n.innerText=t,i.appendChild(n),s.appendChild(i)})),document.querySelectorAll(".dropdown-item").forEach((e=>{e.addEventListener("click",this.showWeather,!1)})),document.querySelector(".select-cities").setAttribute("class","dropdown select-cities d-flex"),this.showSpinner(!1)}}};document.querySelector(".submit-city").addEventListener("click",e.listCities,!1)})();