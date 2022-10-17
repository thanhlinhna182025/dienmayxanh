import express from "express";
import {
  changeStatusSupplier,
  createSupplier,
  getAllSuppliers,
  getOneSupplier,
  updateSupplier,
} from "../controller/supplierController";

const supplierRouter = express.Router();
supplierRouter.post("/", createSupplier);
supplierRouter.get("/", getAllSuppliers);
supplierRouter.get("/:id", getOneSupplier);
supplierRouter.put("/:id", updateSupplier);
supplierRouter.patch("/:id", changeStatusSupplier);
// supplierRouter.patch("/:id", updateStatusBrand);

export default supplierRouter;
