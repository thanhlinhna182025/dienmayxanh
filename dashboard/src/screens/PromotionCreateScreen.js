import {
  createPromotion,
  uploadImageSingle,
  getAllPromotion,
} from "../helper/api";
import {
  toastMessage,
  reRender,
  redirect,
  updateImageDisplay,
  controlDropdown,
} from "../helper/ultils";

const PromotionCreateScreen = {
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

    $("#pr-discount").on({
      focus: function () {
        $("#pr-discount-label").css(tyle2);
      },
      blur: function () {
        $("#pr-discount-label").css(tyle1);
        if ($(this).val().length) {
          $("#pr-discount-label").css(tyle2);
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

    $("#pr-btn-create").on("click", async function (e) {
      e.preventDefault();
      const newPromotion = {
        name: $("#pr-name").val(),
        description: $("#pr-description").val(),
        detail: {
          discount: Number($("#pr-discount").val()),
          freeship: $("input[type=radio]:checked").val() === "1" ? true : false,
          gift: $("#pr-gift").val(),
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
        reRender(PromotionCreateScreen);
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
    const promotions = await getAllPromotion();
    return `
    <div class="container bgc-create">
        <div class="left flex_1">
            <h2 class="title">Tạo Mới Chương Trình Khuyễn Mãi</h2>
            <div class="fw">
                <form class="form__container fw" id="supplier-form">
                    <div class="form__wrapper">
                        <div class="form__group-item">
                            <input class="fw form__input" type="text" id="pr-name" required autocomplete="off"/>
                            <label class="label-position" for="pr-name" >Tên chương trình:</label>
                        </div>
                        <div class="form__group-item">
                            <input class="fw form__input" type="number"  id="pr-discount" required autocomplete="off"/>
                            <label class="label-position" for="pr-discount" id="pr-discount-label">% Khuyến mãi</label>
                        </div>
                        <div class="form__group-item">
                            <textarea placeholder="Quà tặng kèm nếu có:" class="form__textarea" id="pr-gift"></textarea>
                        </div>
                        <div class="form__group-item">
                            <textarea placeholder="Mô tả chi tiết:" class="form__textarea" id="pr-description"></textarea>
                        </div>
                        <div class="form__group">
                          <h2>Miễn phí vận chuyển:</h2>
                          <div class="form__group-item">
                            <input type="radio" name="freeship" value="1"/>
                            <label>Có</label>
                          </div>
                          <div class="form__group-item">
                            <input type="radio" name="freeship" value="0"/>
                            <label>Không</label>
                          </div>
                        </div>
                    </div>
                    <div class="form__group">
                        <div class="choice__container">
                            <label class="flex_1">Lựa chọn hình ảnh
                                <img src="../assets/images/iconaddimage.png" class="images__choice"/>
                                <input type="file" id="input-choice" class="input__choice" />
                            </label>
                            <div class="flex_2 previews" id="previews">
                                <p>Chưa có ảnh nào được lựa chọn</p>
                            </div>
                        </div>
                    </div>
                    <div class="btn__container fw">
                        <button class="btn fw " id="pr-btn-create" type="submit" form="supplier-form">Lưu thông tin</button>
                    </div>
                </form> 
            </div> 
        </div>
        <div class="right flex_1">
          <table class="fw table__container">
            <thead>
              <th style = "width:30%;text-align:left;">Chương trình:</th>
              <th style = "width:15%;text-align:left;">Giảm giá:</th>
              <th style = "width:20%;text-align:left;">Phí vận chuyển:</th>
              <th style = "width:15%;text-align:left;">Trạng thái:</th>
              <th style = "width:20% ;text-align:right;">Lựa chọn</th>
            </thead>
            <tbody>
              ${
                promotions &&
                promotions
                  .map(
                    (pr) => `<tr >
                    <td style = "width:30%;text-align:left;">${pr.name}</td>
                    <td style = "width:15%;text-align:left;">${
                      pr.detail?.discount
                    }%</td>
                    <td style = "width:20%;text-align:left;">${
                      pr.detail?.freeship
                        ? `<span>Miễn phí</span>`
                        : `<span>Có</span>`
                    }</td>
                    <td style = "width:15%;text-align:left;">${
                      pr.isdeleted
                        ? `<span class="inactive">Không hoạt động</span>`
                        : `<span class="active">Hoạt động</span>`
                    }</td>
                    <td style = "width:20% ;text-align:right;">
                      <div class="dropdown fw dropdown--edit">
                        <div class="dropdown-button dropdown-button--edit">...</div>
                        <div class="dropdown-content dropdown-content--edit">
                          <div class="dropdown-item edit" data-promotion="${
                            pr._id
                          }">Sữa</div>
                          <div class="dropdown-item" data-promotion="${
                            pr._id
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
export default PromotionCreateScreen;
