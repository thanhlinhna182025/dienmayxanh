import { getOneProduct, PF } from "../helper/api";
import ChonsenQuantity from "../components/ChosenQuantity";
import {
  formatVND,
  parseRequestUrl,
  redirect,
} from "../helper/ultil";
import { getCartItems, setCartItems } from "../helper/localStorage";

const AddToCartScreen = {
  after_render: async () => {
    $(function name() {
      $("input[name=color]").first().attr("checked", true);
      $("input[name=memory]").first().attr("checked", true);
      $("input[name=volume]").first().attr("checked", true);
      $("input[name=tankage]").first().attr("checked", true);
      $("input[name=horsepower]").first().attr("checked", true);
    });
    // quantity
    const start = 1;
    const end = 5;
    $.each($(".increase"), function (_, item) {
      const _this = $(item);
      _this.on("click", function () {
        let value = _this.siblings("input").val();
        value = isNaN(value) ? 1 : value;
        if (value < end) {
          value++;
          _this.siblings("input").val(value);
          _this.siblings(".decrease").attr("disabled", false);
        } else if (value === end) {
          value = end;
          _this.attr("disabled", true);
        }
      });
    });
    $.each($(".decrease"), function (_, item) {
      const _this = $(item);
      _this.on("click", function () {
        let value = _this.siblings("input").val();
        value = isNaN(value) ? 1 : value;
        if (value > start) {
          value--;
          _this.siblings("input").val(value);
          _this.siblings(".increase").attr("disabled", false);
        } else if (value === start) {
          value = end;
          _this.attr("disabled", true);
        }
      });
    });
    // Price
    $.each($("input[type=radio]"), function (_, item) {
      $(item).on("change", function () {
        const price = parseInt($("#productPrice").attr("data-product"));
        const arr = [...$("input[type=radio]:checked")];
        const sum = arr.reduce(function (accumulator, curValue) {
          return accumulator + parseInt(curValue.value);
        }, price);
        $("#productPrice").text(formatVND(sum));
      });
    });

    // Toggle promotion info
    $(".promotion-detail").on("click", function () {
      $(this).toggle(50);
      $(".promotion__wrapper").toggle(50);
    });
    $(".collapse").on("click", function () {
      $(".promotion__wrapper").toggle(50);
      $(".promotion-detail").toggle(50);
    });
    // Add cart into localstorage
    $("#btn-add-to-cart").on("click", function () {
      const options = [];
      if ($("input[name=color]:checked").length > 0) {
        const option = {
          type: $("input[name=color]:checked").attr("name"),
          value: $("input[name=color]:checked").attr("data"),
        };
        options.push(option);
      }
      if ($("input[name=memory]:checked").length > 0) {
        const option = {
          type: $("input[name=memory]:checked").attr("name"),
          value: $("input[name=memory]:checked").attr("data"),
        };
        options.push(option);
      }
      if ($("input[name=volume]:checked").length > 0) {
        const option = {
          type: $("input[name=volume]:checked").attr("name"),
          value: $("input[name=volume]:checked").attr("data"),
        };
        options.push(option);
      }
      if ($("input[name=tankage]:checked").length > 0) {
        const option = {
          type: $("input[name=tankage]:checked").attr("name"),
          value: $("input[name=tankage]:checked").attr("data"),
        };
        options.push(option);
      }
      if ($("input[name=horsepower]:checked").length > 0) {
        const option = {
          type: $("input[name=horsepower]:checked").attr("name"),
          value: $("input[name=horsepower]:checked").attr("data"),
        };
        options.push(option);
      }
      const cartItem = {
        name: $(".title").text(),
        quantity: parseInt($(".quantity").val()),
        product: $(".title").attr("data-product"),
        image: $(".image__container img").attr("src"),
        price: parseInt($("#productPrice").text().replaceAll(".", "")),
        options: options,
      };

      const cartItems = getCartItems();
      setCartItems([...cartItems, cartItem]);
      redirect("/#/");
    });
    // redirec home
    $(".cancel").on("click", function () {
      redirect("/#/");
    });
  },
  render: async () => {
    const { id } = parseRequestUrl();
    const product = await getOneProduct(id);
    const price = product.promotion
      ? product.price -
        (product.price * product.promotion.detail.discount) / 100
      : product.price;
    const options = product.options;
    const colors = options.filter(function (item, index, arr) {
      return item.type === "color";
    });
    const memories = options.filter(function (item, index, arr) {
      return item.type === "memory";
    });
    const volumes = options.filter(function (item, index, arr) {
      return item.type === "volume";
    });
    const tankages = options.filter(function (item, index, arr) {
      return item.type === "tankage";
    });
    const horsepowers = options.filter(function (item, index, arr) {
      return item.type === "horsepower";
    });

    return `
      <div class="popup__bg">
        <div class="add__to-cart">
          <div class="top">
            <span class="cancel">
              <i class="fa-solid fa-xmark"></i>
            </span>
            <h1 class="title" data-product="${product._id}">${product.name}</h1>
            <span id="productPrice" data-product="${price}">${formatVND(
      price
    )}</span>
          </div>
          <div class="center">
            <div class="image__container">
              <img src="${PF}${product.image}"/>
            </div>
            <div class="group__options">
              ${
                colors && colors.length > 0
                  ? `<div class="group__option">
                  <h2>Chọn màu :</h2>
                <div class="group__option-item">
                  ${colors
                    .map(
                      (item) => `<div class="option">
                                <input type="radio" value="${item.plus}" data="${item.option}" name="color" required/>
                                <label>${item.option}</label>
                              </div>`
                    )
                    .join("")}
                </div>
              </div>`
                  : ``
              }
              ${
                memories && memories.length > 0
                  ? `<div class="group__option">
                  <h2>Chọn bộ nhớ :</h2>
                <div class="group__option-item">
                  ${memories
                    .map(
                      (item) => `<div class="option">
                                <input type="radio" value="${item.plus}"data="${item.option}" name="memory" required/>
                                <label>${item.option}</label>
                              </div>`
                    )
                    .join("")}
                </div>
              </div>`
                  : ``
              }
              ${
                volumes && volumes.length > 0
                  ? `<div class="group__option">
                  <h2>Chọn dung tích :</h2>
                <div class="group__option-item">
                  ${volumes
                    .map(
                      (item) => `<div class="option">
                                <input type="radio" value="${item.plus}" data="${item.option}" name="volume" required/>
                                <label>${item.option}</label>
                              </div>`
                    )
                    .join("")}
                </div>
              </div>`
                  : ``
              }
              ${
                tankages && tankages.length > 0
                  ? `<div class="group__option">
                  <h2>Chọn thể tích :</h2>
                <div class="group__option-item">
                  ${tankages
                    .map(
                      (item) => `<div class="option">
                                <input type="radio" value="${item.plus}" data="${item.option}" name="tankage" required/>
                                <label>${item.option}</label>
                              </div>`
                    )
                    .join("")}
                </div>
              </div>`
                  : ``
              }
              ${
                horsepowers && horsepowers.length > 0
                  ? `<div class="group__option">
                  <h2>Chọn mã lực :</h2>
                <div class="group__option-item">
                  ${horsepowers
                    .map(
                      (item) => `<div class="option">
                                <input type="radio" value="${item.plus}" data="${item.option}" name="horsepower" required/>
                                <label>${item.option}</label>
                              </div>`
                    )
                    .join("")}
                </div>
              </div>`
                  : ``
              }
            </div>
            <div class="quantity__container">
              <p>Chọn số lượng :</p>
              ${ChonsenQuantity.render()}
            </div>
          </div>
          <div class="bottom">
            <span class="promotion-detail">Xem tất cả các khuyến mãi:</span>
            <div class="promotion__wrapper">
              <p>- ${product.promotion.detail.gift}</p>
              <span class="collapse">Thu gọn :</span>
            </div>
              <button class="btn btn--blue fw" id="btn-add-to-cart">Thêm Vào Giỏ Hàng</button>
          </div>
        </div>
      </div>
      `;
  },
};

export default AddToCartScreen;
