import axios from "axios";
import { getOneOrder, deleteOrder, PF } from "../helper/api";
import { baseUrl, formatVND, parseRequestUrl, redirect } from "../helper/ultil";

const OrderScreen = {
  after_render: () => {
    $("#delete_order").on("click", async function () {
      const id = $("#orderId").attr("data");
      const res = await deleteOrder(id);
      if (res.success) {
        redirect("/#/");
      }
    });
    $("#accept__button").on("click", async function () {
      const id = $("#orderId").attr("data");
      if ($("input:radio:checked").val() === "vnpay") {
        redirect(`/#/vnpay/${id}`);
      }
    });
  },
  render: async () => {
    const { id } = parseRequestUrl();
    const order = await getOneOrder(id);
    const {
      shippingInfo: { orderer, address },
      orderItems,
      total,
      shippingPrice,
    } = order;
    const sum = shippingPrice + total;

    return `
    <div class="popup__bg">
        <div class="order">
            <div class="order__title-container order__item">
              <div>
                <i class="fa-solid fa-check-double"></i>
              </div>
              <p>Đặt Hàng</p>
            </div>
            <div class="order__main">
              <div class="order__info-container order__item">
                <h2>Cám ơn ${
                  orderer?.gender === "male" ? `Anh` : `Chị`
                } <strong>${
      orderer?.name
    }</strong> đã cho LITANA shop cơ hội phục vụ</h2>
                <div class="order__info-top">
                  <div class="order__management">
                    <span id="orderId" data="${order._id}">Đơn hàng :${
      order._id
    }</span>
                    <span id="delete_order">Hủy</span>
                  </div>
                </div>
                <ul class="order__info-bottom">
                  <li>
                    <label>- Người đặt hàng :</label>
                    <span>${orderer.name} Số điện thoại : ${
      orderer.phoneNo
    }</span>
                  </li>
                  <li>
                    <label>- Giao đến :</label>
                    <span>${address.detail} , ${address.ward} , ${
      address.district
    } ,${address.province}</span>
                  </li>
                  <li>
                    <label>- Tổng tiền :</label>
                    <span>${formatVND(total)}</span>
                  </li>
                  <li>
                    <label>- Phí giao hàng :</label>
                    <span>${formatVND(shippingPrice)}</span>
                  </li>
                  <li>
                    <label>- Tổng cộng :</label>
                    <span>${formatVND(sum)}</span>
                  </li>
                </ul>
              </div>
              <div class="order__status-container order__item">
                <p>ĐƠN HÀNG CHƯA ĐƯỢC THANH TOÁN</p>
              </div>
              <div class="payment__method-container order__item">
                <h2>Chọn hình thức thanh toán</h2>
                <div class="payment__method-item">
                  <input type="radio" name="payment"/>
                  <div class="method">
                    <div class="method__image">
                      <img src="../assets/images/icon/cash.png"/>
                    </div>
                    <span>Thanh toán bằng tiền mặt khi nhận hàng</span>
                  </div>
                </div>
                <div class="payment__method-item">
                  <input type="radio" name="payment" value="vnpay"/>
                  <div class="method">
                    <div class="method__image">
                      <img src="../assets/images/vnpay/vnpay-logo.svg"/>
                    </div>
                    <span>Thanh toán bằng VNPay</span>
                  </div>
                </div>
                <div class="payment__method-item">
                  <input type="radio" name="payment"/>
                  <div class="method">
                    <div class="method__image">
                      <img src="../assets/images/icon/momo.png"/>
                    </div>
                    <span>Thanh toán bằng ví momo</span>
                  </div>
                </div>
                <div class="payment__method-item">
                  <input type="radio" name="payment" disabled/>
                  <div class="method">
                    <div class="method__image">
                      <img src="../assets/images/icon/atm.png"/>
                    </div>
                    <span>Thanh toán bằng thẻ ngân hàng</span>
                  </div>
                </div>
                <div class="payment__method-item">
                  <input type="radio" name="payment" disabled/>
                  <div class="method">
                    <div class="method__image">
                      <img src="../assets/images/icon/tranfer.png"/>
                    </div>
                    <span>Thanh toán chuyển khoản qua ngân hàng</span>
                  </div>
                </div>
                <div class="payment__method-item">
                  <input type="radio" name="payment" disabled/>
                  <div class="method">
                    <div class="method__image">
                      <img src="../assets/images/icon/card.png"/>
                    </div>
                    <span>Thanh toán bằng thẻ thanh toán quốc tế</span>
                  </div>
                </div>
                <button class="btn btn--blue fw" id="accept__button">Xác nhận</button>
                <a class="policy" href="/#/dropdown">Xem chính sách hoàn tiền Online</a>
              </div>
              <div class="line line--row"></div>
              <div class="delivery__time-container order__item">
               <p>THỜI GIAN NHẬN HÀNG</p>
               <div class="delivery__time">
                <p>Giao trước 10h00 ngày <strong>(10/08)</strong></p>
                <div class="product__container">
                ${orderItems
                  .map(
                    (item) => `<div class="order__item">
                    <div class="image__container">
                      <img src="${PF}${item.product.image}"/>
                    </div>
                    <div class="info__container">
                      <h2>${item.product.name}</h2>
                      <div>
                        ${item.options
                          .map(
                            (op) => `
                        <div>
                          <span>${op.type}:</span>
                          <span>${op.value}</span>
                        </div>
                        `
                          )
                          .join("")}
                        <span>Số lượng :${item.quantity}</span>
                      </div>
                    </div>
                  </div>`
                  )
                  .join("")}
                  
                </div>
               </div>
              </div>
              <button class="buy__another-button">
                Mua Them San Pham Khac
              </button>
              <div class="evaluation__customer-container order__item">
                <p>${orderer?.gender === "male" ? `Anh` : `Chị`} <strong>${
      orderer?.name
    }</strong> có hài lòng với trãi nghiệm mua hàng tại LITANA ?</p>
                <div class="icon__container">
                  <div class="icon">
                    <i class="fa-regular fa-face-smile satisfy"></i>
                    <span>Hài lòng</span>
                  </div>
                  <div class="icon">
                    <i class="fa-regular fa-face-frown unsatisfied"></i>
                    <span>Không hài lòng</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>`;
  },
};

export default OrderScreen;
