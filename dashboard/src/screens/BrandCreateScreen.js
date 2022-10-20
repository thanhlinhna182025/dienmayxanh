import {
  getAllSupplier,
  getAllSubcategory,
  uploadImageSingle,
  createCategory,
  getAllCategory,
  createBrand,
  getAllBrand,
} from "../helper/api";
import {
  toastMessage,
  reRender,
  redirect,
  updateImageDisplay,
  controlDropdown,
} from "../helper/ultils";

const BrandCreateScreen = {
  after_render: async () => {
    $(function () {
      controlDropdown();
    });
    // Chuyển hướng
    $.each($(".edit"), function (_, item) {
      $(item).on("click", function () {
        const id = $(item).attr("data-brand");
        const hash = `/#/brand/${id}`;
        redirect(hash);
      });
    });
    //Display images
    const previews = document.getElementById("previews");
    $("#input-choice").on("change", function () {
      updateImageDisplay(this, previews);
    });

    $("#brand-btn-create").on("click", async function (e) {
      e.preventDefault();
      if ($("#brand-name").val().length === 0) {
        toastMessage({
          type: "warning",
          title: "Thông báo",
          message: "Tên danh mục không để trống",
          duration: 500,
        });
      }
      const suppliers = [];
      if ($("input[name=supplier]:checked").length > 0) {
        $.each($("input[name=supplier]:checked"), function (_, item) {
          suppliers.push($(item).val());
        });
      }
      const subcategories = [];
      if ($("input[name=Subcategory]:checked").length > 0) {
        $.each($("input[name=Subcategory]:checked"), function (_, item) {
          subcategories.push($(item).val());
        });
      }
      const newBrand = {
        name: $("#brand-name").val(),
        suppliers: suppliers,
        subcategories: subcategories,
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
          newBrand.logo = response.images;
        }
        const res = await createBrand(newBrand);
        if (res.success) {
          toastMessage({
            type: "success",
            title: "Thành công",
            message: res.message,
            duration: 500,
          });
          reRender(BrandCreateScreen);
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
  },
  render: async () => {
    const subcategories = await getAllSubcategory();
    const brands = await getAllBrand();
    const suppliers = await getAllSupplier();
    return `
    <div class="container bgc-create">
        <div class="left flex_1">
            <h2 class="title">Tạo Mới Thương Hiệu</h2>
            <div class="fw">
                <form class="form__container fw" id="supplier-form">
                    <div class="form__wrapper">
                        <div class="form__group-item">
                            <input class="fw form__input" type="text" id="brand-name" required autocomplete="off"/>
                            <label class="label-position" for="brand-name" >Tên thương hiệu:</label>
                        </div>
                        <div class="form__group">
                          <h2 class="fw" id="b-supplier">Lựa chọn nhà cung cấp</h2>
                          ${
                            suppliers &&
                            suppliers
                              .map(
                                (sup) => `<div class="form__group-checkbox">
                            <input class="fw form__input" type="checkbox" name="supplier" value="${sup._id}" required/>
                            <label  >${sup.name}</label>
                          </div>`
                              )
                              .join("")
                          }
                        </div>
                        <div class="form__group">
                          <h2 class="fw">Lựa chọn danh mục:</h2>
                          ${
                            subcategories &&
                            subcategories
                              .map(
                                (sub) => `<div class="form__group-checkbox">
                            <input class="fw form__input" type="checkbox" name="Subcategory" value="${sub._id}"  required/>
                            <label   >${sub.name}</label>
                          </div>`
                              )
                              .join("")
                          }
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
                        <button class="btn fw " id="brand-btn-create" type="submit" form="supplier-form">Lưu thông tin</button>
                    </div>
                </form> 
            </div> 
        </div>
        <div class="right flex_1">
          <table class="fw table__container">
            <thead>
              <th style = "width:40%;text-align:left;">Tên thương hiệu:</th>
              <th style = "width:20% ;text-align:right;">Lựa chọn</th>
            </thead>
            <tbody>
              ${
                brands &&
                brands
                  .map(
                    (brand) => `<tr >
                    <td style = "width:30%;text-align:left;">${brand.name}</td>
                    <td style = "width:20% ;text-align:right;">
                      <div class="dropdown fw dropdown--edit">
                        <div class="dropdown-button dropdown-button--edit">...</div>
                        <div class="dropdown-content dropdown-content--edit">
                          <div class="dropdown-item edit" data-brand="${brand._id}">Sữa</div>
                          <div class="dropdown-item" data-brand="${brand._id}">Ngưng</div>
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
export default BrandCreateScreen;
