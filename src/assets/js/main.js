import collection from "./gallery/collection";
import loader from "./hero/loader";
import parallax from "./hero/parallax";
import gsap from "gsap";

window.onload = function() {
  loader.init(gsap);
  collection.init(gsap);
  parallax.init();
}
