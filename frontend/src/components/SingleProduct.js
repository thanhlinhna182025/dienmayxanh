import TitleSingleProduct from "./TitleSingleProduct";
import SliderProductImage from "./SliderProductImage";
import CrollingInner from "./CrollingInner";
import PolicyPromotion from "./PolicyPromotion";
import Reviews from "./Reviews";
import OnlineDiscountPanel from "./OnlineDisCountPanel";
import BlockButton from "./BlockButton";


const SingleProduct = {
  render: async (product) => {
    const price = product.price;
    const detail = product.promotion?.detail;
    const images = product.images;
    const id = product._id;
    return `<div class="single__product">
            ${TitleSingleProduct.render(product)}
              <div class="line__break"></div>
              <div class="single__product-main">
                  <div class="single__product-left">
                    ${SliderProductImage.render(images)}
                    ${CrollingInner.render()}
                    ${PolicyPromotion.render()}
                    ${Reviews.render(product)}
                  </div>
                  <div class="single__product-right">
                    ${OnlineDiscountPanel.render(price, detail)}
                    ${BlockButton.render(id)}
                  </div>
              </div>
            </div>`;
  },
};
export default SingleProduct;
