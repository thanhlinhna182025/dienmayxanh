import axios from "axios";
import { getOneOrder } from "../helper/api";
import { parseRequestUrl, redirect, baseUrl } from "../helper/ultil";

const VNPayCreateScreen = {
  after_render: () => {
    $(async function () {
      try {
        const res = await axios.get({
          url: `${baseUrl}/v1/api/order/vnpay_return`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    });
    $("#btn-accept-payment").on("click", async function (e) {
      e.preventDefault();
      const data = {
        amount: parseInt($("#Amount").val()),
        orderId: $("#orderId").attr("data"),
        bankCode: $("#bankCode").val(),
        orderDescription: $("#orderDescription").val(),
        orderType: $("#orderType").val(),
        language: $("#language").val(),
      };

      try {
        const res = await axios({
          url: `${baseUrl}/v1/api/order/create_payment_url`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        });
        document.location = res.data.url;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    });
  },
  render: async () => {
    const { id } = parseRequestUrl();
    const order = await getOneOrder(id);
    const { orderItems, _id, total } = order;
    return `
    <div class="vnpay">
        <h3>Tạo Mới Thanh Toán</h3>
        <img src="../assets/images/vnpay/vnpay-logo.svg"/>
        <p id="orderId" data="${_id}">Mã đơn hàng:${_id}</p>
        ${orderItems
          .map(
            (item) => `<div>
        <p>Name:${item.name}</p>
        <p>Số lượng:${item.quantity}</p>
        ${item.options
          .map((op) => `<div>${op.type}:<span>${op.value}</span></div>`)
          .join("")}
        </div>`
          )
          .join("")}
        <form>
            <div class="form__group">
                <label>Loại hàng hóa</label>
                <select name="orderType" id="orderType">
                    <option value="topup">Nạp tiền điện thoại</option>
                    <option value="billpayment">Thanh toán hóa đơn</option>
                </select>
            </div>
            <div class="form__group">
                <label for="Amount" >Số tiền:</label>
                <input id="Amount" value="${total}"/>
            </div>
            <div class="form__group">
                <label>Nội dung thanh toán:</label>
                <textarea id="orderDescription">Thanh toan don hang:${_id}</textarea>
            </div>
            <div class="form__group">
                <label>Ngân hàng</label>
                <select id="bankCode">
                    <option value>Không chọn</option>
                    <option value="MBAPP">Ứng dụng MobileBanking</option>
                    <option value="VNPAYQR">VNPAYQR</option>
                    <option value="VNBANK">LOCAL BANK</option>
                    <option value="IB">INTERNET BANKING</option>
                    <option value="ATM">ATM CARD</option>
                    <option value="INTCARD">INTERNATIONAL CARD</option>
                    <option value="VISA">VISA</option>
                    <option value="MASTERCARD">MASTERCARD</option>
                    <option value="JCB">JCB</option>
                    <option value="UPI">UPI</option>
                    <option value="VIB">VIB</option>
                    <option value="VIETCAPITALBANK">VIETCAPITALBANK</option>
                    <option value="SCB">Ngân hàng SCB</option>
                    <option value="NCB">Ngân hàng NCB</option>
                    <option value="SACOMBANK">Ngân hàng Sacombank</option>
                    <option value="EXIMBANK">Ngân hàng Eximbank</option>
                    <option value="MSBANK">Ngân hàng MSBank</option>
                    <option value="NAMABANK">Ngân hàng Nam Á Bank</option>
                    <option value="VNMART">Ví điện tử VnMark</option>
                    <option value="VIETINBANK">Ngân hàng VietTinBank</option>
                    <option value="VIETCOMBANK">Ngân hàng VietComBank</option>
                    <option value="HDBANK">Ngân hàng HDBank</option>
                    <option value="DONGABANK">Ngân hàng Đông Á</option>
                    <option value="TPBANK">Ngân hàng TPBank</option>
                    <option value="OJB">Ngân hàng OceanBank</option>
                    <option value="BIDV">Ngân hàng BIDV</option>
                    <option value="TECHCOMBANK">Ngân hàng Teckcombank</option>
                    <option value="VPBANK">Ngân hàng VPBank</option>
                    <option value="AGRIBANK">Ngân hàng Agribank</option>
                    <option value="MBBANK">Ngân hàng MBBank</option>
                    <option value="ACB">Ngân hàng ACB</option>
                    <option value="OCB">Ngân hàng OCB</option>
                    <option value="IVB">Ngân hàng IVB</option>
                    <option value="SHB">Ngân hàng SHB</option>
                </select>
            </div>
            <div class="form__group">
                <label>Ngôn ngữ</label>
                <select name="language" id="language">
                    <option value="vn">Tiếng Việt</option>
                    <option value="en">English</option>
                </select>
            </div>
            <button class="btn btn-blue fw" id="btn-accept-payment">Thanh toán redirect</button>
        </form>
    </div>
    
`;
  },
};
export default VNPayCreateScreen;
