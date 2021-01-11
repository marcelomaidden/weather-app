class Giphy {
  constructor() {
    this.fetchGif = this.fetchGif.bind(this);
  }

  async fetchGif(url) {
    const div = document.querySelector('.card');
    await fetch(url, {
      mode: 'cors',
    }).then(response => {
      response.json().then(items => {
        this.images = Object.values(items.data.images);

        div.setAttribute('style', `background: linear-gradient(to bottom, rgba(0, 0, 100, 0.5), 
        rgba(0, 0, 200, 0.5), rgba(0, 0, 0, 1)), 
        url(${this.images[0].url}) no-repeat center 120px/800px`);
      });
    });
  }
}

export default Giphy;