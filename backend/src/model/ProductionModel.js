import mongoose from "mongoose";

const productionSchema = new mongoose.Schema({});

const ProductionModel = mongoose.model("Production", productionSchema);
export default ProductionModel;
