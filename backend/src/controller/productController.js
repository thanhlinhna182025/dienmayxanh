import catchAsyncError from '../midleware/catchAsyncError';
import createError from '../util/error';
import ProductModel from '../model/ProductModel';

export const createProduct = catchAsyncError(async (req, res, next) => {
    const { name, brand, category, description } = req.body;
    if (!name || !brand || !category || !description) {
        return next(createError(403, 'Please enter full data '));
    }
    const product = new ProductModel(req.body);
    const createProduct = await product.save();
    if (!createProduct) {
        return next(createError(500, 'Error creating product'));
    }
    res.status(201).json({ message: 'Product created', createProduct });
});
