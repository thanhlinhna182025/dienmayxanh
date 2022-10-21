import SingleProduct from "../components/SingleProduct";
import Swiper, { Navigation, Pagination, Autoplay, EffectCards } from "swiper";
import { parseRequestUrl, removeTimerID } from "../helper/ultil";
import { getOneProduct, PF } from "../helper/api";


const ProductScreen = {
  after_render: () => {
    $(async function () {
      removeTimerID()
      const { id } = parseRequestUrl();
      const product = await getOneProduct(id);
      const images = product.images;
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
            return `<img class="${className}" src="${PF}${images[index]}"/>`;
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
    });
  },
  render: async () => {
    const { id } = parseRequestUrl();
    const product = await getOneProduct(id);
    return `
        <div class="product__screen">
            ${await SingleProduct.render(product)}
        </div>`;
  },
};
export default ProductScreen;
