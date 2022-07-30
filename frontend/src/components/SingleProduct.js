import TitleSingleProduct from './TitleSingleProduct';
import SliderProductImage from './SliderProductImage';
import CrollingInner from './CrollingInner';

const SingleProduct = {
    render: (singleProduct) => {
        return `<div class="single__product">
        ${TitleSingleProduct.render(singleProduct)}
        <div class="line__break"></div>
        <div class="single__product-main">
            <div class="single__product-left">
                ${SliderProductImage.render(singleProduct)}
                ${CrollingInner.render()}
            </div>
            <div class="single__product-right">single__product-right</div>
        </div>
        </div>`;
    },
};
export default SingleProduct;
