import {
  createProduct,
  getAllProduct,
  getOneProduct,
  getSomeProduct,
  updateProduct,
  updateStatusProduct,
} from "../controller/productController";
import express from "express";

const productRouter = express.Router();
productRouter.post("/", createProduct);
productRouter.get("/", getAllProduct);
productRouter.post("/some", getSomeProduct);
productRouter.put("/:id/edit", updateProduct);
productRouter.put("/:id/status", updateStatusProduct);
productRouter.get("/:id", getOneProduct);

export default productRouter;
