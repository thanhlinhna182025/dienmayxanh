import SingleProduct from '../components/SingleProduct';
import { singleProduct } from '../data';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

const ProductScreen = {
    after_render: () => {
        var swiper = new Swiper('.mySwiperProductImage', {
            modules: [Navigation, Pagination, Autoplay],
            loop: true,
            slidesPerView: 1,
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
        <div class="product__screen">
            ${SingleProduct.render(singleProduct)}
        </div>`;
    },
};
export default ProductScreen;
