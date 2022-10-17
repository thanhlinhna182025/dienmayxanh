const BlockButton = {
  render: (id) => {
    return `
    <div class="block__button">
        <a class="buy__now" href="/#/product/${id}/add">Mua Ngay</a>
        <div class="amortization__container">
            <a><span>Mua trả góp 0%</span><span>Duyệt hồ sở trong 5 phút</span></a>
            <a><span>Trả góp qua thẻ</span><span>Visa, MasterCard</span></a>
        </div>
    </div>`;
  },
};

export default BlockButton;
