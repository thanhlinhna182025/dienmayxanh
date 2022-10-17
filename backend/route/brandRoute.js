import express from "express";
import {
  createBrand,
  getAllBrand,
  getOneBrand,
  updateStatusBrand,
  updateBrand,
} from "../controller/brandController";

const brandRouter = express.Router();
brandRouter.post("/", createBrand);
brandRouter.get("/", getAllBrand);
brandRouter.get("/:id", getOneBrand);
brandRouter.patch("/:id", updateStatusBrand);
brandRouter.put("/:id", updateBrand);

export default brandRouter;
