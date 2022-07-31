const ProductSize = {
  render: (singleProduct) => {
    return `
    <div class="product__size">
        ${singleProduct.sizes
          .map((size) => `<div class="size"><span>${size}</span></div>`)
          .join("\n")}
    </div>`;
  },
};

export default ProductSize;
