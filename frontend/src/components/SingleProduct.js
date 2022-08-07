import TitleSingleProduct from "./TitleSingleProduct";
import SliderProductImage from "./SliderProductImage";
import CrollingInner from "./CrollingInner";
import PolicyPromotion from "./PolicyPromotion";
import Reviews from "./Reviews";
import ProductSize from "./ProductSize";
import OnlineDiscountPanel from "./OnlineDisCountPanel";
import BlockButton from "./BlockButton";
import TechniqualInfoProduct from "./TechniqualInfoProduct";

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
              ${OnlineDiscountPanel.render(singleProduct)}
              ${BlockButton.render(singleProduct)}
              ${TechniqualInfoProduct.render(singleProduct)}
            </div>
        </div>
        </div>`;
  },
};
export default SingleProduct;
