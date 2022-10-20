import catchAsyncError from "../midleware/catchAsyncError";
import OrderModel from "../model/OrderModel";
import dayjs from "dayjs";
import querystring from "qs";
import config from "../config";
import crypto from "crypto";
export const createOrder = catchAsyncError(async (req, res, next) => {
  try {
    const order = OrderModel(req.body);
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (error) {
    console.log(error);
  }
});
// Get One Order
export const getOneOrder = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const order = await OrderModel.findById(id).populate({
    path: "orderItems.product",
    select:
      "-subcategory -supplier -countInstock -description -numOfReviews -images -Rating -options -isdeleted -reviews ",
  });
  res.status(200).json({ success: true, order });
});
// Get All Order
export const getAllOrder = catchAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find().populate({
    path: "orderItems.product",
  });
  res.status(200).json({ success: true, orders });
});
// Delete One Order
export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  await OrderModel.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: "Đã xóa" });
});

export const createPaymentUrl = catchAsyncError(async (req, res, next) => {
  try {
    var ipAddr = req.socket.remoteAddress;
    var tmnCode = config.tmnCode;
    var secretKey = config.secretKey;
    var vnpUrl = config.vnpUrl;
    var returnUrl = config.returnUrl;
    console.log(returnUrl);
    const date = new Date();
    var createDate = dayjs(date).format("YYYYMMDDHHmmss");
    var orderId = req.body.orderId;
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === "") {
      locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params["vnp_Merchant"] = "";
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }
    vnp_Params = sortObject(vnp_Params);
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var signed = crypto
      .createHmac("sha512", secretKey)
      .update(Buffer.from(signData, "utf-8"))
      .digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    res.status(200).json({ url: vnpUrl });
  } catch (error) {
    console.log(error);
  }
});

function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

export const vnpayReturn = catchAsyncError(async (req, res, next) => {
  try {
    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];
    vnp_Params = sortObject(vnp_Params);
    var secretKey = config.secretKey;
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var signed = crypto
      .createHmac("sha512", secretKey)
      .update(Buffer.from(signData, "utf-8"))
      .digest("hex");
    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      const orderId = vnp_Params["vnp_TxnRef"];
      const order = await OrderModel.findById(orderId);
      const amount = parseInt(vnp_Params["vnp_Amount"]) / 100;
      var checkout = config.checkout;
      res.redirect(checkout);
    }
  } catch (error) {
    console.log(error);
  }
});
export const vnpayIpn = catchAsyncError(async (req, res, next) => {
  var vnp_Params = req.query;
  var secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];
  vnp_Params = sortObject(vnp_Params);
  var secretKey = config.secretKey;
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var signed = crypto
    .createHmac("sha512", secretKey)
    .update(Buffer.from(signData, "utf-8"))
    .digest("hex");
  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    const order = await OrderModel.findById(orderId);
    console.log(order);
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: "00", Message: "success" });
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
});
