import logo from '../assets/images/logo.png';
const Header = {
    render: () => {
        return `
        <div class="header__container">
            <div class="header__top">
                <a href="/#/" class="logo"><img src="${logo}"/></a>
                <form class="search__form">
                    <input class="search__input" placeholder="Bạn đang tìm ..."/>
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <a>Lịch sử đơn hàng</a>
                <a>
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
                                    <li>
                                        <i class="fa-solid fa-tv"></i>
                                        <a>Tivi, Loa , Dàn KaraOke</a>
                                        <i class="fa-solid fa-angle-right"></i>
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-mobile-screen"></i>
                                        <a>Máy Giặt, Sấy Quần Áo</a>
                                        <i class="fa-solid fa-angle-right"></i>
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-mobile-screen"></i>
                                        <a>Máy Lạnh, Điều Hòa</a>
                                        <i class="fa-solid fa-angle-right"></i>
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-mobile-screen"></i>
                                        <a>Điện Thoại</a>
                                        <i class="fa-solid fa-angle-right"></i>
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-tablet-screen-button"></i>
                                        <a>Máy Tính Bảng</a>
                                        <i class="fa-solid fa-angle-right"></i>
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-tablet-screen-button"></i>
                                        <a>Máy Tính</a>
                                        <i class="fa-solid fa-angle-right"></i>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="bordercol"></li>
                        <li>
                            <a>Tivi</a>
                        </li>
                        <li><a>Tủ lạnh</a></li>
                        <li><a>Máy Giặt</a></li>
                        <li><a>Máy đông</a></li>
                        <li><a>Điện thoại</a></li>
                        <li><a>Lap top</a></li>
                        <li><a>Điều hòa</a></li>
                        <li><a>Đồ gia dụng</a></li>
                        <li><a href="#/product">Product</a></li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    },
};

export default Header;
