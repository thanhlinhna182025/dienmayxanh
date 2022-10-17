import Rating from "./Rating";

const Comments = {
  render: (product) => {
    return `<div class="comments">
          <ul class="comment__list">
          ${product.reviews
            .map(
              (comment) => `
                        <li class="comment__item">
                            <div class="item-top">
                                <span>${comment.name}</span>
                                <div>
                                    <i class="fa-solid fa-check-double"></i>
                                    <span>Đã mua tại LITANA</span>
                                </div>
                            </div>
                            <div class="item-center">
                                ${Rating.render({ value: `${comment.rate}` })}
                            </div>
                            <div class="item-bottom">
                                <span>${comment.content}</span>
                            </div>
                        </li>
          `
            )
            .join("\n")}
          </ul>
          <div class="comment__btn-container">
            <button><i class="fa-solid fa-comment"></i><span>Viết đánh giá</span></button>
            <button> <span>Xem đánh giá khác</span><i class="fa-solid fa-caret-right"></i></button>
          </div>
      </div>`;
  },
};

export default Comments;
