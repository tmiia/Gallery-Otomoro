const parallax = {
  hero: undefined,
  letters: undefined,
  ticking: false,

  init() {
    this.hero = document.querySelector(".hero");
    this.letters = this.hero.querySelectorAll(".hero__cell__letter");

    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(this.onScroll.bind(this));
        this.ticking = true;
      }
    });
  },

  onScroll() {
    if (this.isHeroVisible()) {
      this.letters.forEach(letter => {
        const speed = parseFloat(letter.getAttribute('data-speed')) || 1;
        const offset = window.scrollY * speed;

        const transformValues = window.getComputedStyle(letter).transform;
        let translateX = 0;

        if (transformValues !== 'none') {
          const matrix = new WebKitCSSMatrix(transformValues); // Use to extracts a specific value, in this case translateX, from transformValues string
          translateX = matrix.m41; // matrix.m41 represent the value of the transform translateX
        }

        letter.style.transform = `translate(${translateX}px, -${offset}px)`;
      });
    }

    this.ticking = false;
  },


  isHeroVisible() {
    const { top, bottom } = this.hero.getBoundingClientRect();
    const { innerHeight } = window;
    return top < innerHeight && bottom > 0;
  }
};

export default parallax;
