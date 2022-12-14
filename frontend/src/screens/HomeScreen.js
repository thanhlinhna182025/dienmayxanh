import Banner from "../components/Banner";
import Slider from "../components/Slider";
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import OptionPromotion from "../components/OptionPromotion";
import FlashSale from "../components/FlashSale";
import Promotion from "../components/Promotion";
import Trending from "../components/Trending";
import FeatureCategory from "../components/FeatureCategory";
import SliderPay from "../components/SliderPay";
import SearchMost from "../components/SearchMost";
import { countDownTimer } from "../helper/ultil";

const HomeScreen = {
  after_render: async () => {
    $(function () {
      const timerID = countDownTimer("timer");
      localStorage.setItem("timerID", timerID);
    });
    var swiper = new Swiper(".mySwiper", {
      modules: [Navigation, Pagination, Autoplay],
      loop: true,
      slidesPerView: 2,
      spaceBetween: 10,
      pagination: ".swiper-pagination",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      centeredSlides: false,
      // autoplay: {
      //   delay: 2000,
      // },
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
      },
    });
    var swiperpay = new Swiper(".mySwiperPay", {
      modules: [Navigation, Pagination, Autoplay],
      loop: true,
      slidesPerView: 3,
      spaceBetween: 10,
      centeredSlides: false,
      pagination: ".swiper-pagination",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
      },
      autoplay: {
        delay: 2000,
      },
    });
  },
  render: async () => {
    return `
        <div class="main">
            ${Banner.render()}
            ${Slider.render()}
            ${OptionPromotion.render()}
            ${await FlashSale.render()}
            ${await Promotion.render()}
            ${Trending.render()}
            ${FeatureCategory.render()}
            ${SliderPay.render()}
            ${SearchMost.render()}
        </div>
        `;
  },
};

export default HomeScreen;
