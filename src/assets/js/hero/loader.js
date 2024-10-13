import gsap from "gsap";

const loader = {
  blank : undefined,
  tl : undefined,
  grid : undefined,

  init(){
    this.blank = document.querySelectorAll('.hero__cell__blank');

    this.grid = [4,8];
    this.tl = gsap.timeline();

    this.animateBoxes("random", null, 'none')

  },

  animateBoxes(from, axis, ease) {
    this.tl.to(this.blank, {
        duration: .25,
        opacity: 0,
        ease: "power1.inOut",
        delay: 1,
        stagger: {
          amount: 1.5,
          grid: this.grid,
          axis: axis,
          ease: ease,
          from: from
        },
        onComplete: () => {
          this.EnableScroll();
        }
      }
    );
  },


  EnableScroll(){
    const html = document.querySelector('html');
    html.classList.remove('no-scroll');
  }
}

export default loader;
