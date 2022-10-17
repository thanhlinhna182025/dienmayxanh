import { getAllProduct } from "../helper/api";
import {
  redirect,
  sortTable,
  updateBodyTable,
  controlDropdown,
  updatePagination,
} from "../helper/ultils";

const ProductScreen = {
  after_render: async () => {
    $(async function () {
      //Dropdown
      $($(".pagination .pageItem")[0]).addClass("active");
      controlDropdown();
    });
    // Sort Table:
    $("#name").on("click", function () {
      sortTable(0);
    });
    $("#brand").on("click", function () {
      sortTable(0);
    });
    $("#promotion").on("click", function () {
      sortTable(0);
    });
    $("#price").on("click", function () {
      sortTable(0);
    });
    $("#countInstock").on("click", function () {
      sortTable(0);
    });
    $("#Subcategory").on("click", function () {
      sortTable(0);
    });
    // search
    $("#search").on("click", async function () {
      const search = $("#input__search").val();
      const { pages, products } = await getAllProduct(search);
      updateBodyTable(products);
      updatePagination(pages);
      $.each($(".pagination .pageItem"), async function (_, item) {
        $($(".pagination .pageItem")[0]).addClass("active");
        $(item).on("click", async function (event) {
          event.preventDefault();
          const _this = $(item);
          $(_this).addClass("active");
          $.each($(".pagination a"), function (_, notthis) {
            $(notthis).not($(_this)).removeClass("active");
          });
          const page = parseInt(_this.attr("page"));
          const { products } = await getAllProduct(search, page);
          updateBodyTable(products);
        });
      });
      $("#next").on("click", async function () {
        const page = $(".pagination .active");
        const current = parseInt($(page).attr("page"));
        const next = $(page).next();
        if (current < $(".pagination .pageItem").length) {
          $(next).addClass("active");
          $(page).removeClass("active");
          const n = parseInt($(next).attr("page"));
          const { products } = await getAllProduct(search, n);
          updateBodyTable(products);
        }
      });
      $("#pre").on("click", async function () {
        const page = $(".pagination .active");
        const current = parseInt($(page).attr("page"));
        const prev = $(page).prev();
        if (current > 1) {
          $(prev).addClass("active");
          $(page).removeClass("active");
          const n = parseInt($(prev).attr("page"));
          const { products } = await getAllProduct(search, n);
          updateBodyTable(products);
        }
      });
    });

    //Pagination no search
    $.each($(".pagination .pageItem"), async function (_, item) {
      $(item).on("click", async function (event) {
        event.preventDefault();
        const _this = $(item);
        $(_this).addClass("active");
        $.each($(".pagination a"), function (_, notthis) {
          $(notthis).not($(_this)).removeClass("active");
        });
        const page = parseInt(_this.attr("page"));
        const { products } = await getAllProduct("", page, 5);
        updateBodyTable(products);
      });
    });
    $("#next").on("click", async function () {
      const page = $(".pagination .active");
      const current = parseInt($(page).attr("page"));
      const next = $(page).next();
      if (current < $(".pagination .pageItem").length) {
        $(next).addClass("active");
        $(page).removeClass("active");
        const n = parseInt($(next).attr("page"));
        const { products } = await getAllProduct("", n, 5);
        updateBodyTable(products);
      }
    });
    $("#pre").on("click", async function () {
      const page = $(".pagination .active");
      const current = parseInt($(page).attr("page"));
      const prev = $(page).prev();
      if (current > 1) {
        $(prev).addClass("active");
        $(page).removeClass("active");
        const n = parseInt($(prev).attr("page"));
        const { products } = await getAllProduct("", n, 5);
        updateBodyTable(products);
      }
    });
    // CHuyển hướng
    $.each($(".edit"), function (_, item) {
      $(item).on("click", function () {
        const id = $(item).attr("data-product");
        const hash = `/#/product/${id}`;
        redirect(hash);
      });
    });
  },
  render: async () => {
    const { pages, products } = await getAllProduct();
    const pagination = Array.from({ length: pages }, (_, i) => i + 1);
    return `
    <div class="container bgc-info">
        <div class="top">
            <a class="btn" href="/#/product-create">Tạo Sản Phẩm Mới</a>
            <div class="search__container">
              <input id="input__search"/>
              <i class="fa-solid fa-magnifying-glass" id="search"></i>
            </div>
        </div>
        <table class="fw table__container" id="myTable">
            <thead>
              <th style = "width:20%;text-align:left;" id="name">Tên:</th>
              <th style = "width:10% ;text-align:left;" id="brand">Thương Hiệu</th>
              <th style = "width:10%;text-align:left;" id="countInstock">Tồn Kho:</th>
              <th style = "width:10%;text-align:left;" id="price">Giá:</th>
              <th style = "width:20% ;text-align:left;" id="promotion">Khuyễn Mãi</th>
              <th style = "width:10% ;text-align:left;" id="Subcategory">Danh mục</th>
              <th style = "width:20% ;text-align:right;">Lựa chọn</th>
            </thead>
            <tbody id="tbody">
              ${
                products &&
                products
                  .map(
                    (p) => `<tr >
                    <td style = "width:20%;text-align:left;">${p.name}</td>
                    <td style = "width:10%;text-align:left;">${
                      p.brand?.name ? p.brand?.name : `Không có`
                    }</td>
                    <td style = "width:10%;text-align:left;">${
                      p.countInstock
                    }</td>
                    <td style = "width:10%;text-align:left;">${p.price}</td>
                    <td style = "width:20%;text-align:left;">${
                      p.promotion?.name ? p.promotion?.name : `Không có`
                    }</td>
                    <td style = "width:10%;text-align:left;">${
                      p.subcategory?.name ? p.subcategory?.name : `Không có`
                    }</td>
                    <td style = "width:20% ;text-align:right;">
                      <div class="dropdown fw dropdown--edit">
                        <div class="dropdown-button dropdown-button--edit">...</div>
                        <div class="dropdown-content dropdown-content--edit">
                          <div class="dropdown-item edit" data-product="${
                            p._id
                          }">Sữa</div>
                          <div class="dropdown-item" data-product="${
                            p._id
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
          <div class="center">
            <div class="pagination" id="pagination">
              <a id="pre">&laquo;</a>
              ${pagination
                .map((item) => `<a class="pageItem" page="${item}">${item}</a>`)
                .join("")}
              <a id="next">&raquo;</a>
            </div>
          </div>
    </div>`;
  },
};
export default ProductScreen;
