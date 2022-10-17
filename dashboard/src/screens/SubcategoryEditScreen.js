import {
  getAllSubcategory,
  uploadImageSingle,
  getAllCategory,
  getOneSubcategory,
  PF,
  updateSubcategory,
} from "../helper/api";
import {
  toastMessage,
  reRender,
  redirect,
  updateImageDisplay,
  parseRequestUrl,
  controlDropdown,
} from "../helper/ultils";

const SubcategoryEditScreen = {
  after_render: async () => {
    $(async function () {
      const id = $(".title").attr("data-sub");
      const Subcategory = await getOneSubcategory(id);
      const catIds = Subcategory.categories;
      $.each($("input[name=category]"), function (_, item) {
        const flag = catIds.includes($(item).val());
        if (flag) {
          $(item).attr("checked", true);
        }
      });
      controlDropdown();
    });
    // CHuyển hướng
    $.each($(".edit"), function (_, item) {
      $(item).on("click", function () {
        const id = $(item).attr("data-Subcategory");
        const hash = `/#/Subcategory/${id}`;
        redirect(hash);
      });
    });
    //Display images
    const previews = document.getElementById("previews");
    $("#input-choice").on("change", function () {
      updateImageDisplay(this, previews);
    });

    $("#sub-btn-create").on("click", async function (e) {
      e.preventDefault();
      if ($("#sub-name").val().length === 0) {
        toastMessage({
          type: "warning",
          title: "Thông báo",
          message: "Tên danh mục không để trống",
          duration: 500,
        });
      }
      const cats = [];
      if ($("input[name=category]:checked").length > 0) {
        $.each($("input[name=category]:checked"), function (_, item) {
          cats.push($(item).val());
        });
      }
      const update = { name: $("#sub-name").val(), categories: cats };
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
      const id = $(".title").attr("data-sub");
      const res = await updateSubcategory(id, update);
      if (res.success) {
        toastMessage({
          type: "success",
          title: "Thành công",
          message: res.message,
          duration: 500,
        });
        reRender(SubcategoryEditScreen);
      } else {
        toastMessage({
          type: "error",
          title: "Thành công",
          message: res.error.message,
          duration: 500,
        });
      }
    });
  },
  render: async () => {
    const categories = await getAllCategory();
    const subcategories = await getAllSubcategory();
    const { id } = parseRequestUrl();
    const Subcategory = await getOneSubcategory(id);

    return `
    <div class="container bgc-edit">
        <div class="left flex_1">
            <h2 class="title" data-sub="${Subcategory._id}">Cập Nhật Danh Mục ${
      Subcategory.name
    }</h2>
            <div class="fw">
                <form class="form__container fw" id="supplier-form">
                    <div class="form__wrapper">
                        <div class="form__group-item">
                            <input class="fw form__input" type="text" id="sub-name" value="${
                              Subcategory.name
                            }" required/>
                            <label class="label-position" for="sub-name" >Tên danh mục:</label>
                        </div>
                        <div class="form__group">
                          <h2 class="fw">Lựa chọn lại hạng mục</h2>
                            ${
                              categories &&
                              categories
                                .map(
                                  (cat) => `<div class="form__group-checkbox">
                              <input  class="form__input" type="checkbox" name="category" value="${cat._id}" required/>
                              <label  >${cat.name}</label>
                            </div>`
                                )
                                .join("")
                            }
                        </div>
                        <div class="form__group-images">
                          <div class="image_container">
                            <img src="${PF}${Subcategory.icon}"/>
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
                        <button class="btn fw " id="sub-btn-create" type="submit" form="supplier-form">Lưu thông tin</button>
                    </div>
                </form> 
            </div> 
        </div>
        <div class="right flex_1">
          <table class="fw table__container">
            <thead>
              <th style = "width:40%;text-align:left;">Danh mục:</th>
              <th style = "width:20% ;text-align:right;">Lựa chọn</th>
            </thead>
            <tbody>
              ${
                subcategories &&
                subcategories
                  .map(
                    (sub) => `<tr >
                    <td style = "width:30%;text-align:left;">${sub.name}</td>
                    <td style = "width:20% ;text-align:right;">
                      <div class="dropdown fw dropdown--edit">
                        <div class="dropdown-button dropdown-button--edit">...</div>
                        <div class="dropdown-content dropdown-content--edit">
                          <div class="dropdown-item edit" data-Subcategory="${sub._id}">Sữa</div>
                          <div class="dropdown-item" data-Subcategory="${sub._id}">Ngưng</div>
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
export default SubcategoryEditScreen;
