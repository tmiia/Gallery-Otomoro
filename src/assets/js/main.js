import collection from "./gallery/collection";
import loader from "./hero/loader";
import parallax from "./hero/parallax";

window.onload = function() {
  loader.init();
  collection.init();
  parallax.init();
}
