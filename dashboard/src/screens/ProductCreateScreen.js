import {
  getAllBrand,
  getAllSubcategory,
  getAllPromotion,
  createProduct,
  uploadImageMultiple,
  uploadImageSingle,
  getAllSupplier,
  updateProduct,
} from "../helper/api";
import {
  toastMessage,
  reRender,
  redirect,
  formatCurrency,
  updateImageDisplay,
} from "../helper/ultils";
import { getOptions, setOptions } from "../helper/localstorage";

const ProductCreateScreen = {
  after_render: async () => {
    $(function () {
      setOptions([]);
    });
    //Preview images
    const preview = document.getElementById("preview");
    $("#input-choice").on("change", function () {
      updateImageDisplay(this, preview);
    });
    const previews = document.getElementById("previews");
    $("#input-choices").on("change", function () {
      updateImageDisplay(this, previews);
    });
    // dropdown
    $.each($(".dropdown-button"), function (_, btn) {
      $(btn).on({
        click: function () {
          const _this = $(btn);
          _this.parent().toggleClass("dropdown--active");
          $.each($(".dropdown-button").not(_this), function (_, notthis) {
            $(notthis).parent().removeClass("dropdown--active");
          });
        },
      });
    });
    $.each($(".dropdown-content"), function (_, item) {
      $(item).on("mouseleave", function () {
        $(item).parent().removeClass("dropdown--active");
      });
    });
    // CHuyển hướng
    $.each($(".edit"), function (_, item) {
      $(item).on("click", function () {
        const id = $(item).attr("data-product");
        const hash = `/#/product/${id}`;
        redirect(hash);
      });
    });
    //Format input type= currency
    $.each($("input[data-type=currency]"), function (_, item) {
      $(item).on({
        keyup: function () {
          formatCurrency($(item));
          if ($(item).val().length > 0) {
            $(item).siblings().addClass("label-position--0");
          } else {
            $(item).siblings().removeClass("label-position--0");
          }
        },
        blur: function () {
          formatCurrency($(this), "blur");
        },
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

    $("#p-countInstock").on({
      focus: function () {
        $("#p-countInstock-label").css(tyle2);
      },
      blur: function () {
        $("#p-countInstock-label").css(tyle1);
        if ($(this).val().length) {
          $("#p-countInstock-label").css(tyle2);
        }
        if ($(this).val() > 100 || $(this).val() < 0) {
          $(this).css("border-color", "red");
        } else {
          $(this).css("border-color", "#ccc");
        }
      },
    });
    //Togge options
    $.each($("input[name=typeOption]"), function (_, item) {
      const _this = $(item);
      _this.on({
        click: function () {
          switch (_this.val()) {
            case "color":
              $("#colorContainer").css("display", "block");
              $("div[data-type=option-selected]")
                .not("#colorContainer")
                .css("display", "none");
              break;
            case "memory":
              $("#memoryContainer").css("display", "block");
              $("div[data-type=option-selected]")
                .not("#memoryContainer")
                .css("display", "none");
              break;
            case "horsepower":
              $("#horsepowerContainer").css("display", "block");
              $("div[data-type=option-selected]")
                .not("#horsepowerContainer")
                .css("display", "none");
              break;
            case "volume":
              $("#volumeContainer").css("display", "block");
              $("div[data-type=option-selected]")
                .not("#volumeContainer")
                .css("display", "none");
              break;
            case "tankage":
              $("#tankageContainer").css("display", "block");
              $("div[data-type=option-selected]")
                .not("#tankageContainer")
                .css("display", "none");
              break;
            default:
              break;
          }
        },
        change: function () {
          $.each($("input[data-type=type]"), function (_, item) {
            $(item).prop("checked", false);
          });
        },
      });
    });
    //
    $("#btn-create-option").on("click", function () {
      const option = {
        type: $("input[data-type=type]:checked").attr("name"),
        option: $("input[data-type=type]:checked").val(),
        plus: parseInt($("#plus").val().replaceAll(",", "")),
      };

      let options = getOptions();
      setOptions([...options, option]);
      const newOptions = getOptions();
      console.log(newOptions);

      const html = `${newOptions
        .map(
          (item) => `
      <div class="detail__item">
        <i class="fa-solid fa-xmark"></i>
        <span>Tùy chọn:${item.type}</span>
        <span>Giá trị:${item.option}</span>
        <span>Giá tiền:${item.plus}</span>
      </div>`
        )
        .join("")}`;
      $("#previewOption").html(html);
      $.each($(".fa-xmark"), function (index, item) {
        $(item).on("click", function () {
          const items = getOptions();
          $(item).parent().remove();
          const newOptions = items.filter(function (value, i) {
            return i !== index;
          });
          setOptions([...newOptions]);
        });
      });
    });

    $("#p-btn-create").on("click", async function (e) {
      e.preventDefault();
      const options = getOptions();
      const newProduct = {
        name: $("#p-name").val(),
        price: parseInt($("#p-price").val().replaceAll(",", "")),
        countInstock: parseInt($("#p-countInstock").val()),
        description: $("#p-discription").val(),
        brand: $("input[name=brand]:checked").val(),
        subcategory: $("input[name=subcategory]:checked").val(),
        promotion: $("input[name=promotion]:checked").val(),
        supplier: $("input[name=supplier]:checked").val(),
        options: options,
      };

      console.log(newProduct);
      const imageForm = new FormData();
      const fileImage = $("#input-choice")[0].files;
      for (let file of fileImage) {
        imageForm.append("file", file);
      }
      const response = await uploadImageSingle(imageForm);
      if (response.success) {
        newProduct.image = response.images;
        const res = await createProduct(newProduct);
        if (res.success) {
          const fileImages = $("#input-choices")[0].files;
          const imagesForm = new FormData();
          for (let file of fileImages) {
            imagesForm.append("files", file);
          }
          const id = res.product._id;
          if (imagesForm.has("files")) {
            const responses = await uploadImageMultiple(imagesForm);
            if (response.success) {
              newProduct.images = responses.images;
              const res = await updateProduct(id, newProduct);
              if (res.success) {
                toastMessage({
                  type: "success",
                  title: "Thành Công",
                  message: "Đã tạo thành công",
                  duration: 500,
                });
                reRender(ProductCreateScreen);
              } else {
                toastMessage({
                  type: "error",
                  title: "Thất bại",
                  message: res.error.message,
                  duration: 500,
                });
              }
            }
          }
        } else {
          toastMessage({
            type: "error",
            title: "Thất bại",
            message: res.error.message,
            duration: 500,
          });
        }
      }
    });
  },
  render: async () => {
    const brands = await getAllBrand();
    const subcategories = await getAllSubcategory();
    const promotions = await getAllPromotion();
    const suppliers = await getAllSupplier();
    const colors = ["Black", "White", "Gold", "Blue", "Silver", "Pink"];
    const memory = [
      "4GB",
      "8GB",
      "16GB",
      "32GB",
      "64GB",
      "128GB",
      "256GB",
      "512GB",
      "1TB",
    ];
    const horsepower = ["1HP", "1.5HP", "2HP", "2.5HP", "3HP"];
    const volume = ["1L", "1.5L", "2L", "2.5L", "3L"];
    const tankage = ["100L", "125L", "150L", "200L", "250L"];

    return `
    <div class="container bgc-create">
        <div class="left flex_1">
            <h2 class="title">Tạo Sản Phẩm Mới</h2>
            <div class="fw">
                <form class="form__container fw" id="supplier-form">
                    <div class="form__wrapper">
                      <div class="form__group-radio">
                          <h2>Chọn Thương Hiệu</h2>
                          ${
                            brands &&
                            brands
                              .map(
                                (b) => `
                          <div class="form__group-item">
                            <input type="radio" name="brand" value="${b._id}"/>
                            <label>${b.name}</label>
                          </div>`
                              )
                              .join("")
                          }
                      </div>
                      <div class="form__group-radio">
                          <h2>Chọn Nhà Cung Cấp</h2>
                          ${
                            suppliers &&
                            suppliers
                              .map(
                                (sup) => `
                          <div class="form__group-item">
                            <input type="radio" name="supplier" value="${sup._id}"/>
                            <label>${sup.name}</label>
                          </div>`
                              )
                              .join("")
                          }
                      </div>
                      <div class="form__group-radio">
                          <h2>Chọn Danh Mục</h2>
                          ${
                            subcategories &&
                            subcategories
                              .map(
                                (s) => `
                          <div class="form__group-item">
                            <input type="radio" name="subcategory" value="${s._id}" data="${s.name}"/>
                            <label>${s.name}</label>
                          </div>`
                              )
                              .join("")
                          }
                      </div>
                      
                      <div class="form__group nowrap">
                          <div class="form__group-item">
                              <input class="fw form__input" type="text" id="p-name" required autocomplete="off"/>
                              <label class="label-position" for="p-name" >Tên sản phẩm:</label>
                          </div>
                          <div class="form__group-item">
                              <input class="fw form__input" data-type="currency"  id="p-price" required autocomplete="off"/>
                              <label class="label-position" for="p-price" id="p-price-label">Giá sản phẩm:</label>
                          </div>
                          <div class="form__group-item">
                              <input class="fw form__input" type="text" id="p-countInstock" required autocomplete="off"/>
                              <label class="label-position" for="p-countInstock" id="p-countInstock-label" >Số lượng tồn kho(0-100):</label>
                          </div>
                        </div>
                        <div class="form__group nowrap">
                          <h2>Lựa Chọn Các Tùy Chọn Sản Phẩm</h2>
                          <div>
                            <input type="radio" name="typeOption" value="color" id ="color"/>
                            <label>Color</label>
                          </div>
                          <div>
                            <input type="radio" name="typeOption" value="memory"id ="memory"/>
                            <label>Memory</label>
                          </div>
                          <div>
                            <input type="radio" name="typeOption" value="horsepower" id ="horsepower"/>
                            <label>Horsepower</label>
                          </div>
                          <div>
                            <input type="radio" name="typeOption" value="volume" id ="volume"/>
                            <label>Volume</label>
                          </div>
                          <div>
                            <input type="radio" name="typeOption" value="tankage" id ="tankage"/>
                            <label>Tankage</label>
                          </div>
                      </div>
                        <div class="form__group nowrap">
                          <div class="flex_1">
                            <div class="form__group flex_col color__container" data-type="option-selected" id="colorContainer">
                              <h2>Chọn Màu Sắc</h2>
                              <div class="form__group flex_row">
                                ${colors
                                  .map(
                                    (c) => `
                              <div class="form__group-checkbox">
                                <input type="radio" value="${c}" data-type="type" name="color"/>
                                <label>${c}</label>
                              </div>
                              `
                                  )
                                  .join("")}
                              </div>
                            </div>
                            <div class="form__group flex_col memory__container" data-type="option-selected"  id="memoryContainer">
                              <h2>Chọn Dung Lượng Bộ Nhớ</h2>
                              <div class="form__group flex_row">
                                ${memory
                                  .map(
                                    (m) => `
                              <div class="form__group-checkbox">
                                <input type="radio" value="${m}" data-type="type" name="memory"/>
                                <label>${m}</label>
                              </div>
                              `
                                  )
                                  .join("")}
                              </div>
                            </div>
                            <div class="form__group flex_col horsepower__container" data-type="option-selected" id="horsepowerContainer">
                              <h2>Chọn Công Suất</h2>
                              <div class="form__group flex_row">
                                ${horsepower
                                  .map(
                                    (h) => `
                              <div class="form__group-checkbox">
                                <input type="radio" value="${h}" data-type="type" name="horsepower"/>
                                <label>${h}</label>
                              </div>
                              `
                                  )
                                  .join("")}
                              </div>
                            </div>
                            <div class="form__group flex_col volume__container"data-type="option-selected"id="volumeContainer">
                              <h2>Chọn Dung Tích</h2>
                              <div class="form__group flex_row">
                                ${volume
                                  .map(
                                    (v) => `
                              <div class="form__group-checkbox">
                                <input type="radio" value="${v}" data-type="type" name="volume"/>
                                <label>${v}</label>
                              </div>
                              `
                                  )
                                  .join("")}
                              </div>
                            </div>
                            <div class="form__group flex_col tankage__container"data-type="option-selected"id="tankageContainer">
                              <h2>Chọn ThểTích</h2>
                              <div class="form__group flex_row">
                                ${tankage
                                  .map(
                                    (t) => `
                              <div class="form__group-checkbox">
                                <input type="radio" value="${t}" data-type="type" name="tankage"/>
                                <label>${t}</label>
                              </div>
                              `
                                  )
                                  .join("")}
                              </div>
                            </div>
                            <div class="form__group nowrap">
                              <div class="form__group-item">
                                <input class="fw form__input" id="plus" autocomplete="off" data-type="currency" required/>
                                <label class="label-position" for="plus">Gía tăng thêm :</label>
                              </div>
                            </div>
                            <div class="btn" id="btn-create-option">Xác Nhận</div>
                          </div>
                          <div class="flex_1 preview__container" >
                              <h2 >Xem trước</h2>
                              <div id="previewOption" class="preview__option"></div>
                          </div>
                        </div>
                        <div class="form__group-item">
                            <textarea placeholder="Miêu tả sản phẩm:" class="form__textarea" id="p-discription"></textarea>
                        </div>
                        <div class="form__group-radio">
                          <h2>Chọn Khuyễn Mãi Áp Dụng</h2>
                          ${
                            promotions &&
                            promotions
                              .map(
                                (pr) => `
                          <div class="form__group-item">
                            <input type="radio" name="promotion" value="${pr._id}"/>
                            <label>${pr.name}</label>
                          </div>`
                              )
                              .join("")
                          }
                        </div>
                    </div>
                    <div class="form__group">
                        <div class="choice__container">
                            <label class="flex_1">Lựa chọn hình ảnh trưng bày
                                <img src="../assets/images/iconaddimage.png" class="images__choice"/>
                                <input type="file" id="input-choice" class="input__choice"/>
                            </label>
                            <div class="flex_2 previews" id="preview">
                                <p>Chưa có ảnh nào được lựa chọn</p>
                            </div>
                        </div>
                    </div>
                    <div class="form__group">
                        <div class="choice__container">
                            <label class="flex_1">Lựa chọn hình ảnh chi tiết
                                <img src="../assets/images/iconaddimage.png" class="images__choice"/>
                                <input type="file" id="input-choices" class="input__choice" multiple/>
                            </label>
                            <div class="flex_2 previews" id="previews">
                                <p>Chưa có ảnh nào được lựa chọn</p>
                            </div>
                        </div>
                    </div>
                    <div class="btn__container fw">
                        <button class="btn fw " id="p-btn-create" type="submit" form="supplier-form">Lưu thông tin</button>
                    </div>
                </form> 
            </div> 
        </div>
    </div>`;
  },
};
export default ProductCreateScreen;
