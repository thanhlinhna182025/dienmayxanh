import catchAsyncError from "../midleware/catchAsyncError";
import createError from "../util/error";
import CategoryModel from "../model/CategoryModel";
export const createCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(createError(300, `Vui lòng nhập tên danh mục`));
  }

  const category = await CategoryModel.findOne({ name });
  if (category) {
    return next(createError(400, `Danh mục ${name} đã tồn tại`));
  }
  const newCategory = new CategoryModel(req.body);
  await newCategory.save();
  res.status(201).json({
    success: true,
    message: `Bạn đã tạo thành công danh mục ${name}`,
    category: newCategory,
  });
});
//Get all category
export const getAllCategory = catchAsyncError(async (req, res, next) => {
  const category = await CategoryModel.find().populate({
    path: "subcategories",
    select: "name isdeleted",
  });
  res.status(200).json({ success: true, category });
});
//Get one category
export const getOneCategory = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const category = await CategoryModel.findById(id).populate({
    path: "subcategories",
  });
  res.status(200).json({ success: true, message: "Thành công", category });
});
//Update category
export const updateCategory = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  await CategoryModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ success: true, message: "Đã cập nhật" });
});
//Change Status category

export const changeStatusCategory = catchAsyncError(async (req, res, next) => {
  const { isdeleted } = req.body;
  const id = req.params.id;
  await CategoryModel.findByIdAndUpdate(
    id,
    {
      isdeleted: isdeleted,
    },
    { new: true }
  );
  return res.status(200).json({ success: true, message: "Thành công" });
});
