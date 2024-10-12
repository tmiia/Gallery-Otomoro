const collection = {
  apiKey : import.meta.env.VITE_API_KEY,

  init(){
    this.getData();
  },

  async getData() {
    const baseUrl = 'https://www.rijksmuseum.nl/api',
          apiKey = this.apiKey,
          culture = "en",
          ps = 5,
          url = `${baseUrl}/${culture}/collection?key=${apiKey}&ps=${ps}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (!data || !data.artObjects) {
        throw new Error("Invalid data");
      }

      for (const art of data.artObjects) {
        await this.getDetailsData(art.objectNumber);
      }
    } catch (error) {
      this.handleFetchingError(error);
    }
  },

  async getDetailsData(artId) {
    const baseUrl = 'https://www.rijksmuseum.nl/api',
          apiKey = this.apiKey,
          culture = "en",
          url = `${baseUrl}/${culture}/collection/${artId}?key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const detailData = await response.json();

      if (!detailData || !detailData.artObject) {
        throw new Error("Invalid data");
      }

      this.showArt(detailData.artObject);
    } catch (error) {
      this.handleFetchingError(error);
    }
  },

  handleFetchingError(error){
    console.error('There was a problem with the fetch operation:', error);
    const flashContainer = document.querySelector('.flash');
    const flashContent = flashContainer.querySelector('span');
    flashContainer.classList.add('error');
    flashContent.textContent = `An error occurred during data fetching : ${error.message}`;
  },

  showArt(data){
    const template = document.querySelector('template');
    const target = document.querySelector('.gallery');

    const container = template.content.cloneNode(true)

    container.querySelector('.art').setAttribute('id', data.id);

    const image = container.querySelector('img');
    image.src = data.webImage.url;

    const title = container.querySelector('.art__title');
    title.innerText = data.title;

    const description = container.querySelector('.art__description');
    description.innerText = data.description || "No description available.";

    target.appendChild(container);
  },
}

export default collection;
