import banner from '../assets/images/banner/Banner-1.png';
const Banner = {
    render: () => {
        return `
        <div class="banner__container">
            <img src="${banner}"/>
        </div>`;
    },
};
export default Banner;
