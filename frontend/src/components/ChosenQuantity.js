const ChonsenQuantity = {
  render: () => {
    return `<div class="choose__quantity">
                <button id="decrease" class="decrease">-</button>
                <input id="quantity" value="1" class="quantity"/>
                <button id="increase" class="increase">+</button>
            </div>`;
  },
};
export default ChonsenQuantity;
