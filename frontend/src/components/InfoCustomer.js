const InfoCustomer = {
  render: (singleProduct) => {
    return `
    <div class="info__customer box">
      <div class="country__container time">
        <p>Chon dia chi nhan hang de biet thong tin phi van chuyen neu co</p>
        <div class="dropdown__container">
          <div class="dropdown">
            <button class="country__button l4" id="city">
              <span id="cityName">Chon tinh/thanh pho</span>
              <div class="dropdown__content box left" id="dropdownCity"><div>
            </button>
          </div>
          <div class="dropdown">
            <button class="country__button l20" id="district">
              <span id="districtName">Chon quan/huyen</span>
              <div class="dropdown__content box right"id="dropdownDistrict">
              </div>
            </button>
          </div>
          <div class="dropdown">
            <button class="country__button l4" id="ward">
              <span id="wardName">Chon phuong/xa</span>
              <div class="dropdown__content box left" id="dropdownWard"><div>
            </button>
          </div>
          <input placeholder="Số nhà ,tên đường" />
        </div>
      </div>
      <div class="box__order time">
        <div>
          <span>Giao truoc 20h ngay (08/07)</span>
          <span>Chon ngay gio khac</span>
        </div>
        <button>Hom nay ngay(08/07)</button>
        <button>Truoc 20h ngay</button>
        <ul class="carts box">
          <li class="cart__item">
            <div class="item__image-container">
              <img src="${singleProduct.image[0].url}"/>
            </div>
            <div class="item__info-container">
              <a>${singleProduct.name}</a>
              <div>
                <span>Size:${singleProduct.sizes[0]}</span>
                <span>So luong : 1</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    `;
  },
};
export default InfoCustomer;
