import { formatVND } from "../helper/ultil";

const OnlineDiscountPanel = {
  render: (price, detail) => {
    const discountpercent = detail.discount || 0;
    const discount = (price * discountpercent) / 100;
    const discountMoney = formatVND(discount);
    const remain = price - discount;
    const remainMoney = formatVND(remain);

    return `
    <div class="online__discount-panel">
      <div class="discount">Mua Online Giảm Giá Sốc <span>${discountMoney}</span> Còn</div>
      <p class="remain">${remainMoney}</p>
    </div>`;
  },
};

export default OnlineDiscountPanel;
