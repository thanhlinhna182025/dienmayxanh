import { redirect } from "../helper/ultil";

const ZaloPayScreen = {
  after_render: () => {
    $("#btn__create--zalopay").on("click", function () {
      redirect("http://localhost:4000/v1/api/order/create_payment_url");
    });
  },
  render: () => {
    return `
    <div class="popup__bg">
      <div class="zalo-pay">
        <h2>Vui lòng chọn hình thức thanh toán:</h2>
        <div class="zalo-pay__item">
          <input type="radio" name="payment" class="payment-input"/>
          <span>Ví </span>
          <img class="zalo-pay__logo" src="../assets/images/zalopay/logo-zalopay.svg"/>
        </div>
        <div class="zalo-pay__item">
          <input type="radio" name="payment" class="payment-input"/>
          <span class="payment-method">Visa,Master,JCB</span>
          <span class="payment-note">( Qua cổng zalopay )</span>
        </div>
        <div class="zalo-pay__item">
          <input type="radio" name="payment" class="payment-input"/>
          <span class="payment-method">Thẻ ATM</span>
          <span class="payment-note">( Qua cổng zalopay )</span>
        </div>
        <button class="btn btn--blue fw" id="btn__create--zalopay">Xác nhận thanh toán</button>
      </div>
    </div>
    
`;
  },
};
export default ZaloPayScreen;
