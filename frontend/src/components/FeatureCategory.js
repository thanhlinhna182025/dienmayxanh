import { featurecategory } from '../data';

const FeatureCategory = {
    render: () => {
        return `<div class="feature">
            <h5>DANH MỤC NỔI BẬT</h5>
            <div class="feature__list">
            ${featurecategory
                .map(
                    (feature) => `<div class="feature__item">
                    <div class="feature__image-container">
                        <img src="${feature.image}"/>
                    </div>
                    <a>${feature.name}</a>
                </div>`
                )
                .join('\n')}
            </div>
        </div>`;
    },
};

export default FeatureCategory;
