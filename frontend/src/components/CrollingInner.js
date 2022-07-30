const CrollingInner = {
    render: () => {
        return `
        <div class="crolling__inner">
            <div class="crolling__inner-item">
                <div class="crolling__inner-item__container">
                    <a><i class="fa-solid fa-medal"></i></a>
                </div>
                <p>Điểm nổi bật</p>
            </div>
            <div class="crolling__inner-item">
                <div class="crolling__inner-item__container">
                    <a><i class="fa-solid fa-gears"></i></a>
                </div>
                <p>Thông số kĩ thuật</p>
            </div>
            <div class="crolling__inner-item">
                <div class="crolling__inner-item__container">
                    <a><i class="fa-solid fa-info"></i></a>
                </div>
                <p>Thông tin sản phẩm</p>
            </div>
        </div>`;
    },
};

export default CrollingInner;
