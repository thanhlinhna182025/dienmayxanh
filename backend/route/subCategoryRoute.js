import express from "express";
import {
  createSubcategory,
  getAllSubcategory,
  getOneSubcategory,
  updateSubcategory,
} from "../controller/SubcategoryController";

const SubcategoryRouter = express.Router();
SubcategoryRouter.post("/", createSubcategory);
SubcategoryRouter.get("/", getAllSubcategory);
SubcategoryRouter.get("/:id", getOneSubcategory);
SubcategoryRouter.put("/:id", updateSubcategory);

export default SubcategoryRouter;
