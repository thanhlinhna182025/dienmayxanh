import express from "express";

import {
  createOrder,
  getOneOrder,
  getAllOrder,
  deleteOrder,
  vnpayReturn,
  createPaymentUrl,
  vnpayIpn,
} from "../controller/orderController";

const orderRoute = express.Router();
orderRoute.post("/", createOrder);
orderRoute.get("/checkout/vnp_ReturnUrl", vnpayReturn);
orderRoute.post("/create_payment_url", createPaymentUrl);
orderRoute.get("/vnpay_ipn", vnpayIpn);
orderRoute.get("/all", getAllOrder);
orderRoute.get("/:id", getOneOrder);
orderRoute.put("/:id", deleteOrder);

export default orderRoute;
