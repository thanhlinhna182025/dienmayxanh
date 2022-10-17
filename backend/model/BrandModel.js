import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên thương hiệu cần phải có"],
      unique: [true, "Tên thương hiệu không trùng nhau"],
      trim: true,
    },
    suppliers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true,
        index: true,
      },
    ],
    logo: { type: String },
    isdeleted: { type: Boolean, default: false },
    productsof: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    ],
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
