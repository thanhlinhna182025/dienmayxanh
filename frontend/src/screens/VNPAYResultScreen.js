import axios from "axios";
import { baseUrl } from "../helper/ultil";

const VNPAYResultScreen = {
  after_render: async () => {},
  render: () => {
    const hash = document.location.hash;
    const arr = hash.split("?")[1].split("&");
    const code = {
      "00": "Giao dịch thành công",
      "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
      "09": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
      10: "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
      11: "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
      12: "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
      13: "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.",
      24: "Giao dịch không thành công do: Khách hàng hủy giao dịch",
      51: "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
      65: "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
      75: "Ngân hàng thanh toán đang bảo trì.",
      79: "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch",
      99: "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)",
    };
    const codeStatus = arr[9].split("=")[1];
    const infomation = {
      Amount: arr[0].split("=")[1] / 100,
      Bank: arr[1].split("=")[1],
      BankTranNo: arr[2].split("=")[1],
      PayDate:
        arr[5].split("=")[1].slice(6, 8) +
        "-" +
        arr[5].split("=")[1].slice(4, 6) +
        "-" +
        arr[5].split("=")[1].slice(0, 4) +
        " " +
        arr[5].split("=")[1].slice(8, 10) +
        "-" +
        arr[5].split("=")[1].slice(10, 12) +
        "-" +
        arr[5].split("=")[1].slice(12, 14),
      TransactionStatus: code[codeStatus]
        ? code[codeStatus]
        : "Chưa thanh toán",
      OrderId: arr[10].split("=")[1],
    };
    console.log(infomation);
    return `
    <div class="vnpayresult">
      <div class="infomation_item">
        <label>Số tiền:</label>
        <span>${infomation.Amount}</span>
      </div>
      <div class="infomation_item">
        <label>Ngân hàng:</label>
        <span>${infomation.Bank}</span>
      </div>
      <div class="infomation_item">
        <label>Mã giao dịch:</label>
        <span>${infomation.BankTranNo}</span>
      </div>
      <div class="infomation_item">
        <label>Ngày thanh toán:</label>
        <span>${infomation.PayDate}</span>
      </div>
      <div class="infomation_item">
        <label>Trạng thái</label>
        <span>${infomation.TransactionStatus}</span>
      </div>
      <div class="infomation_item">
        <label>Mã đơn hàng:</label>
        <span>${infomation.OrderId}</span>
      </div>
      <a class="btn " id="btn-update-order" href="/#/">Xác Nhận Và Chuyển Về Trang Chủ</a>
    </div>`;
  },
};

export default VNPAYResultScreen;
