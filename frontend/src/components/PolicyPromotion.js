const PolicyPromotion = {
  render: () => {
    return `
        <div class="infomation__promotion">
          <ul class="infomation__promotion-list">
            <li class="infomation__promotion-item">
              <div class="infomation__promotion-item_wrapper"><i class="fa-solid fa-screwdriver-wrench"></i><span>Miễn phí lắp đặt lúc giao hàng</span></div>
            </li>
            <li class="infomation__promotion-item">
              <div class="infomation__promotion-item_wrapper"><i class="fa-solid fa-screwdriver-wrench"></i><span>Miễn phí chân không hút máy lạnh .</span><a>Tìm hiểu thêm</a></div>
            </li>
            <div class="line line--row"></div>
            <li class="infomation__promotion-item">
              <div class="infomation__promotion-item_wrapper"><i class="fa-solid fa-screwdriver-wrench"></i><span>Hư gì đổi nấy tận nhà .</span><a>Tìm hiểu thêm</a></div>
            </li>
            <li class="infomation__promotion-item">
              <div class="infomation__promotion-item_wrapper"><i class="fa-solid fa-screwdriver-wrench"></i><span>Bảo hành chính hãng máy lạnh <b>2 năm</b> .</span><a>Tìm hiểu thêm</a></div>
            </li>
          </ul>
        </div>`;
  },
};

export default PolicyPromotion;
