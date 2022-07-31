const BlockButton = {
  render: () => {
    return `
    <div class="block__button">
        <button class="buy__now">Mua Ngay</button>
        <div class="amortization__container">
            <button><span>Mua trả góp 0%</span><span>Duyệt hồ sở trong 5 phút</span></button>
            <button><span>Trả góp qua thẻ</span><span>Visa, MasterCard</span></button>
        </div>
    </div>`;
  },
};

export default BlockButton;
