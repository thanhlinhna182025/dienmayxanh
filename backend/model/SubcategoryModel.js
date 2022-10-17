import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên danh mục là cần thiết"],
      unique: [true, "Tên là duy nhất"],
    },
    icon: { type: String },
    isdeleted: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    productsof: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);
export default Subcategory;
