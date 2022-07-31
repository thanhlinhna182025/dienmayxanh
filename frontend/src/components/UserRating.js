const UserRating = {
  render: () => {
    return `
    <div class="user__rating">
       <ul>
            <li>
                <div class="star__wrapper">
                    <span>5</span>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="timeline__star">
                    <div class="timing" style="width:60%"></div>
                </div>
                <span class="star__percent">60%</span>
            </li>
            <li>
                <div class="star__wrapper">
                    <span>4</span>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="timeline__star">
                    <div class="timing" style="width:20%"></div>
                </div>
                <span class="star__percent">20%</span>
            </li>
            <li>
                <div class="star__wrapper">
                    <span>3</span>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="timeline__star">
                    <div class="timing" style="width:10%"></div>
                </div>
                <span class="star__percent">10%</span>
            </li>
            <li>
                <div class="star__wrapper">
                    <span>2</span>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="timeline__star">
                    <div class="timing" style="width:5%"></div>
                </div>
                <span class="star__percent" >5%</span>
            </li>
            <li>
                <div class="star__wrapper">
                    <span>1</span>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="timeline__star">
                    <div class="timing" style="width:5%"></div>
                </div>
                <span class="star__percent">5%</span>
            </li>
       </ul>
    </div>`;
  },
};
export default UserRating;
