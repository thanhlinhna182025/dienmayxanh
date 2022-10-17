import lighting from "../assets/images/lightning.png";
import Rating from "./Rating";
import { PF } from "../helper/api";
import { getOnePromotion } from "../helper/api";
import { formatVND } from "../helper/ultil";

const FlashSale = {
  render: async function () {
    
    const id = "6347f174baf10d0431a80418";
    const { productsof } = await getOnePromotion(id);
    return `
        <div class="flash__sale">
            <div class="flash__sale-info">
                <div class="count__down-block">
                    <div class="count__down-right">
                        <img src="${lighting}"/>
                    </div>
                    <div class="count__down-left">
                        <h2>GIỜ VÀNG DEAL SỐC</h2>
                        <div class ="count__down-timer" id="count__down-timer">
                            <span>Kết thúc trong</span>
                            <div id="timer" class="timer">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="upcoming">
                    <div class="upcoming__item active">
                        <p>Đang diễn ra</p>
                        <p>19:00-21:00</p>
                    </div>
                    <div class="upcoming__item">
                        <p>Sắp diễn ra</p>
                        <p>09:00-11:00</p>
                    </div>
                    <div class="upcoming__item">
                        <p>Ngày mai</p>
                        <p>14:00-16:00</p>
                    </div>
                </div>
            </div>
            <div class="flash__sale-main">
            ${
              productsof &&
              productsof
                .map(
                  (product) => `
            <a href="/#/product/${product._id}">
            <div class="product">
                <div class="cartproduct__image-container">
                    <img src="${PF}${product.image}"/>
                </div>
                <div class="cartproduct__info-container">
                    <div class="promotion__container">
                        <img src="${PF}${product.promotion.icon}"/>
                        <span>${product.promotion.name}</span>
                    </div>
                    <p class="name">${product.name}</p>
                    <p class="brand">${product.brand.name}</p>
                    <div >
                        <span class="price">${formatVND(product.price)}</span>
                    </div>
                    <div>
                        ${Rating.render({
                          value: 3,
                          number: 4,
                        })}
                    </div>
                </div>
            </div>
        </a>
            `
                )
                .join("")
            }    
            </div>
        </div>`;
  },
};

export default FlashSale;
