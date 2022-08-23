import Rating from "./Rating";

const CartProducts = {
  render: (cartproduct) => {
    const number = cartproduct.price;
    let price = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
    return `
        <a href="/#/product/${cartproduct.id}">
            <div class="cartproduct">
                <div class="cartproduct__image-container">
                    <img src="${cartproduct.image}"/>
                </div>
                <div class="cartproduct__info-container">
                    <div class="promotion__container">
                        <img src="${cartproduct.promotion.icon}"/>
                        <span>${cartproduct.promotion.name}</span>
                    </div>
                    <p class="name">${cartproduct.name}</p>
                    <p class="brand">${cartproduct.brand}</p>
                    <div >
                        <span class="price">${price}</span>
                        <span class="discountpercent">- ${
                          cartproduct.promotion.discountpercent
                        }%</span>
                    </div>
                    <div>
                        ${Rating.render({
                          value: `${cartproduct.rate}`,
                          text: `${cartproduct.reviews}`,
                        })}
                    </div>
                </div>
            </div>
        </a>`;
  },
};

export default CartProducts;
