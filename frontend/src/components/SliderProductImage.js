import { PF } from "../helper/api";

const SliderProductImage = {
  render: (images) => {
    return `
            <div class="mySwiper mySwiperProductImage">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <!-- Slides -->
                ${images
                  .map(
                    (image) => `
                    <div class="swiper-slide">
                    <img src="${PF}${image}"/>
                     </div>
                    `
                  )
                  .join("\n")}
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
export default SliderProductImage;
