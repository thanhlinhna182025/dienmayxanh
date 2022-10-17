import catchAsyncError from "../midleware/catchAsyncError";
import createError from "../util/error";
import SubcategoryModel from "../model/SubcategoryModel";
import CategoryModel from "../model/CategoryModel";

export const createSubcategory = catchAsyncError(async (req, res, next) => {
  const { category } = req.body;
  const newSubcategory = SubcategoryModel(req.body);
  const id = newSubcategory._id;
  const cat = await CategoryModel.findById(category);
  cat.subcategories.push(id);
  await cat.save();
  await newSubcategory.save();
  res.status(201).json({
    success: true,
    message: `Bạn đã tạo thành công `,
  });
});
//Get all Subcategory
export const getAllSubcategory = catchAsyncError(async (req, res, next) => {
  const Subcategory = await SubcategoryModel.find().populate([
    {
      path: "category",
    },
  ]);
  res.status(200).json({ success: true, message: "Thành công", Subcategory });
});
export const getOneSubcategory = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const Subcategory = await SubcategoryModel.findById(id);
  if (!Subcategory) {
    return next(createError(400, `Danh mục không có `));
  }
  res.status(200).json({ success: true, message: "Thành công", Subcategory });
});
export const updateSubcategory = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  await SubcategoryModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ success: true, message: "Đã cập nhật" });
});
