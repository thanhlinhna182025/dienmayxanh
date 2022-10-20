import {
  createOrder,
  getCityData,
  getDistrictData,
  getWardData,
} from "../helper/api";
import ChonsenQuantity from "../components/ChosenQuantity";
import {
  formatVND,
  controlDropdown,
  checkPhoneNumber,
  reRender,
  redirect,
} from "../helper/ultil";
import { getCartItems, setCartItems } from "../helper/localStorage";

const CartScreen = {
  after_render: async () => {
    $(function () {
      controlDropdown();
      $("input[name=gender]").first().attr("checked", true);
    });
    // Product quantity
    const start = 1;
    const end = 5;
    $.each($(".increase"), function (index, item) {
      const _this = $(item);
      _this.on("click", function () {
        let value = _this.siblings("input").val();
        value = isNaN(value) ? 1 : value;
        if (value < end) {
          value++;
          _this.siblings("input").val(value);
          const cartItems = getCartItems();
          cartItems[index].quantity = value;
          setCartItems([...cartItems]);
          _this
            .parent()
            .siblings(".provisional")
            .children(".provision")
            .children(".num")
            .text(value);
          _this
            .parent()
            .siblings(".quantity__order-container")
            .children(".quantity__order")
            .children(".num")
            .text(value);

          const price = parseInt(
            _this
              .parent()
              .siblings(".price")
              .children(".priceItem")
              .text()
              .replaceAll(".", "")
          );
          const VND = formatVND(price * value);
          _this
            .parent()
            .siblings(".provisional")
            .children(".totalPrice")
            .text(VND)
            .attr("data", price * value);
          const sum = [...$(".totalPrice")].reduce(function (total, current) {
            return total + parseInt(current.attributes.data.value);
          }, 0);
          $("#total").text(formatVND(sum));
          _this.siblings(".decrease").attr("disabled", false);
        } else if (value === end) {
          value = end;
          _this.attr("disabled", true);
        }
      });
    });
    $.each($(".decrease"), function (index, item) {
      const _this = $(item);
      _this.on("click", function () {
        let value = _this.siblings("input").val();
        value = isNaN(value) ? 1 : value;
        if (value > start) {
          value--;
          _this.siblings("input").val(value);
          const cartItems = getCartItems();
          cartItems[index].quantity = value;
          setCartItems([...cartItems]);
          _this
            .parent()
            .siblings(".provisional")
            .children(".provision")
            .children(".num")
            .text(value);
          _this
            .parent()
            .siblings(".quantity__order-container")
            .children(".quantity__order")
            .children(".num")
            .text(value);

          const price = parseInt(
            _this
              .parent()
              .siblings(".price")
              .children(".priceItem")
              .text()
              .replaceAll(".", "")
          );
          const VND = formatVND(price * value);
          _this
            .parent()
            .siblings(".provisional")
            .children(".totalPrice")
            .text(VND)
            .attr("data", price * value);
          const sum = [...$(".totalPrice")].reduce(function (total, current) {
            return total + parseInt(current.attributes.data.value);
          }, 0);
          $("#total").text(formatVND(sum));
          _this.siblings(".increase").attr("disabled", false);
        } else if (value === start) {
          value = end;
          _this.attr("disabled", true);
        }
      });
    });

    //Form
    const style1 = {
      top: 0,
      backGroundColor: "#fff",
      padding: "5px 10px",
      borderLeft: "1px solid #ccc",
      borderRight: "1px solid #ccc",
    };
    const style2 = {
      top: "50%",
      padding: "0px",
      borderLeft: "none",
      borderRight: "none",
    };
    $("#phone").on({
      change: () => {
        if ($("#phone").val().length > 0) {
          const flag = checkPhoneNumber($("#phone"));
          if (!flag) {
            $("#phone").css("borderColor", "red");
          } else {
            $("#phone").css("borderColor", "#ccc");
          }
          $("#phone").siblings().css(style1);
        } else {
          $("#phone").siblings().css(style2);
        }
      },
      focus: () => {
        $("#phone").siblings().css(style1);
      },
      blur: () => {
        if ($("#phone").val().length > 0) {
          $("#phone").siblings().css(style1);
        } else {
          $("#phone").siblings().css(style2);
        }
      },
    });
    $.each($("input[type=text]"), function (_, item) {
      $(item).on({
        change: () => {
          if ($(item).val().length > 0) {
            $(item).siblings().css(style1);
          } else {
            $(item).siblings().css(style2);
          }
        },
        focus: () => {
          $(item).siblings().css(style1);
        },
        blur: () => {
          if ($(item).val().length > 0) {
            $(item).siblings().css(style1);
          } else {
            $(item).siblings().css(style2);
          }
        },
      });
    });
    // Address
    $.each($("#city .dropdown-item"), async function (_, item) {
      const cityCodeName = $(item).attr("data-city");
      $(item).on("click", async function () {
        const districts = await getDistrictData(cityCodeName);
        $("#btn-province").text($(item).text());
        $("#city").parent().removeClass("dropdown--active");
        const html = districts.map(
          (d) =>
            `<div class="dropdown-item" data-district="${d.code}">${d.name}</div>`
        );
        $("#district").html(html);
        $("#district").parent().toggleClass("dropdown--active");
        $("#btn-district").attr("disabled", false);
        $.each($("#district .dropdown-item"), function (_, item) {
          $(item).on("click", async function () {
            $("#btn-district").text($(item).text());
            $("#btn-ward").attr("disabled", false);
            $("#btn-district").parent().removeClass("dropdown--active");
            const districtcode = $(item).attr("data-district");
            const wards = await getWardData(districtcode);
            const html = wards.map(
              (w) =>
                `<div class="dropdown-item" data-ward="${w.code}">${w.name}</div>`
            );
            $("#ward").html(html);
            $("#ward").parent().toggleClass("dropdown--active");
            $.each($("#ward .dropdown-item"), function (_, item) {
              $(item).on("click", function () {
                $("#btn-ward").text($(item).text());
                $("#btn-ward").parent().removeClass("dropdown--active");
              });
            });
          });
        });
      });
    });
    //Choice deliverAt
    $("input[name=deliverAt]").on("change", function () {
      const flag = $(this).val() === "1" ? true : false;
      if (flag) {
        $("#shop__adress").css("display", "flex");
      } else {
        $("#shop__adress").css("display", "none");
      }
    });
    // Remove item
    $.each($(".remove"), function (index, item) {
      const _this = $(item);
      _this.on("click", function () {
        const cartItems = getCartItems();
        const filtered = cartItems.filter(function (fil, i) {
          return i !== index;
        });
        setCartItems([...filtered]);
        reRender(CartScreen);
      });
    });

    // Order
    $("#btn-create-order").on("click", async function (event) {
      event.preventDefault();
      const flag = checkPhoneNumber($("#phone"));
      const orderer = {
        gender: $("input[name=gender]:checked").val(),
        name: $("#name").val(),
        phoneNo: $("#phone").val(),
      };
      const address = {
        detail: $("#detail").val(),
        ward: $("#btn-ward").text(),
        district: $("#btn-district").text(),
        province: $("#btn-province").text(),
      };
      const shippingInfo = {
        orderer: orderer,
        address: address,
      };
      if ($("input[name=deliverAt]:checked").val() === "0") {
        shippingInfo.address = address;
      } else {
        shippingInfo.address = {
          province: "Nhận tại cửa hàng",
          district: "Nhận tại cửa hàng",
          ward: "Nhận tại cửa hàng",
          detail: "Nhận tại cửa hàng",
        };
      }

      const otherRequire = $("#otherRequire").val();
      const cartItems = getCartItems();
      const orderItems = cartItems.map(function (cart) {
        return {
          name: cart.name,
          price: cart.price,
          quantity: cart.quantity,
          product: cart.product,
          options: cart.options,
        };
      });
      const total = parseInt($("#total").attr("data-total-money"));

      const order = {
        shippingInfo: shippingInfo,
        orderItems: orderItems,
        otherRequire: otherRequire,
        total: total,
      };
      if (flag) {
        const res = await createOrder(order);
        if (res.success) {
          setCartItems([]);
          const id = res.order._id;
          redirect(`/#/order/${id}`);
        }
      }
    });
  },
  render: async () => {
    //Data address
    const cities = await getCityData();
    // local
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
      redirect("/#/");
    }
    const sum = cartItems.reduce(function (total, current) {
      return total + current.price * current.quantity;
    }, 0);

    return `
      <div class="popup__bg">
        <div class="cart">
          <a class="close" href="/#/"><i class="fa-solid fa-xmark"></i></a>
          ${cartItems
            .map(
              (item) => `
          <div class="product__info-container">
            <div class="image__container">
              <img  src="${item.image}"/>
            </div>
            <div class="product__info">
              <h1  data-product="${item.name}">${item.name}</h1>
              ${item.options
                .map(
                  (option) => `<div>
                <span>${option.type} : </span>
                <span>${option.value}</span>
                </div>`
                )
                .join("")}
              <p class="price" >
                <label>Giá:</label>
                <span class="priceItem">${formatVND(item.price)}</span>
              </p>
              <div class="quantity__order-container">
                <span class="quantity__order">
                  Số lượng  : 
                  <b class="num">${item?.quantity}</b>
                </span>
              </div>
              ${ChonsenQuantity.render(item.quantity)}
              <div class="provisional">
                <span class="provision">
                  Tạm tính (
                    <b class="num">${item?.quantity}</b>
                ) sản phẩm :</span>
                <span  class="totalPrice" data="${
                  item?.quantity * item.price
                }">${formatVND(item?.quantity * item.price)}</span>
              </div>
              <span class="remove">Xóa khỏi giỏ hàng</span>
            </div>
          </div>
          `
            )
            .join("")}
          
          <div class="customer__info">
              <form class="form">
                  <h2 class="title">THÔNG TIN KHÁCH HÀNG</h2>
                  <div class="form__group">
                    <div class="form__group-item--radio" >
                      <input type="radio" name="gender" value="male" id="male"/>
                      <label for="male">Anh</label>
                    </div>
                    <div class="form__group-item--radio" >
                      <input type="radio" name="gender" value="female" id="female"/>
                      <label for="female">Chị</label>
                    </div>
                  </div>
                  <div class="form__group">
                    <div class="form__group-item relative" >
                      <input type="text" id="name" autocomplete="off" class="form__input" required/>
                      <label for="name">Họ và tên:</label>
                    </div>
                    <div class="form__group-item relative" >
                      <input type="tel" id="phone" autocomplete="off" class="form__input" required/>
                      <label for="phone" >Số điện thoại:</label>
                    </div>
                  </div>
                  <h2 class="title">CHỌN CÁCH THỨC GIAO HÀNG</h2>
                  <div class="form__group">
                    <div class="form__group-item--radio" >
                      <input type="radio" name="deliverAt" value="0" id="home" required checked/>
                      <label for="home">Nhận tại nhà</label>
                    </div>
                    <div class="form__group-item--radio" >
                      <input type="radio" name="deliverAt" value="1" id="shop" required/>
                      <label for="shop">Nhận tại cửa hàng</label>
                    </div>
                  </div>
                  <div class="shop__adress" id="shop__adress">
                    <h1>CỬA HÀNG LITANA XIN KÍNH CHÀO QUÝ KHÁCH</h1>
                    <p>Địa chỉ cửa hàng : 01 Phan Chu Trinh , Phường 5 ,Thành phố Vũng Tàu</p>
                    <p>Số điện thoại tổng đài: 0643.003.003</p>
                    <p>Hoặc gọi di động số: 090.090.0000  gặp nhân viên tư vấn</p>
                  </div>
                  <div class="deliver__container" id="deliver__container">
                    <div class="form__group">
                      <div class="dropdown">
                        <div class="dropdown-button" id="btn-province">Chọn tỉnh/thành phố</div>
                          <div class="dropdown-content" id="city">
                          ${cities
                            .map(
                              (c) =>
                                ` <div class="dropdown-item" data-city="${c.code}">${c.name}</div>`
                            )
                            .join("")}
                          </div>
                        </div>
                      <div class="dropdown">
                        <button class="dropdown-button" id="btn-district" type="button" disabled>Chọn huyện/quận</button>
                        <div class="dropdown-content" id="district">
                        </div>
                      </div>
                    </div>
                    <div class="form__group">
                       <div class="dropdown">
                        <button class="dropdown-button"id="btn-ward" type="button" disabled>Chọn xã/phường</button>
                        <div class="dropdown-content" id="ward"></div>
                      </div>
                      <div class="form__group-item relative" >
                        <input type="text" id="detail" autocomplete="off" class="form__input" required/>
                        <label for="detail">Số nhà,tên đường:</label>
                      </div>
                    </div>
                  </div>
                  <div class="form__group">
                      <input id="otherRequire" type="text" class="form__input" placeholder="Yêu cầu khác (nếu có)" autocomplete="off"/>
                  </div>
                  <div class="form__group">
                  <span>Tổng tiền : <b class="total" id="total" data-total-money="${sum}">${formatVND(
      sum
    )}</b></span >
                  </div>
                  <div class="form__group">
                    <button class="btn btn--border btn--blue fw" id="btn-create-order">Đặt Hàng</button>
                  </div>
              </form>
          </div>
        </div>
      </div>
      `;
  },
};

export default CartScreen;
