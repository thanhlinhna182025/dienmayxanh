import {
  getAllProduct,
  getOneSubcategory,
  updateStatusSubcategory,
} from "../helper/api";
import {
  parseRequestUrl,
  reRender,
  showComFirmMessage,
  toastMessage,
} from "../helper/ultils";

const SubcategoryStatusScreen = {
  after_render: async () => {
    $("#check__all").click(function () {
      $("input:checkbox").prop("checked", this.checked);
    });

    $("#submit_btn_active").on("click", function () {
      showComFirmMessage(
        "info",
        "Ban muốn sử dụng lại danh mục này",
        async function () {
          let dataIds = [];
          const SubcategoryId = $("#SubcategoryId").attr("data-brand");
          $.each($("input[name=data-product]:checked"), function (_, item) {
            dataIds.push($(item).attr("data-product"));
          });

          if ($("input[name=data-product]").length !== dataIds.length) {
            showComFirmMessage(
              "warning",
              "Một số sản phẩm vẫn chưa được chọn để gỡ khỏi kệ trưng bày.Bạn vẫn muốn tiếp tục ?",
              async function () {
                // active brand
                const res = await updateStatusSubcategory(SubcategoryId, {
                  dataIds: dataIds,
                  status: false,
                });
                if (res.success) {
                  reRender(SubcategoryStatusScreen);
                  toastMessage({
                    type: "success",
                    title: "Thành công",
                    message: res.message,
                    duration: 500,
                  });
                }
              }
            );
          } else {
            const res = await updateStatusSubcategory(SubcategoryId, {
              dataIds: dataIds,
              status: false,
            });
            if (res.success) {
              reRender(SubcategoryStatusScreen);
              toastMessage({
                type: "success",
                title: "Thành công",
                message: res.message,
                duration: 500,
              });
            }
          }
        }
      );
    });
    $("#submit_btn_inactive").on("click", function () {
      showComFirmMessage(
        "info",
        "Bạn muốn ngừng sử dụng danh mục này?",
        async function () {
          let dataIds = [];
          const SubcategoryId = $("#SubcategoryId").attr("data-brand");
          $.each($("input[name=data-product]:checked"), function (_, item) {
            dataIds.push($(item).attr("data-product"));
          });
          if ($("input[name=data-product]").length !== dataIds.length) {
            showComFirmMessage(
              "warning",
              "Một số sản phẩm vẫn chưa được chọn để gỡ khỏi kệ trưng bày.Bạn vẫn muốn tiếp tục ?",
              async function () {
                // inactive brand
                const res = await updateStatusSubcategory(SubcategoryId, {
                  dataIds: dataIds,
                  status: true,
                });
                if (res.success) {
                  reRender(SubcategoryStatusScreen);
                  toastMessage({
                    type: "success",
                    title: "Thành công",
                    message: res.message,
                    duration: 500,
                  });
                }
              }
            );
          } else {
            const res = await updateStatusSubcategory(SubcategoryId, {
              dataIds: dataIds,
              status: true,
            });
            if (res.success) {
              reRender(SubcategoryStatusScreen);
              toastMessage({
                type: "success",
                title: "Thành công",
                message: res.message,
                duration: 500,
              });
            }
          }
        }
      );
    });
    $("#submit__nocategory").on("click", function () {
      showComFirmMessage(
        "info",
        "Bạn muốn ngừng sử dụng danh mục này?",
        async function () {
          let dataIds = [];
          const SubcategoryId = $("#SubcategoryId").attr("data-brand");
          $.each($("input[name=data-product]:checked"), function (_, item) {
            dataIds.push($(item).attr("data-product"));
          });
          if ($("input[name=data-product]").length !== dataIds.length) {
            showComFirmMessage(
              "warning",
              "Một số sản phẩm vẫn chưa được chọn để gỡ khỏi kệ trưng bày.Bạn vẫn muốn tiếp tục ?",
              async function () {
                // inactive brand
                const res = await updateStatusSubcategory(SubcategoryId, {
                  dataIds: dataIds,
                  status: true,
                });
                if (res.success) {
                  reRender(SubcategoryStatusScreen);
                  toastMessage({
                    type: "success",
                    title: "Thành công",
                    message: res.message,
                    duration: 500,
                  });
                }
              }
            );
          } else {
            const res = await updateStatusSubcategory(SubcategoryId, {
              dataIds: dataIds,
              status: true,
            });
            if (res.success) {
              reRender(SubcategoryStatusScreen);
              toastMessage({
                type: "success",
                title: "Thành công",
                message: res.message,
                duration: 500,
              });
            }
          }
        }
      );
    });
  },
  render: async () => {
    const { id } = parseRequestUrl();
    const Subcategory = await getOneSubcategory(id);
    const products = await getAllProduct({ SubcategoryId: id });
    return `
    <div class="fw brand">
    ${
      products.length === 0
        ? `<h2 data-brand="${
            Subcategory._id
          }" id="SubcategoryId" class="title">Danh mục ${
            Subcategory.name
          } này chưa có sản phẩm nào</h2>
        ${
          Subcategory.deleted
            ? `<button class="btn flex_1" id="submit_btn_active">Sử dụng</button>`
            : `<button class="btn flex_1" id="submit_btn_inactive">Ngừng sử dụng</button>`
        }
          `
        : `  <div class="brand__list-container">
        <h2 data-brand="${
          Subcategory._id
        }" id="SubcategoryId" class="title">Danh Sách Sản Phẩm Thuộc Danh Mục ${
            Subcategory.name
          }</h2>
          <p class="chosen">Lựa chọn sản phẩm sẽ không trưng bày của danh mục ${
            Subcategory.name
          }</p>
          <table class="category__list fw">
                <thead>
                  <th style = width:20%;text-align:left;>Tên sản phẩm:</th>
                  <th style = width:20%;text-align:left;>Hàng tồn kho:</th>
                  <th style = width:20%;text-align:left;>Chương trình khuyến mãi:</th>
                  <th style = width:25%;text-align:left;>Trạng thái sản phẩm:</th>
                  <th style="width:20% ;text-align:center">
                    <input type="checkbox" id="check__all" />
                    <label for="check__all">Lựa chọn</label>
                  </th>
                </thead>
                <tbody>
                  ${products
                    .map(
                      (product) =>
                        `<tr>
                            <td style="width:20%;text-align:left;">${
                              product.name
                            }</td>
                            <td style="width:20%;text-align:left;">${
                              product.countInstock
                            }</td>
                            <td style="width:20%;text-align:left;">${
                              product.promotion.name
                            }</td>
                            <td style="width:20%;text-align:left;">${
                              product.deleted
                                ? `<span class="item item--inactive" >Không hoạt động</span>`
                                : `<span class="item  item--active">Hoạt động</span>`
                            }</td>
                            <td style="width:20%;text-align:center;">
                              <input type="checkbox" name="data-product" data-product="${
                                product._id
                              }"/>
                            </td>
                          </tr>`
                    )
                    .join("\n")}
                </tbody>
              </table>
            </div>
            ${
              Subcategory.deleted
                ? `<button class="btn flex_1" id="submit_btn_active">Sử dụng</button>`
                : `<button class="btn flex_1" id="submit_btn_inactive">Ngừng sử dụng</button>`
            }
            `
    }
    </div>`;
  },
};

export default SubcategoryStatusScreen;
