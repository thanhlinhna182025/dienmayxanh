import { getCountryData, getDistrictData, getWardData } from "../api";
import InfoCustomer from "../components/InfoCustomer";
import { singleProduct } from "../data";

const AddToCartScreen = {
  after_render: async () => {
    const countryData = await getCountryData();
    const city = document.getElementById("city");
    const district = document.getElementById("district");
    const ward = document.getElementById("ward");
    const cityName = document.getElementById("cityName");
    const districtName = document.getElementById("districtName");
    const wardName = document.getElementById("wardName");
    const dropdownCity = document.getElementById("dropdownCity");
    const dropdownDictrict = document.getElementById("dropdownDistrict");
    const dropdownWard = document.getElementById("dropdownWard");

    city.addEventListener("click", () => {
      dropdownCity.classList.toggle("active");
      city.classList.toggle("anchor");
      dropdownCity.innerHTML = `
                    ${countryData
                      .map(
                        (country) =>
                          `<a class="dropdown__item city" code="${country.code}">${country.name}</a>`
                      )
                      .join("\n")}
                  `;
      Array.from(document.getElementsByClassName("city")).forEach((c) => {
        c.addEventListener("click", async () => {
          cityName.innerText = c.textContent;
          const districtData = await getDistrictData(c.attributes.code.value);
          dropdownDictrict.classList.toggle("active");
          district.classList.toggle("anchor");
          dropdownDictrict.innerHTML = `${districtData.districts
            .map(
              (d) =>
                `<a class="dropdown__item district" code="${d.code}">${d.name}</a>`
            )
            .join("\n")}`;
          Array.from(document.getElementsByClassName("district")).forEach((d) =>
            d.addEventListener("click", async (e) => {
              e.stopPropagation();
              districtName.innerText = d.textContent;
              dropdownDictrict.classList.remove("active");
              district.classList.remove("anchor");
              const wardData = await getWardData(d.attributes.code.value);
              dropdownWard.innerHTML = `${wardData.wards
                .map(
                  (w) =>
                    `<a class="dropdown__item ward" code="${w.code}">${w.name}</a>`
                )
                .join("\n")}`;
              dropdownWard.classList.toggle("active");
              ward.classList.toggle("anchor");
              Array.from(document.getElementsByClassName("ward")).forEach((w) =>
                w.addEventListener("click", (e) => {
                  e.stopPropagation();
                  wardName.innerText = w.textContent;
                  dropdownWard.classList.toggle("active");
                  ward.classList.toggle("anchor");
                })
              );
            })
          );
        });
      });
    });
    district.addEventListener("click", () => {
      dropdownDictrict.classList.toggle("active");
      district.classList.toggle("anchor");
    });
    ward.addEventListener("click", () => {
      dropdownWard.classList.toggle("active");
      ward.classList.toggle("anchor");
    });
  },
  render: async () => {
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
              <div class="choose__quantity">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
              <div class="provisional">
                <span>Tạm tính (1) sản phẩm :</span>
                <span>${remain}</span>
              </div>
            </div>
          </div>
          <div class="customer__info-container">
            <p class="title">THÔNG TIN KHÁCH HÀNG :</p>
            <form class="customer__info-form">
              <div class="form__group">
                <div class="radio__item">
                  <label for="male">Anh</label>
                  <input type="radio" name="gender" id="male" value="male" checked/>
                </div>
                <div class="radio__item">
                  <label for="female">Chị</label>
                  <input type="radio" name="gender" id="female" value="famale"/>
                </div>
              </div>
              <div class="form__group">
                <input placeholder="Họ và tên"/>
                <input placeholder="Số điện thoại"/>
              </div>
              <p class="title">CHỌN CÁCH THỨC NHẬN HÀNG</p>
              <div class="form__group">
                <div class="radio__item">
                  <label for="house">Giao tận nơi</label>
                  <input type="radio" name="delivery" id="house" value="house" checked/>
                </div>
                <div class="radio__item">
                  <label for="market">Nhận tại siêu thị</label>
                  <input type="radio" name="delivery" id="market" value="market"/>
                </div>
              </div>
              ${InfoCustomer.render(singleProduct)}
            </form>
            <div class="customer__note">
              <input placeholder="Yeu cau khac (khong bat buoc)" class="box"/>
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
