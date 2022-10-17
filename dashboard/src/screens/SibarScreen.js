const SideBarScreen = {
  render: () => {
    return `
    <ul class="sidebar__list">
      <li class="fw">
        <div class="merchant">
          <a class="merchant-logo">
            <img src="../assets/images/iconuser.png"/>
          </a>
          <span>Thanhtruong</span>
        </div>
      </li>
      <li class="sidebar__list-item">
        <a href="/#/">
          <img src="../assets/images/iconshome.png"/>
          <span>Trang chủ</span>
        </a>
      </li>
      <li class="sidebar__list-item">
        <a href="/#/category">
          <img src="../assets/images/iconcategory.png"/>
          <span>Hạng mục</span>
        </a>
      </li>
      <li class="sidebar__list-item">
        <a href="/#/subcategory">
          <img src="../assets/images/iconcategory.png"/>
          <span>Danh mục</span>
        </a>
      </li>
      <li class="sidebar__list-item">
        <a href="/#/supplier">
          <img src="../assets/images/iconssupplier.png"/>
          <span>Nhà cung cấp</span>
        </a>
      </li>
      <li class="sidebar__list-item">
        <a href="/#/brand">
          <img src="../assets/images/iconbrand.png"/>
          <span>Thương hiệu</span>
        </a>
      </li>
      <li class="sidebar__list-item">
        <a href="/#/promotion">
          <img src="../assets/images/iconpromotion.png"/>
          <span>Chương trình khuyến mãi</span>
        </a>
      </li>
      <li class="sidebar__list-item">
        <a href="/#/product">
          <img src="../assets/images/iconproduct.png"/>
          <span>Sản phẩm</span>
        </a>
      </li>
      <li class="sidebar__list-item">
        <a href="/#/order">
          <img src="../assets/images/iconorder.png"/>
          <span>Đơn hàng</span>
        </a>
      </li>
      <li class="sidebar__list-item">
        <a href="/#/order">
          <img src="../assets/images/iconcustomer.png"/>
          <span>Khách hàng</span>
        </a>
      </li>
      <li class="sidebar__list-item">
        <a href="/#/chart">
          <img src="../assets/images/iconstatistic.png"/>
          <span>Biểu đồ phân tích</span>
        </a>
      </li>
    </ul>`;
  },
};

export default SideBarScreen;
