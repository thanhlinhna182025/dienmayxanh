import Comments from "./Comments";
import Rating from "./Rating";
import UserRating from "./UserRating";

const Reviews = {
  render: (singleProduct) => {
    return `
    <div class="reviews">
      <p>Đánh Giá ${singleProduct.name}</p>
      <div class="rating__container">
          <div class="box">
            <span class="rating__number">${singleProduct.rate}</span>
            ${Rating.render({
              value: `${singleProduct.rate}`,
              text: `${singleProduct.reviews}`,
            })}
          </div>
          ${UserRating.render()}
      </div>
      <div class="line line--row"></div>
      ${Comments.render(singleProduct)}
    </div>`;
  },
};

export default Reviews;
