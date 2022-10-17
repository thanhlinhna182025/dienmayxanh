import { promotioncarts } from "../data";
import { getAllSubcategory, getOnePromotion, PF } from "../helper/api";
import Rating from "./Rating";
import { formatVND } from "../helper/ultil";

const Promotion = {
  render: async () => {
    const subcategories = await getAllSubcategory();
    const id = "6347f174baf10d0431a80418";
    const { productsof } = await getOnePromotion(id);
    return `
        <div class="promotion">
            <div class="promotion__image-container">
               <img src="../assets/images/promotion/Banner.png"/>
            </div>
            <div class="promotion__top">
                <ul class="promotion__list-products">
                    <li class="promotion__list-item"><a>Tivi</a></li>
                ${
                  subcategories &&
                  subcategories
                    .map(
                      (sub) =>
                        `<li class="promotion__list-item"><a>${sub.name}</a></li>`
                    )
                    .join("")
                }
                </ul>
            </div>
            <div class="promotion__main">
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
            <div class="promotion__bottom">
                    <button class="btn">Xem tất cả <i class="fa-solid fa-caret-right"></i></button>
            </div>
        </div>`;
  },
};
export default Promotion;
