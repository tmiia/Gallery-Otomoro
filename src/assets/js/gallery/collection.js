const collection = {
  artObjects: [],

  init(){
    this.getData();
  },

  getData() {
    const baseUrl = 'https://www.rijksmuseum.nl/api',
          apiKey = import.meta.env.VITE_API_KEY,
          culture = "en",
          ps = 5,
          url = `${baseUrl}/${culture}/collection?key=${apiKey}&ps=${ps}`;

    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (!data || !data.artObjects) {
        throw new Error("Invalid data");
      }

      this.artObjects.push(...data.artObjects);

      if (this.artObjects.length > 0) {
        this.artObjects.forEach(art => {
          console.log(art);

          this.getDetailsData(art.id)
        });
      }

    })
    .catch(error => {
      this.handleFetchingError(error)
    });
  },

  getDetailsData(artId) {
    const baseUrl = 'https://www.rijksmuseum.nl/api',
          apiKey = import.meta.env.VITE_API_KEY,
          culture = "en",
          url = `${baseUrl}/${culture}/collection/${artId}?key=${apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(detailData => {
        this.showDetails(detailData.artObject);
      })
      .catch(error => {
        this.handleFetchingError(error)
      });
  },

  handleFetchingError(error){
    console.error('There was a problem with the fetch operation:', error);
    const flashContainer = document.querySelector('.flash');
    const flashContent = flashContainer.querySelector('span');
    flashContainer.classList.add('error');
    flashContent.textContent = `An error occurred during data fetching : ${error.message}`;
  },

  showDetails(data){
    console.log(data)
  }
}

export default collection;
