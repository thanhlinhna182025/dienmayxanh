import mongoose from "mongoose";
const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tên nhà cung cấp cần phải có"],
    unique: [true, "Tên nhà cung cấp không trùng nhau"],
    trim: true,
    index: true,
  },
  phone: { type: String },
  taxcode: { type: String },
  address: {
    detail: {
      type: String,
      required: [true, "Chi tiết địa chỉ cần phải cung cấp"],
    },
    ward: {
      type: String,
      required: [true, "Chi tiết địa chỉ cần phải cung cấp"],
    },
    district: {
      type: String,
      required: [true, "Chi tiết địa chỉ cần phải cung cấp"],
    },
    province: {
      type: String,
      required: [true, "Chi tiết địa chỉ cần phải cung cấp"],
    },
  },

  isdeleted: { type: Boolean, default: false },
  productsof: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
