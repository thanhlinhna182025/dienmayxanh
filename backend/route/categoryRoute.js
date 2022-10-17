import express from "express";
import {
  createCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
  changeStatusCategory,
} from "../controller/categoryController";

const categoryRouter = express.Router();
categoryRouter.post("/", createCategory);
categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getOneCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.patch("/:id", changeStatusCategory);

export default categoryRouter;
