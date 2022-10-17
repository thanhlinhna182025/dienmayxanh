import {
  getAllSubcategory,
  uploadImageSingle,
  getAllCategory,
  getOneCategory,
  PF,
  updateCategory,
} from "../helper/api";
import {
  toastMessage,
  reRender,
  redirect,
  updateImageDisplay,
  parseRequestUrl,
  showComFirmMessage,
  controlDropdown,
} from "../helper/ultils";

const CategoryEditScreen = {
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
    $.each($(".edit"), function (_, item) {
      $(item).on("click", function () {
        const id = $(item).attr("data-category");
        const hash = `/#/category/${id}`;
        redirect(hash);
      });
    });
    //Display images
    const previews = document.getElementById("previews");
    $("#input-choice").on("change", function () {
      updateImageDisplay(this, previews);
    });

    $("#cat-btn-edit").on("click", async function (e) {
      e.preventDefault();
      if ($("#cat-name").val().length === 0) {
        toastMessage({
          type: "warning",
          title: "Thông báo",
          message: "Tên hạng mục không để trống",
          duration: 500,
        });
      }
      const subcats = [];
      if ($("input[name=Subcategory]:checked").length > 0) {
        $.each($("input[name=Subcategory]:checked"), function (_, item) {
          subcats.push($(item).val());
        });
      }
      const update = { name: $("#cat-name").val(), subcategories: subcats };
      //upload image
      const files = $("#input-choice")[0].files;
      const imgForm = new FormData();
      for (let file of files) {
        imgForm.append("file", file);
      }
      if (imgForm.has("file")) {
        const response = await uploadImageSingle(imgForm);
        if (response.success) {
          update.icon = response.images;
        }
      }
      const id = $(".title").attr("data-category");
      const res = await updateCategory(id, update);
      if (res.success) {
        toastMessage({
          type: "success",
          title: "Thành công",
          message: res.message,
          duration: 500,
        });
        reRender(CategoryEditScreen);
      } else {
        toastMessage({
          type: "error",
          title: "Thất bại",
          message: res.error.message,
          duration: 500,
        });
      }
    });
    $.each($(".stop"), function (_, item) {
      $(item).on("click", function () {
        showComFirmMessage(
          "warning",
          "Bạn muốn ngừng sử dụng hạng mục này",
          function () {
            const id = $(item).attr("data-category");
            const hash = `/#/category/${id}/stop`;
            redirect(hash);
          }
        );
      });
    });
  },
  render: async () => {
    const categories = await getAllCategory();
    const subcategories = await getAllSubcategory();
    const { id } = parseRequestUrl();
    const category = await getOneCategory(id);
    return `
    <div class="container bgc-edit">
        <div class="left flex_1">
            <h2 class="title" data-category="${
              category._id
            }">Cập Nhật Hạng Mục ${category.name}</h2>
            <div class="fw">
                <form class="form__container fw" id="supplier-form">
                    <div class="form__wrapper">
                        <div class="form__group-item">
                            <input class="fw form__input" type="text" id="cat-name" required value="${
                              category?.name
                            }"/>
                            <label class="label-position" for="cat-name" >Tên hạng mục:</label>
                        </div>
                        <div class="form__group">
                        <h2 class="fw">Lựa chọn danh mục</h2>
                          ${
                            subcategories &&
                            subcategories
                              .map(
                                (sub) => `<div class="form__group-checkbox">
                            <input class="fw form__input" type="checkbox" name="Subcategory" value="${sub._id}" required/>
                            <label  >${sub.name}</label>
                          </div>`
                              )
                              .join("")
                          }
                        </div>
                        <div class="form__group-images">
                          <div class="image_container">
                            <img src="${PF}${category.icon}"/>
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
                        <button class="btn fw " id="cat-btn-edit" type="submit" form="supplier-form">Lưu thông tin</button>
                    </div>
                </form> 
            </div> 
        </div>
        <div class="right flex_1">
          <table class="fw table__container">
            <thead>
              <th style = "width:40%;text-align:left;">Tên hạng mục:</th>
              <th style = "width:40%;text-align:left;">Danh mục :</th>
              <th style = "width:20% ;text-align:right;">Lựa chọn</th>
            </thead>
            <tbody>
              ${
                categories &&
                categories
                  .map(
                    (cat) => `<tr >
                    <td style = "width:40%;text-align:left;">${cat.name}</td>
                    <td style = "width:40%;text-align:left;">${cat.subcategories
                      .map((s) => `<a class="cat-item">${s.name}</a>`)
                      .join("")}
                    </td>
                    <td style = "width:20% ;text-align:right;">
                      <div class="dropdown fw dropdown--edit">
                        <div class="dropdown-button dropdown-button--edit">...</div>
                        <div class="dropdown-content dropdown-content--edit">
                          <div class="dropdown-item edit" data-category="${
                            cat._id
                          }">Sữa</div>
                          <div class="dropdown-item stop" data-category="${
                            cat._id
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
export default CategoryEditScreen;
