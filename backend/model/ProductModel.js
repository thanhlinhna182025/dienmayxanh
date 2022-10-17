import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);
const optionSchema = new mongoose.Schema({
  type: { type: String },
  option: { type: String },
  plus: { type: Number },
});

const productSchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Thương hiệu sản phẩm phải được nhập khi khởi tạo"],
      index: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: [true, "Danh mục sản phẩm phải được nhập khi khởi tạo"],
      index: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: [true, "Nhà cung cấp sản phẩm phải được nhập khi khởi tạo"],
    },
    promotion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Promotion",
    },
    name: {
      type: String,
      required: [true, "Tên sản phẩm không để trống"],
      unique: [true, "Sản phẩm này đã tồn tại"],
      index: true,
    },
    price: {
      type: Number,
      required: [true, "Giá cả sản phẩm phải được nhập khi khởi tạo"],
      index: true,
    },
    countInstock: {
      type: Number,
      required: true,
      default: 0,
    },
    description: { type: String, required: true, default: "Không có mô tả" },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    image: { type: String, required: true },
    images: [String],
    Rating: { type: Number, default: 1 },
    reviews: [reviewSchema],
    options: [optionSchema],
    isdeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
