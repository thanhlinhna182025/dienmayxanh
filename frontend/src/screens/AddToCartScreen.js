import InfoCustomer from "../components/InfoCustomer";
import { singleProduct } from "../data";

const AddToCartScreen = {
  render: () => {
    const price = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(singleProduct.price);
    const discount = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(
      (singleProduct.price * singleProduct.promotion.discountpercent) / 100
    );
    const remain = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(
      singleProduct.price -
        (singleProduct.price * singleProduct.promotion.discountpercent) / 100
    );

    return `
      <div class="popup__bg">
        <div class="add__to-cart">
          <a class="close" href="/#/"><i class="fa-solid fa-xmark"></i></a>
          <div class="product__info-container">
            <div class="image__container">
              <img src="${singleProduct.image[0].url}"/>
            </div>
            <div class="product__info">
              <h1>${singleProduct.name}</h1>
              <div class="promotion__info">
                <h2>Thông tin khuyến mãi :</h2>
                <p>${singleProduct.promotion.desc}</p>
              </div>
              <p class="price">Giá gốc: ${price}</p>
              <div>
                <span class="discount">Giảm <b>${discount}</b> Còn</span>
                <span class="remain"> ${remain}</span>
              </div>
              <div class="choose__quantity">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
              <div class="provisional">
                <span>Tạm tính (1) sản phẩm :</span>
                <span>${remain}</span>
              </div>
            </div>
          </div>
          <div class="customer__info-container">
            <p class="title">THÔNG TIN KHÁCH HÀNG :</p>
            <form class="customer__info-form">
              <div class="form__group">
                <div class="radio__item">
                  <label for="male">Anh</label>
                  <input type="radio" name="gender" id="male" value="male" checked/>
                </div>
                <div class="radio__item">
                  <label for="female">Chị</label>
                  <input type="radio" name="gender" id="female" value="famale"/>
                </div>
              </div>
              <div class="form__group">
                <input placeholder="Họ và tên"/>
                <input placeholder="Số điện thoại"/>
              </div>
              <p class="title">CHỌN CÁCH THỨC NHẬN HÀNG</p>
              <div class="form__group">
                <div class="radio__item">
                  <label for="house">Giao tận nơi</label>
                  <input type="radio" name="delivery" id="house" value="house" checked/>
                </div>
                <div class="radio__item">
                  <label for="market">Nhận tại siêu thị</label>
                  <input type="radio" name="delivery" id="market" value="market"/>
                </div>
              </div>
              ${InfoCustomer.render(singleProduct)}
            </form>
            <div class="customer__note">
              <input placeholder="Yeu cau khac (khong bat buoc)"/>
            </div>
            <div class="line line--row"></div>
            <div class="total__payment">
              <div>
                <span>Tong tien :</span>
                <span>${remain}</span>
              </div>
              <a href="/#/order">DAT HANG</a>
              <p>Ban co the chon hinh thuc thanh toan khi nhan hang</p>
            </div>
          </div>
        </div>
      </div>`;
  },
};

export default AddToCartScreen;
