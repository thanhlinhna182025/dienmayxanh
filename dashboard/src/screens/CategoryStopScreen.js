import {
  getAllCategory,
  getOneCategory,
  changeStatusCategory,
} from "../helper/api";
import {
  redirect,
  parseRequestUrl,
  showComFirmMessage,
  toastMessage,
  reRender,
  controlDropdown,
} from "../helper/ultils";

const CategoryStopScreen = {
  after_render: async () => {
    $(async function () {
      controlDropdown();
      const id = $(".title").attr("data-category");
      const category = await getOneCategory(id);
      const subIds = category.subcategories.map((item) => {
        return item._id;
      });
      if (subIds.length > 0) {
        $.each($("input[type=checkbox]"), function (_, item) {
          const flag = subIds.includes($(item).val());
          if (flag) {
            $(item).attr("checked", true);
          }
        });
      }
    });

    // CHuyển hướng
    $.each($(".stop"), function (_, item) {
      $(item).on("click", function () {
        const id = $(item).attr("data-category");
        const hash = `/#/category/${id}/stop`;
        redirect(hash);
      });
    });
    //kích hoạt
    $.each($(".active"), function (_, item) {
      $(item).on("click", function () {
        showComFirmMessage(
          "info",
          "Bạn muốn sử dụng lại hạn mục này ?",
          async function () {
            const id = $(item).attr("data-category");
            const res = await changeStatusCategory(id, {
              isdeleted: false,
            });
            if (res.success) {
              toastMessage({
                type: "success",
                title: "Thành công",
                message: res.message,
                duration: 500,
              });
              reRender(CategoryStopScreen);
            } else {
              toastMessage({
                type: "error",
                title: "Có lỗi",
                message: res.error.message,
                duration: 500,
              });
            }
          }
        );
      });
    });
    $("#cat-btn-stop").on("click", async function (e) {
      e.preventDefault();
      showComFirmMessage(
        "warning",
        `Bạn xác nhận tạm ngừng sử dụng hạng mục này !`,
        async function () {
          const id = $(".title").attr("data-category");
          const res = await changeStatusCategory(id, {
            isdeleted: true,
          });
          if (res.success) {
            toastMessage({
              type: "success",
              title: "Thành công",
              message: res.message,
              duration: 500,
            });
            reRender(CategoryStopScreen);
          } else {
            toastMessage({
              type: "error",
              title: "Có lỗi",
              message: res.error.message,
              duration: 500,
            });
          }
        }
      );
    });
  },
  render: async () => {
    const categories = await getAllCategory();
    const { id } = parseRequestUrl();
    const category = await getOneCategory(id);
    return `
    <div class="container bgc-stop">
        <div class="left flex_1">
            <h2 class="title" data-category="${
              category._id
            }">Tạm Ngừng Hạng Mục ${category.name}</h2>
            <p>Các danh mục hiện tại thuộc hạng mục ${category.name} </p>
            <div class="fw">
                <form class="form__container fw" id="supplier-form">
                    <div class="form__wrapper">
                        <div class="form__group">
                          <h2 class="fw">Danh mục hiện tại</h2>
                          ${
                            category &&
                            category.subcategories
                              .map(
                                (sub) => `<div class="form__group-checkbox">
                            <input class="fw form__input" type="checkbox" name="Subcategory" value="${sub._id}" required/>
                            <label  >${sub.name}</label>
                          </div>`
                              )
                              .join("")
                          }
                        </div>
                    </div>
                    <div class="btn__container fw">
                        <button class="btn fw " id="cat-btn-stop" type="submit" form="supplier-form">Lưu thông tin</button>
                    </div>
                </form> 
            </div> 
        </div>
        <div class="right flex_2">
          <table class="fw table__container">
            <thead>
              <th style = "width:30%;text-align:left;">Tên hạn mục:</th>
              <th style = "width:20%;text-align:left;">Trạng thái:</th>
              <th style = "width:30%;text-align:left;">Danh mục :</th>
              <th style = "width:20% ;text-align:right;">Lựa chọn</th>
            </thead>
            <tbody>
              ${
                categories &&
                categories
                  .map(
                    (cat) => `<tr >
                    <td style = "width:30%;text-align:left;">${cat.name}</td>
                    <td style = "width:20%;text-align:left;">${
                      cat.isdeleted ? `Tạm ngưng` : `Hoạt động`
                    }</td>
                    <td style = "width:30%;text-align:left;">${cat.subcategories
                      .map((s) => `<a class="cat-item">${s.name}</a>`)
                      .join("")}
                    </td>
                    <td style = "width:20% ;text-align:right;">
                      <div class="dropdown fw dropdown--edit">
                        <div class="dropdown-button dropdown-button--edit">...</div>
                        <div class="dropdown-content dropdown-content--edit">
                        ${
                          cat.isdeleted
                            ? `<div class="dropdown-item active" data-category="${cat._id}">Kích hoạt</div>`
                            : `<div class="dropdown-item stop" data-category="${cat._id}">Ngưng</div>`
                        }
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
export default CategoryStopScreen;
