import Comments from "./Comments";
import Rating from "./Rating";
import UserRating from "./UserRating";

const Reviews = {
  render: (product) => {
    return `
    <div class="reviews">
      <p>Đánh Giá ${product.name}</p>
      <div class="rating__container">
          <div class="box">
            <span class="rating__number">${product.rate}</span>
            ${Rating.render({
              value: `${product.rate}`,
              text: 6,
            })}
          </div>
          ${UserRating.render()}
      </div>
      <div class="line line--row"></div>
      ${Comments.render(product)}
    </div>`;
  },
};

export default Reviews;
