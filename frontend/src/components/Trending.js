import { trendings } from '../data';
const Trending = {
    render: () => {
        return `
        <div class="trending">
            <h5>XU HƯỚNG MUA SẮM</h5>
            <div class="trending__list-container">
                <ul class="trending__list">
                ${trendings
                    .map(
                        (trend) => `<li class="trending__item">
                        <div class="trending__item-image">
                            <img src="${trend.image}"/>
                        </div>
                        <div class="trending__item-info">
                            <h6>${trend.name}</h6>
                            <span>${trend.promotion.desc}</span>
                            <span class="next__arrow"><i class="fa-solid fa-angle-right"></i></span>
                        </div>
                    </li>`
                    )
                    .join('\n')}
                </ul>
            </div>
        </div>`;
    },
};

export default Trending;
