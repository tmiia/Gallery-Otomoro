const collection = {
  apiKey : import.meta.env.VITE_API_KEY,
  nbArt: 5,

  init(){
    this.getData();
  },

  async getData() {
    const baseUrl = 'https://www.rijksmuseum.nl/api',
          apiKey = this.apiKey,
          culture = "en",
          ps = this.nbArt,
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
        this.showArt(art);
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

      this.showDetail(detailData.artObject);

    } catch (error) {
      this.handleFetchingError(error);
    }
  },

  handleFetchingError(error){
    console.error('There was a problem with the fetch operation:', error);
  },

  showArt(data){
    const template = document.querySelector('template');
    const target = document.querySelector('.gallery__collection');

    const container = template.content.cloneNode(true)

    const image = container.querySelector('img');
    image.src = data.webImage.url || "";

    image.addEventListener('click', ()=>{
      this.getDetailsData(data.objectNumber);
    })

    target.appendChild(container);
  },

  showDetail(data){
    const tag = document.querySelector(".gallery__content__tag");
    tag.innerText = `${data.materials.map(item => item.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join(" / ")}`;

    const title = document.querySelector(".gallery__content__title");
    title.innerText = data.principalOrFirstMaker || 'Unknown';

    const description = document.querySelector(".gallery__content__description");
    description.innerText = data.label.description || 'No description available';

    const date = document.querySelector(".gallery__content__date");
    date.innerText = data.dating.presentingDate || 'Date not available';
  }
}

export default collection;
