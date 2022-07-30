import option1 from '../assets/images/optionpromotion/option1.png';
import option2 from '../assets/images/optionpromotion/option2.png';
import option3 from '../assets/images/optionpromotion/option3.png';
const OptionPromotion = {
    render: () => {
        return `
        <div class="option__promotion">
            <div class="promotionItem">
                <img src="${option1}"/>
                <span>Đồng giá từ 99K</span>
            </div>
            <div class="promotionItem">
                <img src="${option2}"/>
                <span>Chỉ giảm Online</span>
            </div>
            <div class="promotionItem">
                <img src="${option3}"/>
                <span>Xả hàng giảm sốc</span>
            </div>
        </div>`;
    },
};

export default OptionPromotion;
