import TitleSingleProduct from "./TitleSingleProduct";
import SliderProductImage from "./SliderProductImage";
import CrollingInner from "./CrollingInner";
import PolicyPromotion from "./PolicyPromotion";
import Reviews from "./Reviews";
import ProductSize from "./ProductSize";

const SingleProduct = {
  render: (singleProduct) => {
    return `<div class="single__product">
        ${TitleSingleProduct.render(singleProduct)}
        <div class="line__break"></div>
        <div class="single__product-main">
            <div class="single__product-left">
                ${SliderProductImage.render(singleProduct)}
                ${CrollingInner.render()}
                ${PolicyPromotion.render()}
                ${Reviews.render(singleProduct)}
            </div>
            <div class="single__product-right">
              ${ProductSize.render(singleProduct)}
            </div>
        </div>
        </div>`;
  },
};
export default SingleProduct;
