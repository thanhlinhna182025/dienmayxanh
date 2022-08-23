import SingleProduct from "../components/SingleProduct";
import { singleProduct } from "../data";
import Swiper, { Navigation, Pagination, Autoplay, EffectCards } from "swiper";

const ProductScreen = {
  after_render: () => {
    const images = singleProduct.image;
    var swiper = new Swiper(".mySwiperProductImage", {
      modules: [Navigation, Pagination, Autoplay, EffectCards],
      loop: true,
      lazy: true,
      slidesPerView: 1,
      effect: "cards",
      grabCursor: true,
      speed: 700,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return `<img class="${className}" src="${images[index].url}"/>`;
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // autoplay: {
      //   delay: 2000,
      // },
    });
  },
  render: () => {
    return `
        <div class="product__screen">
            ${SingleProduct.render(singleProduct)}
        </div>`;
  },
};
export default ProductScreen;
