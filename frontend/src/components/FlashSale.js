import lighting from '../assets/images/lightning.png';
import CartProducts from './CartProducts';
import { productsCart } from '../data';

const FlashSale = {
    render: () => {
        const countDownDate = new Date('July 29, 2022 00:00:00').getTime();
        const x = setInterval(function () {
            // Get today's date and time
            const now = new Date().getTime();
            // Find the distance between now and the count down date
            const distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById(
                'timer'
            ).innerHTML = `<div class="days">${days}days</div> <div class="hours">${hours}hours</div> <div class="minutes">${minutes}min</div> <div class="seconds" >${seconds}s</div>`;

            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                document.getElementById('count__down-timer').innerHTML =
                    'EXPIRED';
            }
        }, 1000);
        return `
        <div class="flash__sale">
            <div class="flash__sale-info">
                <div class="count__down-block">
                    <div class="count__down-right">
                        <img src="${lighting}"/>
                    </div>
                    <div class="count__down-left">
                        <h2>GIỜ VÀNG DEAL SỐC</h2>
                        <div class ="count__down-timer" id="count__down-timer">
                            <span>Kết thúc trong</span>
                            <div id="timer" class="timer">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="upcoming">
                    <div class="upcoming__item active">
                        <p>Đang diễn ra</p>
                        <p>19:00-21:00</p>
                    </div>
                    <div class="upcoming__item">
                        <p>Sắp diễn ra</p>
                        <p>09:00-11:00</p>
                    </div>
                    <div class="upcoming__item">
                        <p>Ngày mai</p>
                        <p>14:00-16:00</p>
                    </div>
                </div>
            </div>
            <div class="flash__sale-main">
            ${productsCart
                .map((cartproduct) => CartProducts.render(cartproduct))
                .join('\n')}
            </div>
        </div>`;
    },
};

export default FlashSale;
