const InfoCustomer = {
  render: (singleProduct) => {
    return `
    <div class="info__customer">
      <div class="country__container time">
        <p>Chon dia chi nhan hang de biet thong tin phi van chuyen neu co</p>
        <button class="country__button" >
        Ho Chi Minh
        </button>
        <button class="dictrict__button" >Quan Binh Thanh</button>
        <button class="ward__button" >Phuong 12</button>
        <input placeholder="Số nhà ,tên đường"/>
      </div>
      <div class="box__order time">
        <div>
          <span>Giao truoc 20h ngay (08/07)</span>
          <span>Chon ngay gio khac</span>
        </div>
        <button>Hom nay ngay(08/07)</button>
        <button>Truoc 20h ngay</button>
        <ul class="carts">
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
