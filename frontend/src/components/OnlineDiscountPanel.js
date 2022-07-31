const OnlineDiscountPanel = {
  render: (singleProduct) => {
    const price = singleProduct.price;
    const discountpercent = singleProduct.promotion.discountpercent;
    const discount = (price * discountpercent) / 100;
    const discountMoney = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(discount);
    const remain = price - discount;
    const remainMoney = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(remain);

    return `
    <div class="online__discount-panel">
      <div class="discount">Mua Online Giảm Giá Sốc <span>${discountMoney}</span> Còn</div>
      <p class="remain">${remainMoney}</p>
    </div>`;
  },
};

export default OnlineDiscountPanel;
