import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên không được để trống"],
      unique: [true, "Chương trình khuyến mãi không trùng tên"],
    },

    description: {
      type: String,
      required: [true, "Hãy nhập mô tả cho khuyến mãi"],
    },
    detail: {
      discount: { type: Number, default: 0 },
      freeship: { type: Boolean, default: false },
      gift: { type: String },
    },

    icon: { type: String },
    isdeleted: { type: Boolean, default: false },
    productsof: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const Promotion = mongoose.model("Promotion", promotionSchema);
export default Promotion;
