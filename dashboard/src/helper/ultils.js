export const baseUrl = "http://localhost:4000";
// phân tích và chuyển đổi URL
export const parseRequestUrl = () => {
  const address = document.location.hash.slice(1).split("?")[0];
  const queryString =
    document.location.hash.slice(1).split("?").length === 2
      ? document.location.hash.slice(1).split("?")[1]
      : "";

  const url = address.toLowerCase() || "/";
  const r = url.split("/");
  const q = queryString.split("=");
  return {
    resource: r[1],
    id: r[2],
    verb: r[3],
    name: q[0],
    value: q[1],
  };
};
// Hiện thị một thông báo không xác nhận
export const toastMessage = ({
  type = "Info",
  title = "Thông báo",
  message = "Thank for visit website",
  duration = 1000,
}) => {
  const toast = document.getElementById("toast");
  const toastContainer = document.createElement("div");
  toastContainer.classList.add("toast__container", `toast--${type}`);

  const icons = {
    success: "fa-solid fa-circle-check bg--success",
    info: "fa-solid fa-circle-info bg--info",
    warning: "fa-solid fa-triangle-exclamation bg--warning",
    error: "fa-solid fa-circle-exclamation bg--error",
  };

  toastContainer.innerHTML = `
            <i class="${icons[type]}"></i>
            <div class="toast__content-container">
              <p class="toast__content-title">${title}</p>
              <p class="toast__content-message">${message}</p>
            </div>
            <i class="fa-solid fa-x toast__close toast__close--${type}" id="closeToast"></i>
        `;
  const time = (duration / 1000).toFixed(2);
  toastContainer.style.animation = `sliceInToast 0.3s ${time}s forwards`;
  toast.appendChild(toastContainer);
  const setTimeOutId = setTimeout(() => {
    toast.removeChild(toastContainer);
  }, duration + 3000);
  const closeToast = document.getElementById("closeToast");
  closeToast.addEventListener("click", function () {
    toast.removeChild(toastContainer);
    clearTimeout(setTimeOutId);
  });
};
// Hiện thị một thông báo có xác nhận
export const showComFirmMessage = (style, message, callback) => {
  document.getElementById("message-overlay").innerHTML = `
  <div class="message__overlay-container ">
    <div id="message-overlay-content" class="message__overlay-content ${style}">${message}</div>
    <div class="button__wrapper">
      <span id="message-overlay-close-button" class="message__overlay-close-button">Hủy</span>
      <span id="message-overlay-next-button" class="message__overlay-next-button">Xác nhận</span>
    </div>
  </div>
  `;
  document.getElementById("message-overlay").classList.add("active");
  document
    .getElementById("message-overlay-close-button")
    .addEventListener("click", () => {
      document.getElementById("message-overlay").classList.remove("active");
    });
  document
    .getElementById("message-overlay-next-button")
    .addEventListener("click", () => {
      document.getElementById("message-overlay").classList.remove("active");
      if (callback) {
        callback();
      }
    });
};
// Tải lại trang
export const reRender = async (component) => {
  document.getElementById("main").innerHTML = await component.render();
  await component.after_render();
};
// điều hướng trang
export const redirect = (hash = "/") => {
  document.location = hash;
};
// Hiện thị và kiểm tra hình ảnh trước khi upload
function validFileType(file) {
  return fileTypes.includes(file.type);
}
function returnFileSize(number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];
export const updateImageDisplay = (input, previews) => {
  while (previews.firstChild) {
    previews.removeChild(previews.firstChild);
  }
  const curFiles = input.files || [];
  if (curFiles.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No files currently selected for upload";
    previews.appendChild(para);
  } else {
    const list = document.createElement("ol");
    previews.appendChild(list);
    for (const file of curFiles) {
      const listItem = document.createElement("li");
      const para = document.createElement("p");
      if (validFileType(file)) {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(
          file.size
        )}.`;
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `File name ${file.name}: Định dạng ảnh không phù hợp`;
        listItem.appendChild(para);
      }
      list.appendChild(listItem);
    }
  }
};
// Định dạng số ô input có dấu phân cách
function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const formatCurrency = (input, blur) => {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  // get input value
  var input_val = input.val();
  // don't validate empty input
  if (input_val === "") {
    return;
  }

  // original length
  var original_len = input_val.length;

  // initial caret position
  var caret_pos = input.prop("selectionStart");
  // check for decimal
  if (input_val.indexOf(".") >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");
    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);
    // add commas to left side of number
    left_side = formatNumber(left_side);
    // validate right side
    right_side = formatNumber(right_side);
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);
    // join number by .
    input_val = "$" + left_side + "." + right_side;
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    // input_val = "$" + input_val;
    // final formatting
    // if (blur === "blur") {
    //   input_val += ".00";
    // }
  }

  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
};

export function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
// format phone Number
export function checkPhoneNumber(input) {
  var flag = false;
  var phone = input.val().trim(); // ID của trường Số điện thoại
  phone = phone.replace("(+84)", "0");
  phone = phone.replace("+84", "0");
  phone = phone.replace("0084", "0");
  phone = phone.replace(/ /g, "");
  if (phone != "") {
    var firstNumber = phone.substring(0, 2);
    if ((firstNumber == "09" || firstNumber == "08") && phone.length == 10) {
      if (phone.match(/^\d{10}/)) {
        flag = true;
      }
    } else if (firstNumber == "01" && phone.length == 11) {
      if (phone.match(/^\d{11}/)) {
        flag = true;
      }
    }
  }
  return flag;
}

export const updateBodyTable = (products = []) => {
  $("#body").html("");
  const html = products
    .map(
      (p) => `<tr >
                    <td style = "width:20%;text-align:left;">${p.name}</td>
                    <td style = "width:10%;text-align:left;">${
                      p.brand?.name ? p.brand.name : `Không có`
                    }</td>
                    <td style = "width:10%;text-align:left;">${
                      p.countInstock ? p.countInstock : `Hết hàng`
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
                          <div class="dropdown-item edit" data-supplier="${
                            p._id
                          }">Sữa</div>
                          <div class="dropdown-item" data-supplier="${
                            p._id
                          }">Ngưng</div>
                        </div>
                      </div>
                    </td>
              </tr>`
    )
    .join("");
  $("#tbody").html(html);
};
export const updatePagination = (pages) => {
  const pagination = Array.from({ length: pages }, (_, i) => i + 1);
  $("#pagination").html = "";
  const html = `<a id="pre">&laquo;</a>
              ${pagination
                .map((item) => `<a class="pageItem" page="${item}">${item}</a>`)
                .join("")}
              <a id="next">&raquo;</a>`;
  $("#pagination").html(html);
};
export const controlDropdown = () => {
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
};

