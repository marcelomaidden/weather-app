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

        div.setAttribute('style', `background: #FFF url(${this.images[0].url}) no-repeat center center`);
      });
    });
  }
}

export default Giphy;