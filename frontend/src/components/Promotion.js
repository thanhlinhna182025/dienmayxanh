import { promotioncarts } from '../data';
import CartProducts from './CartProducts';

const Promotion = {
    render: () => {
        return `
        <div class="promotion">
            <div class="promotion__top">
                <div class="promotion__image-container">
                    <img src="../assets/images/promotion/Banner.png"/>
                </div>
                <ul class="promotion__list-products">
                    <li class="promotion__list-item"><a>Tivi</a></li>
                    <li class="promotion__list-item"><a>Máy lạnh</a></li>
                    <li class="promotion__list-item"><a>Máy lọc nước</a></li>
                    <li class="promotion__list-item"><a>Điện thoại</a></li>
                    <li class="promotion__list-item"><a>Laptop</a></li>
                    <li class="promotion__list-item"><a>Nồi cơm điện</a></li>
                    <li class="promotion__list-item"><a>Bếp điện</a></li>
                </ul>
            </div>
            <div class="promotion__main">
                ${promotioncarts
                    .map((promotioncart) => CartProducts.render(promotioncart))
                    .join('\n')}
            </div>
            <div class="promotion__bottom">
                    <button class="btn">Xem tất cả <i class="fa-solid fa-caret-right"></i></button>
            </div>
        </div>`;
    },
};
export default Promotion;
