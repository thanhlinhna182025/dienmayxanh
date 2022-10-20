import {
  getCityData,
  getDistrictData,
  getWardData,
  getAllSupplier,
  getOneSupplier,
  updateSupplier,
} from "../helper/api";
import {
  toastMessage,
  reRender,
  checkPhoneNumber,
  parseRequestUrl,
  redirect,
  controlDropdown,
} from "../helper/ultils";

const SupplierEditScreen = {
  after_render: async () => {
    // dropdown address start
    $(function () {
      controlDropdown();
    });
    $.each($("#city .dropdown-item"), async function (_, item) {
      const cityCodeName = $(item).attr("data-city");
      $(item).on("click", async function () {
        const districts = await getDistrictData(cityCodeName);
        $("#btn-province").text($(item).text());
        $("#city").parent().removeClass("dropdown--active");
        const html = districts.map(
          (d) =>
            `<div class="dropdown-item" data-district="${d.code}">${d.name}</div>`
        );
        $("#district").html(html);
        $("#district").parent().toggleClass("dropdown--active");
        $("#btn-district").attr("disabled", false);
        $.each($("#district .dropdown-item"), function (_, item) {
          $(item).on("click", async function () {
            $("#btn-district").text($(item).text());
            $("#btn-ward").attr("disabled", false);
            $("#btn-district").parent().removeClass("dropdown--active");
            const districtcode = $(item).attr("data-district");
            const wards = await getWardData(districtcode);
            const html = wards.map(
              (w) =>
                `<div class="dropdown-item" data-ward="${w.code}">${w.name}</div>`
            );
            $("#ward").html(html);
            $("#ward").parent().toggleClass("dropdown--active");
            $.each($("#ward .dropdown-item"), function (_, item) {
              $(item).on("click", function () {
                $("#btn-ward").text($(item).text());
                $("#btn-ward").parent().removeClass("dropdown--active");
              });
            });
          });
        });
      });
    });
    // dropdown address end
    //Chuyển hướng
    $.each($(".edit"), function (_, item) {
      $(item).on("click", function () {
        const id = $(item).attr("data-supplier");
        const hash = `/#/supplier/${id}`;
        redirect(hash);
      });
    });
    // Cập nhật
    $("#s-btn-edit").on("click", async function (e) {
      e.preventDefault();
      const flag = checkPhoneNumber($("#s-phone"));
      if (flag) {
        const update = {
          name: $("#s-name").val(),
          phone: $("#s-phone").val(),
          taxcode: $("#s-taxcode").val(),
          address: {
            detail: $("#s-detail").val(),
            ward: $("#btn-ward").text(),
            district: $("#btn-district").text(),
            province: $("#btn-province").text(),
          },
        };
        const id = $(".title").attr("data-supplier");
        const res = await updateSupplier(id, update);
        if (res.success) {
          toastMessage({
            type: "success",
            title: "Thành công",
            message: res.message,
            duration: 500,
          });
          reRender(SupplierEditScreen);
        }
      } else {
        $("#s-phone").css("border", "1px solid red");
        $("#s-phone").on({
          focus: function () {
            $(this).css("border", "none");
          },
        });
      }
    });
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
    <div class="container bgc-edit">
        <div class="left flex_1">
            <h2 class="title" data-supplier="${supplier._id}">Cập Nhật ${
      supplier.name
    }</h2>
            <div class="fw">
                <form class="form__container fw" id="supplier-form">
                    <div class="form__wrapper">
                        <div class="form__group-item">
                            <input class="fw form__input" autocomplete="off" type="text" id="s-name" required value="${
                              supplier.name
                            }"/>
                            <label class="label-position" for="s-name" >Tên nhà cung cấp:</label>
                        </div>
                        <div class="form__group-item">
                            <input class="fw form__input" autocomplete="off" type="text" id="s-phone" required value="${
                              supplier.phone
                            }"/>
                            <label class="label-position" for="s-phone" >Số điện thoại:</label>
                        </div>
                        <div class="form__group-item">
                            <input class="fw form__input" autocomplete="off" type="text" id="s-taxcode" required value="${
                              supplier.taxcode
                            }"/>
                            <label class="label-position" for="s-taxcode" >Mã số thuế:</label>
                        </div>
                        <div class="form__group">
                          <div class="dropdown">
                            ${
                              supplier && supplier?.address
                                ? `<div class="dropdown-button" id="btn-province">${supplier.address.province}</div>`
                                : `<div class="dropdown-button" id="btn-province">Chọn tỉnh/thành phố</div>`
                            }
                              <div class="dropdown-content" id="city">
                              ${cities
                                .map(
                                  (c) =>
                                    ` <div class="dropdown-item" data-city="${c.code}">${c.name}</div>`
                                )
                                .join("")}
                              </div>
                          </div>
                          <div class="dropdown">
                          ${
                            supplier && supplier?.address
                              ? `<button class="dropdown-button" id="btn-district" type="button" >${supplier.address.district}</button>`
                              : `<button class="dropdown-button" id="btn-district" type="button" disabled>Chọn huyện/quận</button>`
                          }
                            
                            <div class="dropdown-content" id="district">
                            </div>
                          </div>
                        </div>
                        <div class="form__group">
                          <div class="dropdown flex_1">
                          ${
                            supplier && supplier?.address
                              ? `<button class="dropdown-button"id="btn-ward" type="button" >${supplier.address.ward}</button>`
                              : `<button class="dropdown-button"id="btn-ward" type="button" disabled>Chọn xã/phường</button>`
                          }
                              <div class="dropdown-content" id="ward">
                              </div>
                          </div>
                          <div class="form__group-item flex_1">
                            ${
                              supplier && supplier?.address
                                ? `<input class="fw form__input" type="text" id="s-detail" required value="${supplier.address.detail}"/>`
                                : `<input class="fw form__input" type="text" id="s-detail" required/>`
                            }
                            <label class="label-position" for="s-detail" >Số nhà ,tên đường:</label>
                        </div>
                        </div>
                    </div>
                    <div class="btn__container fw">
                        <button class="btn fw " id="s-btn-edit" type="submit" form="supplier-form">Lưu thông tin</button>
                    </div>
                </form> 
            </div> 
        </div>
        <div class="right flex_1">
          <table class="fw table__container">
            <thead>
              <th style = "width:40%;text-align:left;">Nhà cung cấp:</th>
              <th style = "width:20%;text-align:left;">Điện thoại:</th>
              <th style = "width:20%;text-align:left;">Mã số thuế:</th>
              <th style = "width:20% ;text-align:right;">Lựa chọn</th>
            </thead>
            <tbody>
              ${
                suppliers &&
                suppliers
                  .map(
                    (sup) => `<tr >
                    <td style = "width:30%;text-align:left;">${sup.name}</td>
                    <td style = "width:20%;text-align:left;">${sup.phone}</td>
                    <td style = "width:20%;text-align:left;">${sup.taxcode}</td>
                    <td style = "width:20% ;text-align:right;">
                      <div class="dropdown fw dropdown--edit">
                        <div class="dropdown-button dropdown-button--edit">...</div>
                        <div class="dropdown-content dropdown-content--edit">
                          <div class="dropdown-item edit" data-supplier="${sup._id}">Sữa</div>
                          <div class="dropdown-item stop" data-supplier="${sup._id}">Ngưng</div>
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
export default SupplierEditScreen;
