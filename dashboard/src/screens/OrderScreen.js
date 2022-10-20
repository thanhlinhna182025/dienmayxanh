import {
  createPromotion,
  uploadImageSingle,
  getAllPromotion,
  getAllOrder,
} from "../helper/api";
import {
  toastMessage,
  reRender,
  redirect,
  updateImageDisplay,
  controlDropdown,
} from "../helper/ultils";

const OrderScreen = {
  after_render: async () => {
    $(function () {
      controlDropdown();
    });
    //Display images
    const previews = document.getElementById("previews");
    $("#input-choice").on("change", function () {
      updateImageDisplay(this, previews);
    });

    // CHuyển hướng
    $.each($(".edit"), function (_, item) {
      $(item).on("click", function () {
        const id = $(item).attr("data-promotion");
        const hash = `/#/promotion/${id}`;
        redirect(hash);
      });
    });
    // Kiểm tra input=number start
    const tyle1 = {
      position: "absolute",
      left: "1rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#ccc",
      fontSize: "1.6rem",
      borderLeft: "none",
      borderRight: "none",
    };
    const tyle2 = {
      position: "absolute",
      left: "1rem",
      top: "0%",
      transform: "translateY(-50%)",
      color: "#ccc",
      fontSize: "1.6rem",
      backgroundColor: "#ffffff",
      padding: "0 1rem",
      borderLeft: "1px solid #ccc",
      borderRight: "1px solid #ccc",
      zIndex: "999",
    };

    $("#od-discount").on({
      focus: function () {
        $("#od-discount-label").css(tyle2);
      },
      blur: function () {
        $("#od-discount-label").css(tyle1);
        if ($(this).val().length) {
          $("#od-discount-label").css(tyle2);
        }
        if ($(this).val() > 100 || $(this).val() < 0) {
          $(this).css("border-color", "red");
        } else {
          $(this).css("border-color", "#ccc");
        }
      },
    });
    // Kiểm tra input=number end
    // Tạo chương trình khuyến mãi

    $("#od-btn-create").on("click", async function (e) {
      e.preventDefault();
      const newPromotion = {
        name: $("#od-name").val(),
        description: $("#od-description").val(),
        detail: {
          discount: Number($("#od-discount").val()),
          freeship: $("input[type=radio]:checked").val() === "1" ? true : false,
          gift: $("#od-gift").val(),
        },
      };
      const files = $("#input-choice")[0].files;
      const imgForm = new FormData();
      for (let file of files) {
        imgForm.append("file", file);
      }
      if (imgForm.has("file")) {
        const response = await uploadImageSingle(imgForm);
        if (response.success) {
          newPromotion.icon = response.images;
        }
      }
      const res = await createPromotion(newPromotion);
      if (res.success) {
        toastMessage({
          type: "success",
          title: "Thành công",
          message: res.message,
          duration: 500,
        });
        reRender(OrderScreen);
      } else {
        toastMessage({
          type: "error",
          title: "Có lỗi",
          message: res.error.message,
          duration: 500,
        });
      }
    });
  },
  render: async () => {
    const orders = await getAllOrder();
    console.log(orders);
    return `
    <div class="container bgc-create">
        <div class="right flex_1">
          <h2 class="title"> ĐƠN HÀNG</h2>
          <div class="search__container fw">
            <input placeholder="Tìm kiếm"/>
          </div>
          <table class="fw table__container">
            <thead>
              <th style = "width:10%;text-align:left;">Mã đơn hàng:</th>
              <th style = "width:10%;text-align:left;">Sản phẩm:</th>
              <th style = "width:10%;text-align:left;">Tổng cộng:</th>
              <th style = "width:10%;text-align:left;">Thanh toán:</th>
              <th style = "width:10%;text-align:left;">Người mua:</th>
              <th style = "width:10%;text-align:left;">Địa chỉ:</th>
              <th style = "width:10% ;text-align:right;">Số điện thoại:</th>
              <th style = "width:10% ;text-align:right;">Trạng thái:</th>
              <th style = "width:20% ;text-align:right;">Lựa chọn</th>
            </thead>
            <tbody>
              ${
                orders &&
                orders
                  .map(
                    (od) => `<tr >
                    <td style = "width:10%;text-align:left;">${od._id}</td>
                    <td style = "width:10%;text-align:left;">${od.orderItems
                      .map(
                        (item) => `
                      <div>
                        <p>Tên:${item.name}</p>
                        <p>Giá:${item.price}</p>
                        <p>Số lượng:${item.quantity}</p>
                        ${item.options
                          .map((op) => `<p>${op.type} : ${op.value} </p>`)
                          .join("")}
                      </div>`
                      )
                      .join("")}</td>
                    <td style = "width:10%;text-align:left;">${od.total}</td>
                    <td style = "width:10%;text-align:left;">${
                      od.isPay
                        ? `<span class="inactive">Đã thanh toán</span>`
                        : `<span class="active">Chưa thanh toán</span>`
                    }</td>
                    <td style = "width:10%;text-align:left;">${
                      od.shippingInfo.orderer?.name
                    }</td>
                    <td style = "width:10%;text-align:left;"><span>${
                      od.shippingInfo.address?.detail
                    } , ${od.shippingInfo.address?.ward} , ${
                      od.shippingInfo.address?.district
                    } , ${od.shippingInfo.address?.province}</span></td>
                    <td style = "width:10%;text-align:left;">${
                      od.shippingInfo.orderer.phoneNo
                    }</td>
                    <td style = "width:10%;text-align:left;">${
                      od.orderStatus
                    }</td>
                    <td style = "width:10% ;text-align:right;">
                      <div class="dropdown fw dropdown--edit">
                        <div class="dropdown-button dropdown-button--edit">...</div>
                        <div class="dropdown-content dropdown-content--edit">
                          <div class="dropdown-item edit" data-promotion="${
                            od._id
                          }">Sữa</div>
                          <div class="dropdown-item" data-promotion="${
                            od._id
                          }">Ngưng</div>
                        </div>
                      </div>
                    </td>
              </tr>`
                  )
                  .join("")
              }
            </tbody>
          </table>
        </div>
    </div>`;
  },
};
export default OrderScreen;
