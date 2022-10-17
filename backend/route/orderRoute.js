import express from "express";

import {
  createOrder,
  getOneOrder,
  getAllOrder,
  deleteOrder,
  getVnPayOrder,
  createPayOrder,
  createPaymentOrder,
  orderReturn,
} from "../controller/orderController";

const orderRoute = express.Router();
orderRoute.post("/", createOrder);
orderRoute.get("/create_payment_url", createPayOrder);
orderRoute.get("/vnpay_return", orderReturn);
orderRoute.post("/create_payment_url", createPaymentOrder);
orderRoute.get("/:id", getOneOrder);
orderRoute.put("/:id", deleteOrder);
orderRoute.get("/all", getAllOrder);
orderRoute.get("/", getVnPayOrder);

export default orderRoute;
