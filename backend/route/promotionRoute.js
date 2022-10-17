import express from "express";
import {
  createPromotion,
  getAllPromotion,
  updateStatusPromotion,
  deletePromotion,
  getOnePromotion,
  addProductPromotion,
  updatePromotion,
} from "../controller/promotionController";

const promotionRouter = express.Router();
promotionRouter.post("/", createPromotion);
promotionRouter.get("/", getAllPromotion);
promotionRouter.get("/:id", getOnePromotion);
promotionRouter.put("/:id/status", updateStatusPromotion);
promotionRouter.put("/:id/add", addProductPromotion);
promotionRouter.put("/:id", updatePromotion);
promotionRouter.delete("/:id/delete", deletePromotion);

export default promotionRouter;
