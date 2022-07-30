import sliderpay1 from '../assets/images/sliderpay/sliderpay1.jpg';
import sliderpay2 from '../assets/images/sliderpay/sliderpay2.png';
import sliderpay3 from '../assets/images/sliderpay/sliderpay3.png';
import sliderpay4 from '../assets/images/sliderpay/sliderpay4.png';
import sliderpay5 from '../assets/images/sliderpay/sliderpay5.png';
import sliderpay6 from '../assets/images/sliderpay/sliderpay6.png';

const SliderPay = {
    render: () => {
        return `
            <div class="mySwiper mySwiperPay">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <!-- Slides -->
                <div class="swiper-slide">
                    <img src="${sliderpay1}"/>
                </div>
                <div class="swiper-slide">
                    <img src="${sliderpay2}"/>
                </div>
                <div class="swiper-slide">
                    <img src="${sliderpay3}"/>
                </div>
                <div class="swiper-slide">
                    <img src="${sliderpay4}"/>
                </div>
                <div class="swiper-slide">
                    <img src="${sliderpay5}"/>
                </div>
                <div class="swiper-slide">
                    <img src="${sliderpay6}"/>
                </div>
            </div>
            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>

            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <!-- If we need scrollbar -->
            <div class="swiper-scrollbar"></div>
            </div>
        `;
    },
};
export default SliderPay;
