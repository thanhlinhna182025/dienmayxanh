const ProductSize = {
  render: (product) => {
    return `
    <div class="product__size">
        ${product.sizes
          .map((size) => `<div class="size"><span>${size}</span></div>`)
          .join("\n")}
    </div>`;
  },
};

export default ProductSize;
