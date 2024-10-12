import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const horizontal = {

  init(){
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      mousewheel: {
        sensitivity: 0.5,
      },
      direction: horizontal.getDirection(),
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      on: {
        resize: function () {
          swiper.changeDirection(horizontal.getDirection());
        },
      },
    })
  },

  getDirection() {
    const direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

    return direction;
  }
}

export default horizontal;
