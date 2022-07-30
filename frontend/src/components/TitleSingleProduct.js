import labelImage from '../assets/images/labelImage.png';
import Rating from './Rating';
const TitleSingleProduct = {
    render: (singleProduct) => {
        return `
        <div class="single__product-title">
            <h1>${singleProduct.name}</h1>
            <div class="single__product-labelImage">
                <img src="${labelImage}"/>
            </div>
            ${Rating.render({
                value: singleProduct.rate,
                text: singleProduct.reviews,
            })}
            <div class="compare__product">
                <a><i class="fa-solid fa-circle-plus"></i>So sánh</a>
            </div>
            <div class="social__container">
                <button><i class="fa-solid fa-thumbs-up"></i>Like 82</button>
                <button><i class="fa-solid fa-share"></i>Share</button>
            </div>
        </div>`;
    },
};

export default TitleSingleProduct;
