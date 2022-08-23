import { getCityData, getDistrictData, getWardData } from "../api";
import ChonsenQuantity from "../components/ChosenQuantity";
import { singleProduct } from "../data";

const AddToCartScreen = {
  after_render: async () => {
    // Product quantity
    const decrease = document.getElementById("decrease");
    const quantity = document.getElementById("quantity");
    const increase = document.getElementById("increase");
    let value = parseInt(quantity.value, 10);
    value = isNaN(value) ? 0 : value;
    increase.addEventListener("click", () => {
      if (value < 5) {
        value++;
        quantity.value = value;
        decrease.disabled = false;
      } else if ((value = 5)) {
        value = value;
        quantity.value = value;
        increase.disabled = true;
      }
    });
    decrease.addEventListener("click", () => {
      if (value > 1) {
        value--;
        quantity.value = value;
        increase.disabled = false;
      } else if ((value = 1)) {
        quantity.value = value;
        decrease.disabled = true;
      }
    });
    quantity.addEventListener("onchange", () => {
      quantity.value = value;
    });
    // Dropdown address
    //Dropdown
    const dropdownCity = document.getElementById("dropdownCity");
    const dropdownDistrict = document.getElementById("dropdownDistrict");
    const dropdownWard = document.getElementById("dropdownWard");
    //Dropdown__content
    const dropdownContentDistrict = document.getElementById(
      "dropdownContentDistrict"
    );
    const dropdownContentWard = document.getElementById("dropdownContentWard");
    //Dropdown__button

    const buttonCity = document.getElementById("buttonCity");
    const buttonDistrict = document.getElementById("buttonDistrict");
    const buttonWard = document.getElementById("buttonWard");
    //Dropdown__content-item
    const cityNames = Array.from(document.getElementsByClassName("city__name"));

    buttonCity.addEventListener("click", () => {
      dropdownCity.classList.toggle("dropdown--active");
      let x = dropdownCity.classList.contains("dropdown--active");
      if (x) {
        buttonCity.classList.replace("tri--down", "tri--up");
      } else {
        buttonCity.classList.replace("tri--up", "tri--down");
      }
    });
    buttonDistrict.addEventListener("click", () => {
      dropdownDistrict.classList.toggle("dropdown--active");
      let x = dropdownDistrict.classList.contains("dropdown--active");
      if (x) {
        buttonDistrict.classList.replace("tri--down", "tri--up");
      } else {
        buttonDistrict.classList.replace("tri--up", "tri--down");
      }
    });
    buttonWard.addEventListener("click", () => {
      dropdownWard.classList.toggle("dropdown--active");
      let x = dropdownWard.classList.contains("dropdown--active");
      if (x) {
        buttonWard.classList.replace("tri--down", "tri--up");
      } else {
        buttonWard.classList.replace("tri--up", "tri--down");
      }
    });
    cityNames.forEach((item) =>
      item.addEventListener("click", async () => {
        const districtData = await getDistrictData(item.attributes.code.value);
        dropdownContentDistrict.innerHTML = districtData
          .map(
            (item) =>
              `<a class="dropdown__content-item district__name" code=${item.code}>${item.name}</a>`
          )
          .join(" ");
        buttonCity.innerText = item.textContent;
        dropdownCity.classList.toggle("dropdown--active");
        let x = buttonCity.classList.contains("tri--down");
        if (x) {
          buttonCity.classList.replace("tri--down", "tri--up");
        } else {
          buttonCity.classList.replace("tri--up", "tri--down");
        }

        dropdownDistrict.classList.add("dropdown--active");
        buttonDistrict.disabled = false;
        Array.from(document.getElementsByClassName("district__name")).forEach(
          (item) =>
            item.addEventListener("click", async () => {
              const wardData = await getWardData(item.attributes.code.value);
              dropdownContentWard.innerHTML = wardData
                .map(
                  (item) => `
              <a class="dropdown__content-item ward__name" code=${item.code}>${item.name}</a>
              `
                )
                .join(" ");
              buttonDistrict.innerText = item.textContent;
              let x = dropdownDistrict.classList.contains("dropdown--active");
              if (x) {
                buttonDistrict.classList.replace("tri--up", "tri--down");
              } else {
                buttonDistrict.classList.replace("tri--down", "tri--up");
              }
              buttonWard.disabled = false;
              dropdownWard.classList.add("dropdown--active");
              dropdownDistrict.classList.toggle("dropdown--active");

              Array.from(document.getElementsByClassName("ward__name")).forEach(
                (item) =>
                  item.addEventListener("click", async () => {
                    buttonWard.innerText = item.textContent;
                    dropdownWard.classList.toggle("dropdown--active");
                    let x = dropdownWard.classList.contains("dropdown--active");
                    if (x) {
                      buttonWard.classList.replace("tri--down", "tri--up");
                    } else {
                      buttonWard.classList.replace("tri--up", "tri--down");
                    }
                  })
              );
            })
        );
      })
    );
    //Custom input
    document.getElementById("name").addEventListener("change", () => {
      const value = document.getElementById("name").value.toString();
      const labelName = document.getElementById("labelName");
      if (value.length > 0) {
        labelName.classList.add("label-position");
      } else {
        labelName.classList.remove("label-position");
      }
    });
    document.getElementById("phone").addEventListener("change", () => {
      const value = document.getElementById("phone").value.toString();
      const labelPhone = document.getElementById("labelPhone");
      if (value.length > 0) {
        labelPhone.classList.add("label-position");
      } else {
        labelPhone.classList.remove("label-position");
      }
    });
    document.getElementById("street").addEventListener("change", () => {
      const value = document.getElementById("street").value.toString();
      const labelStreet = document.getElementById("labelStreet");
      if (value.length > 0) {
        labelStreet.classList.add("label-position");
      } else {
        labelStreet.classList.remove("label-position");
      }
    });
    document.getElementById("another").addEventListener("change", () => {
      const value = document.getElementById("another").value.toString();
      const labelAnother = document.getElementById("labelAnother");
      if (value.length > 0) {
        labelAnother.classList.add("label-position");
      } else {
        labelAnother.classList.remove("label-position");
      }
    });
  },
  render: async () => {
    //Data address
    const cityData = await getCityData();
    //Custom  VND
    const price = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(singleProduct.price);
    const discount = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(
      (singleProduct.price * singleProduct.promotion.discountpercent) / 100
    );
    const remain = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(
      singleProduct.price -
        (singleProduct.price * singleProduct.promotion.discountpercent) / 100
    );
    return `
      <div class="popup__bg">
        <div class="add__to-cart">
          <a class="close" href="/#/"><i class="fa-solid fa-xmark"></i></a>
          <div class="product__info-container">
            <div class="image__container">
              <img src="${singleProduct.image[0].url}"/>
            </div>
            <div class="product__info">
              <h1>${singleProduct.name}</h1>
              <div class="promotion__info">
                <h2>Thông tin khuyến mãi :</h2>
                <p>${singleProduct.promotion.desc}</p>
              </div>
              <p class="price">Giá gốc: ${price}</p>
              <div>
                <span class="discount">Giảm <b>${discount}</b> Còn</span>
                <span class="remain"> ${remain}</span>
              </div>
              ${ChonsenQuantity.render()}
              <div class="provisional">
                <span>Tạm tính (1) sản phẩm :</span>
                <span>${remain}</span>
              </div>
            </div>
          </div>
          <div class="customer__info-container">
            <p class="title">THÔNG TIN KHÁCH HÀNG :</p>
            <form class="customer__info-form">
              <div class="form__group form__group-flex--row">
                <div class="radio__item">
                  <label for="male" class="label--white">Anh</label>
                  <input type="radio" name="gender" id="male" value="male" checked/>
                </div>
                <div class="radio__item">
                  <label for="female" class="label--white">Chị</label>
                  <input type="radio" name="gender" id="female" value="famale"/>
                </div>
              </div>
              <div class="form__group form__group-flex--row">
                <div class ="form__group-global name ">
                  <input type="text" id="name" value=""/>
                  <label for="name" class="label--white" id="labelName">Họ và tên</label>
                </div>
                <div class ="form__group-global phone">
                  <input type="text" id="phone"/>
                  <label for="phone" class="label--white" id="labelPhone">So dien thoai</label>
                </div>
              </div>
              <p class="title">CHỌN CÁCH THỨC NHẬN HÀNG</p>
              <div class="form__group form__group-flex--row">
                <div class="radio__item">
                  <label for="house">Giao tận nơi</label>
                  <input type="radio" name="delivery" id="house" value="house" checked/>
                </div>
                <div class="radio__item">
                  <label for="market">Nhận tại siêu thị</label>
                  <input type="radio" name="delivery" id="market" value="market"/>
                </div>
              </div>
              <div class="form__group ">
                <div class="dropdown__container">
                  <p>Chọn địa chỉ để biết thời gian nhận hàng và phí vận chuyển (nếu có)</p>
                  <div class="dropdown" id="dropdownCity">
                    <button class="button__dropdown tri--down left30" id="buttonCity">Chon tinh/thanh pho</button>
                    <div class="dropdown__content left" id="dropdownContentCity"> 
                      ${cityData
                        .map(
                          (item) =>
                            `<a class="dropdown__content-item city__name" code="${item.code}">${item.name}</a>`
                        )
                        .join(" ")}
                    </div>
                  </div>
                  <div class="dropdown" id="dropdownDistrict">
                    <button class="button__dropdown tri--down right30" id="buttonDistrict" disabled>Chon quan/huyen</button>
                    <div class="dropdown__content right" id="dropdownContentDistrict"> 
                    </div>
                  </div>
                  <div class="dropdown" id="dropdownWard">
                    <button class="button__dropdown tri--down left30" id="buttonWard" disabled>Chon phuong/xa</button>
                    <div class="dropdown__content left" id="dropdownContentWard"> 
                    </div>
                  </div>
                  <div class="street__container form__group-global">
                    <input type="text"class="street" id="street"/>
                    <label class="label--gradient" for="street" id="labelStreet">So nha , ten duong</label>
                  </div>
                </div>
              </div>
            </form>
            <div class="form__group-global">
              <input class="fw" type="text" id="another"/>
              <label class="label--white" for="another" id="labelAnother">Yeu cau khac (khong bat buoc)</label>
            </div>
            <div class="line line--row"></div>
            <div class="total__payment">
              <div>
                <span>Tong tien :</span>
                <span>${remain}</span>
              </div>
              <a href="/#/order">DAT HANG</a>
              <p>Ban co the chon hinh thuc thanh toan khi nhan hang</p>
            </div>
          </div>
        </div>
      </div>
      `;
  },
};

export default AddToCartScreen;
