const collection = {

  init(){
    this.getData();
  },

  getData() {
    const baseUrl = 'https://www.rijksmuseum.nl/api',
          apiKey = import.meta.env.VITE_API_KEY,
          culture = "en",
          ps = 10,
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
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      const flashContainer = document.querySelector('.flash');
      const flashContent = flashContainer.querySelector('span');
      flashContainer.classList.add('error');
      flashContent.textContent = `An error occurred during data fetching : ${error.message}`;
    });
  }
}

export default collection;
