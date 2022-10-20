import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        detail: {
          type: String,
          required: [true, "Vui lòng điền địa chỉ giao hàng"],
        },
        ward: {
          type: String,
          required: [true, "Vui lòng điền địa chỉ giao hàng"],
        },
        district: {
          type: String,
          required: [true, "Vui lòng điền địa chỉ giao hàng"],
        },
        province: {
          type: String,
          required: [true, "Vui lòng điền địa chỉ giao hàng"],
        },
      },
      orderer: {
        name: { type: String, required: [true, "Vui lòng điền tên người mua"] },
        gender: { type: String, enum: ["male", "female"] },
        phoneNo: {
          type: String,
          required: [true, "Vui lòng nhập số điện thoại"],
        },
      },
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        options: [
          {
            type: { type: String },
            value: { type: String },
          },
        ],
      },
    ],
    otherRequire: { type: String },
    shipAt: { type: Boolean, default: true },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["Processing", "Delivering", "Delivered"],
      default: "Processing",
    },
    deliveredAt: Date,
    isPay: { type: Boolean, default: false },
    isPayAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
