import logo from "../assets/images/logo.png";
import { getAllCategory, getAllSubcategory, PF } from "../helper/api";
import { getCartItems } from "../helper/localStorage";

const Header = {
  render: async () => {
    const subcagories = await getAllSubcategory();
    const categories = await getAllCategory();
    const cartItems = getCartItems();
    return `
        <div class="header__container">
            <div class="header__top">
                <a href="/#/" class="logo"><img src="${logo}"/></a>
                <form class="search__form">
                    <input class="search__input" placeholder="Bạn đang tìm ..."/>
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <a>Lịch sử đơn hàng</a>
                <a class="baggaged" href="${
                  cartItems.length === 0 ? `/#/` : `/#/cart`
                }">
                    <div class="quantity__cart">
                        <span>${
                          cartItems.length > 0 ? cartItems.length : 0
                        }</span>
                    </div>
                    <i class="fa-solid fa-cart-arrow-down" id="cart"></i>
                    <label >Giỏ hàng</label>
                </a>
                <div class="header__toplist">
                    <div class="header__toplist-item">
                        <a>Tư vấn chọn mua</a>
                    </div>
                    <div class="bordercol"></div>
                    <div class="header__toplist-item">
                        <a>Khuyến mãi</a>
                    </div>
                    <div class="bordercol"></div>
                    <div class="header__toplist-item">
                        <a>Vào bếp</a>
                    </div>
                </div>
            </div>
            <div class="header__bottom">
                <div class="header__bottom-container">
                    <ul class="header__menu">
                        <li class="header__menu-category">
                            <i class="fa-solid fa-bars"></i>
                            <a>Tất cả danh mục</a>
                            <div class="dropdowm__menu">
                                <ul>
                                ${categories
                                  .map(
                                    (c) => `<li>
                                        <img src="${PF}${c.icon}"/>
                                        <a>${c.name}</a>
                                        <i class="fa-solid fa-angle-right"></i>
                                    </li>`
                                  )
                                  .join("")}
                                </ul>
                            </div>
                        </li>
                        <li class="bordercol"></li>
                        ${subcagories
                          .map((s) => `<li><a>${s.name}</a></li>`)
                          .join("")}
                    </ul>
                </div>
            </div>
        </div>
        `;
  },
};

export default Header;
