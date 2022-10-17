const ChonsenQuantity = {
  render: (quantity = 1) => {
    return `<div class="choose__quantity">
                <button  class="decrease">-</button>
                <input  value="${quantity}" class="quantity"/>
                <button  class="increase">+</button>
            </div>`;
  },
};
export default ChonsenQuantity;
