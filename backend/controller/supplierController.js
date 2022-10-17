import catchAsyncError from "../midleware/catchAsyncError";
import createError from "../util/error";
import SupplierModel from "../model/SupplierModel";
import ProductModel from "../model/ProductModel";

export const createSupplier = catchAsyncError(async (req, res, next) => {
  const newSuppler = SupplierModel(req.body);
  await newSuppler.save();
  res.status(201).json({
    success: true,
    message: `Bạn đã tạo thành công `,
    supplier: newSuppler,
  });
});
//Get all brand
export const getAllSuppliers = catchAsyncError(async (req, res, next) => {
  const suppliers = await SupplierModel.find();
  res.status(200).json({ success: true, message: "thành công", suppliers });
});
//Get One Brand
export const getOneSupplier = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const supplier = await SupplierModel.findOne({ _id: id }).populate({
    path: "products",
  });

  res.status(200).json({ success: true, message: "thành công", supplier });
});
export const updateSupplier = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  await SupplierModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ success: true, message: "Đã cập nhật" });
});

//Change Status Supplier

export const changeStatusSupplier = catchAsyncError(async (req, res, next) => {
  const { isdeleted } = req.body;
  const id = req.params.id;
  await SupplierModel.findByIdAndUpdate(
    id,
    {
      isdeleted: isdeleted,
    },
    { new: true }
  );
  return res.status(200).json({ success: true, message: "Thành công" });
});