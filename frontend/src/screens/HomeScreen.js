import Banner from '../components/Banner';
import Slider from '../components/Slider';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import OptionPromotion from '../components/OptionPromotion';
import FlashSale from '../components/FlashSale';
import Promotion from '../components/Promotion';
import Trending from '../components/Trending';
import FeatureCategory from '../components/FeatureCategory';
import SliderPay from '../components/SliderPay';
import SearchMost from '../components/SearchMost';

const HomeScreen = {
    after_render: () => {
        var swiper = new Swiper('.mySwiper', {
            modules: [Navigation, Pagination, Autoplay],
            loop: true,
            slidesPerView: 2,
            spaceBetween: 10,
            pagination: '.swiper-pagination',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // autoplay: {
            //     delay: 2000,
            // },
        });
        var swiperpay = new Swiper('.mySwiperPay', {
            modules: [Navigation, Pagination, Autoplay],
            loop: true,
            slidesPerView: 3,
            spaceBetween: 10,
            pagination: '.swiper-pagination',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // autoplay: {
            //     delay: 2000,
            // },
        });
    },
    render: () => {
        return `
        <div class="main">
            ${Banner.render()}
            ${Slider.render()}
            ${OptionPromotion.render()}
            ${FlashSale.render()}
            ${Promotion.render()}
            ${Trending.render()}
            ${FeatureCategory.render()}
            ${SliderPay.render()}
            ${SearchMost.render()}
        </div>
        `;
    },
};

export default HomeScreen;
