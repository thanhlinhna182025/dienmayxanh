import slider1 from '../assets/images/slider/slider1.png';
import slider2 from '../assets/images/slider/slider2.png';
import slider3 from '../assets/images/slider/slider3.png';
import slider4 from '../assets/images/slider/slider4.jpg';
import slider5 from '../assets/images/slider/slider5.png';
import slider6 from '../assets/images/slider/slider6.png';

const Slider = {
    render: () => {
        return `
            <div class="mySwiper">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <!-- Slides -->
                <div class="swiper-slide">
                    <img src="${slider1}"/>
                </div>
                <div class="swiper-slide">
                    <img src="${slider2}"/>
                </div>
                <div class="swiper-slide">
                    <img src="${slider3}"/>
                </div>
                <div class="swiper-slide">
                    <img src="${slider4}"/>
                </div>
                <div class="swiper-slide">
                    <img src="${slider5}"/>
                </div>
                <div class="swiper-slide">
                    <img src="${slider6}"/>
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
export default Slider;
