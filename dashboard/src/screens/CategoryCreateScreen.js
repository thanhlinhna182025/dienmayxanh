import {
  getAllSubcategory,
  uploadImageSingle,
  createCategory,
  getAllCategory,
} from "../helper/api";
import {
  toastMessage,
  reRender,
  redirect,
  updateImageDisplay,
  controlDropdown,
} from "../helper/ultils";

const CategoryCreateScreen = {
  after_render: async () => {
    $(function () {
      controlDropdown();
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

    $("#cat-btn-create").on("click", async function (e) {
      e.preventDefault();
      if ($("#cat-name").val().length === 0) {
        toastMessage({
          type: "warning",
          title: "Thông báo",
          message: "Tên hạng mục không để trống",
          duration: 500,
        });
      }
      const newCategory = {
        name: $("#cat-name").val(),
      };
      //upload image
      const files = $("#input-choice")[0].files;
      const imgForm = new FormData();
      for (let file of files) {
        imgForm.append("file", file);
      }
      if (imgForm.has("file")) {
        const response = await uploadImageSingle(imgForm);
        if (response.success) {
          newCategory.icon = response.images;
        }
        const res = await createCategory(newCategory);
        if (res.success) {
          toastMessage({
            type: "success",
            title: "Thành công",
            message: res.message,
            duration: 500,
          });
          reRender(CategoryCreateScreen);
        } else {
          toastMessage({
            type: "error",
            title: "Thành công",
            message: res.error.message,
            duration: 500,
          });
        }
      }
    });
    //Stop
  },
  render: async () => {
    const categories = await getAllCategory();
    const subcategories = await getAllSubcategory();

    return `
    <div class="container bgc-create">
        <div class="left flex_1">
            <h2 class="title">Tạo Mới Hạng Mục</h2>
            <div class="fw">
                <form class="form__container fw" id="supplier-form">
                    <div class="form__wrapper">
                        <div class="form__group-item">
                            <input class="fw form__input" type="text" id="cat-name" required/>
                            <label class="label-position" for="cat-name" >Tên hạng mục:</label>
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
                        <button class="btn fw " id="cat-btn-create" type="submit" form="supplier-form">Lưu thông tin</button>
                    </div>
                </form> 
            </div> 
        </div>
        <div class="right flex_1">
          <table class="fw table__container">
            <thead>
              <th style = "width:40%;text-align:left;">Tên hạng mục:</th>
              <th style = "width:40%;text-align:left;">Danh mục:</th>
              <th style = "width:20% ;text-align:right;">Lựa chọn</th>
            </thead>
            <tbody>
              ${
                categories &&
                categories
                  .map(
                    (cat) => `<tr >
                    <td style = "width:30%;text-align:left;">${cat.name}</td>
                    <td style = "width:30%;text-align:left;">${cat.subcategories
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
export default CategoryCreateScreen;
