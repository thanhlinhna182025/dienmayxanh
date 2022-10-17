import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên danh mục cần phải có"],
      unique: [true, "Tên danh mục không được trùng"],
      index: true,
    },
    icon: { type: String },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true,
      },
    ],
    isdeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
