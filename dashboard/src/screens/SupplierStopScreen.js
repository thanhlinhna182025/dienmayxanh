import {
  getCityData,
  getAllSupplier,
  getOneSupplier,
  changeStatusSupplier,
} from "../helper/api";
import {
  toastMessage,
  reRender,
  parseRequestUrl,
  redirect,
  showComFirmMessage,
  controlDropdown,
} from "../helper/ultils";

const SupplierStopScreen = {
  after_render: async () => {
    $(function () {
      controlDropdown();
    });
    //Chuyển hướng
    $.each($(".edit"), function (_, item) {
      $(item).on("click", function () {
        const id = $(item).attr("data-supplier");
        const hash = `/#/supplier/${id}`;
        redirect(hash);
      });
    });
    // Xác nhận xóa
    $("#s-btn-stop").on("click", async function (e) {
      e.preventDefault();
      showComFirmMessage(
        "warning",
        `Bạn xác nhận tạm ngừng sử dụng nhà cung cấp này !`,
        async function () {
          const id = $(".title").attr("data-supplier");
          const res = await changeStatusSupplier(id, {
            isdeleted: true,
          });
          if (res.success) {
            toastMessage({
              type: "success",
              title: "Thành công",
              message: res.message,
              duration: 500,
            });
            reRender(SupplierStopScreen);
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
    //Chuyển chọn xóa
    $.each($(".stop"), function (_, item) {
      $(item).on("click", function () {
        const id = $(item).attr("data-supplier");
        const hash = `/#/supplier/${id}/stop`;
        redirect(hash);
      });
    });
  },
  render: async () => {
    const cities = await getCityData();
    const suppliers = await getAllSupplier();
    const { id } = parseRequestUrl();
    const supplier = await getOneSupplier(id);
    return `
    <div class="container bgc-stop">
        <div class="left flex_1">
            <h2 class="title" data-supplier="${
              supplier._id
            }">Tạm Dừng Sử Dụng Nhà Cung Cấp ${supplier.name}</h2>
            <div class="fw">
                <form class="form__container fw" id="supplier-form">
                    <div class="form__wrapper">
                        <div class="form__group-item">
                            <input class="fw form__input" type="text" id="s-name" required value="${
                              supplier.name
                            }"/>
                            <label class="label-position" for="s-name" >Tên nhà cung cấp:</label>
                        </div>
                        <div class="form__group-item">
                            <input class="fw form__input" type="text" id="s-phone" required value="${
                              supplier.phone
                            }"/>
                            <label class="label-position" for="s-phone" >Số điện thoại:</label>
                        </div>
                        <div class="form__group-item">
                            <input class="fw form__input" type="text" id="s-taxcode" required value="${
                              supplier.taxcode
                            }"/>
                            <label class="label-position" for="s-taxcode" >Mã số thuế:</label>
                        </div>
                    </div>
                    <div class="btn__container fw">
                        <button class="btn fw " id="s-btn-stop" type="submit" form="supplier-form">Xác nhận</button>
                    </div>
                </form> 
            </div> 
        </div>
        <div class="right flex_2">
          <table class="fw table__container">
            <thead>
              <th style = "width:25%;text-align:left;">Nhà cung cấp:</th>
              <th style = "width:20%;text-align:left;">Điện thoại:</th>
              <th style = "width:20%;text-align:left;">Mã số thuế:</th>
              <th style = "width:20%;text-align:left;">Trạng thái:</th>
              <th style = "width:15% ;text-align:right;">Lựa chọn</th>
            </thead>
            <tbody>
              ${
                suppliers &&
                suppliers
                  .map(
                    (sup) => `<tr >
                    <td style = "width:25%;text-align:left;">${sup.name}</td>
                    <td style = "width:20%;text-align:left;">${sup.phone}</td>
                    <td style = "width:20%;text-align:left;">${sup.taxcode}</td>
                    <td style = "width:20%;text-align:left;">${
                      sup.isdeleted ? `Tạm ngưng` : `Hoạt động`
                    }</td>
                    <td style = "width:15% ;text-align:right;">
                      <div class="dropdown fw dropdown--edit">
                        <div class="dropdown-button dropdown-button--edit">...</div>
                        <div class="dropdown-content dropdown-content--edit">
                        ${
                          sup.isdeleted
                            ? `<div class="dropdown-item active" data-supplier="${sup._id}">Kích hoạt</div>`
                            : `<div class="dropdown-item stop" data-supplier="${sup._id}">Ngưng</div>`
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
export default SupplierStopScreen;
