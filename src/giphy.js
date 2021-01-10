class Giphy {
  async fetchGif(url) {
    let div = document.querySelector('.card');
    await fetch(url, {
      mode: 'cors'
    }).then( response => {
      response.json().then(items => {
        let images = Object.values(items.data.images);
        
        div.setAttribute('style', `background: #FFF url(${images[0].url}) no-repeat center center`)
      })
    })
  }
}

export default Giphy