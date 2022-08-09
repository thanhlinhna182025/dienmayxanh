const OrderScreen = {
  render: () => {
    return `
    <div class="popup__bg">
        <div class="order">
            <div class="order__title-container order__item">
              <div>
                <i class="fa-solid fa-check-double"></i>
              </div>
              <p>Đặt Hàng Thành Công</p>
            </div>
            <div class="order__main">
              <div class="order__info-container order__item">
                <h2>Cam on anh <strong>Nguyen Van A</strong> da cho Dien May co hoi phuc vu</h2>
                <div class="order__info-top">
                  <span>Don hang : #A232A766t</span>
                  <div class="order__management">
                    <span>Quan ly don hang</span>
                    <span>Huy</span>
                  </div>
                </div>
                <ul class="order__info-bottom">
                  <li>
                    <label>- Nguoi dat hang :</label>
                    <span>Nguyen Van A SDT (0909764765)</span>
                  </li>
                  <li>
                    <label>- Nguoi nhan hang :</label>
                    <span>Nguyen Van B SDT (092324765)</span>
                  </li>
                  <li>
                    <label>- Giao den :</label>
                    <span>090 Nguyen A , phuong Nguyen Thai , Quan Ninh Ha ,Tinh Quang Ninh</span>
                  </li>
                  <li>
                    <label>- Phi giao hang :</label>
                    <span>25.000 k</span>
                  </li>
                  <li>
                    <label>- Tong tien :</label>
                    <span>95.000 k</span>
                  </li>
                  <li>
                    <label>- Yeu cau khac :</label>
                    <span> Khong co</span>
                  </li>
                </ul>
              </div>
              <div class="order__status-container order__item">
                <p>DON HANG CHUA DUOC THANH TOAN</p>
              </div>
              <div class="payment__method-container order__item">
                <h2>Chon hinh thuc thanh toan</h2>
                <div class="payment__method-item">
                  <input type="radio" name="payment"/>
                  <div class="method">
                    <div class="method__image">
                      <img src="../assets/images/icon/cash.png"/>
                    </div>
                    <span>Thanh toan tien mat khi nhan hang</span>
                  </div>
                </div>
                <div class="payment__method-item">
                  <input type="radio" name="payment"/>
                  <div class="method">
                    <div class="method__image">
                      <img src="../assets/images/icon/atm.png"/>
                    </div>
                    <span>Thanh toan bang the ngan hang</span>
                  </div>
                </div>
                <div class="payment__method-item">
                  <input type="radio" name="payment"/>
                  <div class="method">
                    <div class="method__image">
                      <img src="../assets/images/icon/momo.png"/>
                    </div>
                    <span>Thanh toan bang vi momo</span>
                  </div>
                </div>
                <div class="payment__method-item">
                  <input type="radio" name="payment"/>
                  <div class="method">
                    <div class="method__image">
                      <img src="../assets/images/icon/tranfer.png"/>
                    </div>
                    <span>Thanh toan chuyen khoan qua ngan hang</span>
                  </div>
                </div>
                <div class="payment__method-item">
                  <input type="radio" name="payment"/>
                  <div class="method">
                    <div class="method__image">
                      <img src="../assets/images/icon/card.png"/>
                    </div>
                    <span>Thanh toan bang the thanh toan quoc te</span>
                  </div>
                </div>
                <button class="accept__button">Xac Nhan</button>
                <a class="policy">Xem chinh sach hoan tien Online</a>
              </div>
              <div class="line line--row"></div>
              <div class="delivery__time-container order__item">
               <p>THOI GIAN NHAN HANG</p>
               <div class="delivery__time">
                <p>Giao truoc 10h00 ngay <strong>(10/08)</strong></p>
                <div class="product__container">
                  <div class="image__container">
                    <img src="../assets/images/productcart/productcart1.jpg"/>
                  </div>
                  <div class="info__container">
                    <h2>Tivi Panasonic 100i</h2>
                    <div>
                      <span>Mau : den</span>
                      <span>So luong : 1</span>
                    </div>
                  </div>
                </div>
               </div>
              </div>
              <button class="buy__another-button">
                Mua Them San Pham Khac
              </button>
              <div class="evaluation__customer-container order__item">
                <p>Anh/chi Nguyen Van A co hai long ve trai nghiem mua hang nay khong ?</p>
                <div class="icon__container">
                  <div class="icon">
                    <i class="fa-regular fa-face-smile satisfy"></i>
                    <span>Hai long</span>
                  </div>
                  <div class="icon">
                    <i class="fa-regular fa-face-frown unsatisfied"></i>
                    <span>Khong hai long</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>`;
  },
};

export default OrderScreen;
