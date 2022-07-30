import { createProduct } from '../controller/productController';
import { verifyAdmin, verifyUser } from '../util/token';
import express from 'express';

const productRouter = express.Router();
productRouter.post('/', verifyUser, verifyAdmin, createProduct);

export default productRouter;
