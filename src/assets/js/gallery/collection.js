const collection = {
  apiKey : import.meta.env.VITE_API_KEY,
  nbArt: 5,
  gsapAttribute: undefined,

  init(gsap){
    this.gsapAttribute = gsap;
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
      this.animShowContent();

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

    this.onArtClick(image, data);

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
  },

  focusingArt(currentImage){
    const images = document.querySelectorAll('.gallery__collection__art__image img');

    images.forEach(image => {
      image.classList.remove('active');
      image.classList.add('inactive');
    });

    currentImage.classList.add('active');
  },

  onArtClick(image, data){
    image.addEventListener('click', ()=>{
      this.animHideContent(data);
      this.focusingArt(image);
    })
  },

  animHideContent(data){
    const tl = this.gsapAttribute.timeline({
      ease: "power1.out",
      onComplete: () => this.getDetailsData(data.objectNumber)
    });

    tl.to(".gallery__content__description", {yPercent: 10, opacity: 0, duration: 0.25});
    tl.to(".gallery__content__title", {yPercent: 10, opacity: 0, duration: 0.25}, "-=0.15");
    tl.to(".gallery__content__date", {yPercent: 10, opacity: 0, duration: 0.25}, "<");
    tl.to(".gallery__content__tag", {opacity: 0, duration: 0.25}, "<");
  },

  animShowContent(){
    const tl = this.gsapAttribute.timeline({delay: 0.15, ease: "power1.inOut"});

    tl.to(".gallery__content__description", {yPercent: 0, opacity: 1, duration: 0.25});
    tl.to(".gallery__content__title", {yPercent: 0, opacity: 1, duration: 0.25}, "-=0.15");
    tl.to(".gallery__content__date", {yPercent: 0, opacity: 1, duration: 0.25}, "<");
    tl.to(".gallery__content__tag", {opacity: 1, duration: 0.25}, "<");
  }
}

export default collection;
