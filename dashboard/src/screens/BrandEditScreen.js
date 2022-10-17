import {
  getAllSupplier,
  uploadImageSingle,
  getAllBrand,
  getOneBrand,
  PF,
  updateBrand,
  getAllSubcategory,
} from "../helper/api";
import {
  toastMessage,
  reRender,
  redirect,
  updateImageDisplay,
  parseRequestUrl,
  controlDropdown,
} from "../helper/ultils";

const BrandEditScreen = {
  after_render: async () => {
    //Checked box
    $(async function () {
      const id = $(".title").attr("data-brand");
      const brand = await getOneBrand(id);
      const supplierIds = brand.suppliers;
      $.each($("input[name=supplier]"), function (_, item) {
        const flag = supplierIds.includes($(item).val());
        if (flag) {
          $(item).attr("checked", true);
        }
      });
      const subcategoriesIds = brand.subcategories;
      $.each($("input[name=subcategory]"), function (_, item) {
        const flag = subcategoriesIds.includes($(item).val());
        if (flag) {
          $(item).attr("checked", true);
        }
      });
      controlDropdown();
    });

    // CHuyển hướng
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

    $("#brand-btn-edit").on("click", async function (e) {
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
      if ($("input[name=subcategory]:checked").length > 0) {
        $.each($("input[name=subcategory]:checked"), function (_, item) {
          subcategories.push($(item).val());
        });
      }
      const update = {
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
          update.logo = response.images;
        }
      }
      const id = $(".title").attr("data-brand");
      const res = await updateBrand(id, update);
      if (res.success) {
        toastMessage({
          type: "success",
          title: "Thành công",
          message: res.message,
          duration: 500,
        });
        reRender(BrandEditScreen);
      } else {
        toastMessage({
          type: "error",
          title: "Thất bại",
          message: res.error.message,
          duration: 500,
        });
      }
    });
  },
  render: async () => {
    const brands = await getAllBrand();

    const suppliers = await getAllSupplier();
    const { id } = parseRequestUrl();
    const brand = await getOneBrand(id);
    console.log(brand);
    const subcategories = await getAllSubcategory();
    return `
    <div class="container bgc-edit">
        <div class="left flex_1">
            <h2 class="title" data-brand="${brand._id}">Cập Nhật Thương Hiệu ${
      brand.name
    }</h2>
            <div class="fw">
                <form class="form__container fw" id="supplier-form">
                    <div class="form__wrapper">
                        <div class="form__group-item">
                            <input class="fw form__input" type="text" id="brand-name" required value="${
                              brand.name
                            }"/>
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
                            <input class="fw form__input" type="checkbox" name="subcategory" value="${sub._id}"  required/>
                            <label   >${sub.name}</label>
                          </div>`
                              )
                              .join("")
                          }
                        </div>
                        <div class="form__group-images">
                          <div class="image_container">
                            <img src="${PF}${brand?.logo}" alt="${brand.name}"/>
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
                        <button class="btn fw " id="brand-btn-edit" type="submit" form="supplier-form">Lưu thông tin</button>
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
export default BrandEditScreen;
