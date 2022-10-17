import catchAsyncError from "../midleware/catchAsyncError";
import createError from "../util/error";
import BrandModel from "../model/BrandModel";
import ProductModel from "../model/ProductModel";

export const createBrand = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(createError(300, `Vui lòng nhập tên thương hiệu`));
  }
  const newBrand = BrandModel(req.body);
  await newBrand.save();
  res.status(201).json({
    success: true,
    message: `Bạn đã tạo thành công thương hiệu ${name}`,
    brand: newBrand,
  });
});
//Get all brand
export const getAllBrand = catchAsyncError(async (req, res, next) => {
  const brands = await BrandModel.find().sort({ deleted: 1, name: 1 });
  res.status(200).json({ success: true, message: "thành công", brands });
});
//Get One Brand
export const getOneBrand = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const brand = await BrandModel.findOne({ _id: id }).populate([
    {
      path: "productsof",
      populate: { path: "promotion" },
    },
    { path: "subcategories" },
  ]);

  res.status(200).json({ success: true, message: "thành công", brand });
});
//updateStatusBrand
export const updateStatusBrand = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const { dataIds, status } = req.body;
  console.log(status);
  await BrandModel.findByIdAndUpdate(
    id,
    {
      $set: { isdeleted: status },
    },
    { new: true }
  );
  if (dataIds) {
    dataIds.forEach(async function (id) {
      await ProductModel.findByIdAndUpdate(
        id,
        { $set: { isdeleted: status } },
        { new: true }
      );
    });
  }
  res.status(200).json({ success: true, message: "Cập nhật thành công" });
});
export const updateBrand = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const brand = await BrandModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ success: true, message: "Đã cập nhật", brand });
});
