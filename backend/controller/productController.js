import catchAsyncError from "../midleware/catchAsyncError";
import ProductModel from "../model/ProductModel";
import BrandModel from "../model/BrandModel";
import PromotionModel from "../model/PromotionModel";
import SupplierModel from "../model/SupplierModel";
import SubcategoryModel from "../model/SubcategoryModel";

export const createProduct = catchAsyncError(async (req, res, next) => {
  const { promotion, brand, supplier, subcategory } = req.body;
  const product = new ProductModel(req.body);
  await product.save();
  const id = product._id;

  const brandOfProduct = await BrandModel.findById(brand);
  brandOfProduct.productsof.push(id);
  await brandOfProduct.save();

  const promotionOfProduct = await PromotionModel.findById(promotion);
  promotionOfProduct.productsof.push(id);
  await promotionOfProduct.save();

  const supplierOfProduct = await SupplierModel.findById(supplier);
  supplierOfProduct.productsof.push(id);
  await supplierOfProduct.save();

  const subcategoryOfProduct = await SubcategoryModel.findById(subcategory);
  subcategoryOfProduct.productsof.push(id);
  await subcategoryOfProduct.save();
  res.status(201).json({
    success: true,
    message: "Đã tạo sản phẩm thành công",
    product,
  });
});

export const getAllProduct = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";

  let sort = req.query.sort || "name";
  req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
  let sortBy = {};
  if (sort[1]) {
    sortBy[sort[0]] = sort[1];
  } else {
    sortBy[sort[0]] = "asc";
  }
  const total = await ProductModel.countDocuments({
    name: { $regex: search, $options: "i" },
  });
  if (search !== "") {
    const products = await ProductModel.find({
      name: { $regex: search, $options: "i" },
    })
      .populate([
        {
          path: "brand",
          select: "name isdeleted",
        },
        {
          path: "promotion",
          select: "name isdeleted",
        },
        {
          path: "subcategory",
          select: "name isdeleted",
        },
      ])
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit);
    const pages = Math.ceil(total / limit);
    return res.status(200).json({
      success: true,
      message: "Thành công",
      total: total,
      limit: limit,
      page: page,
      pages: pages,
      products: products,
    });
  } else {
    const products = await ProductModel.find()
      .populate([
        {
          path: "brand",
          select: "name isdeleted",
        },
        {
          path: "promotion",
          select: "name isdeleted",
        },
        {
          path: "subcategory",
          select: "name isdeleted",
        },
      ])
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit);
    const pages = Math.ceil(total / limit);
    return res.status(200).json({
      success: true,
      message: "Thành công",
      total: total,
      limit: limit,
      page: page,
      pages: pages,
      products: products,
    });
  }
});

export const getOneProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id).populate([
    {
      path: "brand",
      select: "name isdeleted",
    },
    {
      path: "promotion",
      select: "name isdeleted detail",
    },
    {
      path: "subcategory",
      select: "name isdeleted",
    },
  ]);
  res.status(200).json({ success: true, product });
});
export const getSomeProduct = catchAsyncError(async (req, res, next) => {
  const ids = req.body;
  const products = await ProductModel.find({ _id: { $in: ids } }).populate([
    {
      path: "brand",
      select: "name isdeleted",
    },
    {
      path: "promotion",
      select: "name isdeleted detail",
    },
    {
      path: "subcategory",
      select: "name isdeleted",
    },
  ]);
  res.status(200).json({ success: true, products });
});
export const updateProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const product = await ProductModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ success: true, message: "Da cap nhat", product });
});

export const updateStatusProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const { status } = req.body;
  const brand = await ProductModel.findByIdAndUpdate(
    id,
    {
      $set: { deleted: status },
    },
    { new: true }
  );
  res.status(200).json({ success: true, message: "Cập nhật thành công" });
});
