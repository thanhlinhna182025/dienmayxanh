import catchAsyncError from "../midleware/catchAsyncError";
import createError from "../util/error";
import PromotionModel from "../model/PromotionModel";
import ProductModel from "../model/ProductModel";

export const createPromotion = catchAsyncError(async (req, res, next) => {
  const newPromotion = PromotionModel(req.body);
  await newPromotion.save();
  res.status(201).json({
    success: true,
    message: "Bạn đã tạo thành công",
    promotion: newPromotion,
  });
});
//Get all promotion
export const getAllPromotion = catchAsyncError(async (req, res, next) => {
  const promotions = await PromotionModel.find();
  if (!promotions) {
    return next(createError(404, "Không tìm thấy chương trình khuyến mãi"));
  }
  res.status(200).json({ success: true, promotions });
});
//Get One Promotion
export const getOnePromotion = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const promotion = await PromotionModel.findOne({ _id: id }).populate({
    path: "productsof",
    populate: [
      {
        path: "promotion",
        select: "-productsof",
      },
      {
        path: "brand",
        select: "name",
      },
      {
        path: "subcategory",
        select: "name",
      },
      {
        path: "supplier",
        select: "name",
      },
    ],
  });
  res.status(200).json({ success: true, message: "thành công", promotion });
});
// add products to promotion
export const addProductPromotion = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const dataIds = req.body;
  console.log(req.body);
  dataIds.forEach(async function (item) {
    await ProductModel.findByIdAndUpdate(
      item,
      { $set: { promotion: id } },
      { new: true }
    );
  });
  res.status(200).json({ success: true, message: "Đã cập nhật" });
});
// Update status promotion
export const updateStatusPromotion = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const { dataIds, status, newpromotion } = req.body;
  const promotion = await PromotionModel.findByIdAndUpdate(
    id,
    {
      $set: { deleted: status },
    },
    { new: true }
  );
  if (newpromotion) {
    dataIds.forEach(async function (id) {
      await ProductModel.findByIdAndUpdate(
        id,
        { $set: { promotion: newpromotion } },
        { new: true }
      );
    });
    return res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      promotion: promotion.deleted,
    });
  }
  dataIds.forEach(async function (id) {
    await ProductModel.findByIdAndUpdate(
      id,
      { $set: { deleted: status } },
      { new: true }
    );
  });
  res.status(200).json({
    success: true,
    message: "Cập nhật thành công",
    promotion: promotion.deleted,
  });
});
// Update Promotion
export const updatePromotion = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const promotion = await PromotionModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ success: true, message: "Đã cập nhật", promotion });
});
//Delete promotion

export const deletePromotion = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const promotion = await PromotionModel.findByIdAndDelete(req.params.id);
  if (data) {
    data.foreach(async function (item) {
      await ProductModel.findByIdAndUpdate(
        item,
        { $set: { promotion: undefined } },
        { new: true }
      );
    });
  }
  res.status(200).json({ success: true, message: "Đã xóa thành công" });
});
