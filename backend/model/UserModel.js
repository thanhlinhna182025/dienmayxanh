import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name không được để trống"] },
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      unique: [true, "Email đã tồn tại"],
    },
    phone: {
      type: String,
      required: true,
    },
    address: [
      { city: { type: String, required: true } },
      { district: { type: String, required: true } },
      { ward: { type: String, required: true } },
      { street: { type: String, required: true } },
    ],
    password: {
      type: String,
      required: [true, "Mật khẩu không được để trống"],
    },
    isAdmin: { type: Boolean, required: true, default: false },
    isdeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
