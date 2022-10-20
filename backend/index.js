import express, { json } from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./config";
import upload from "./midleware/upload";
import brandRouter from "./route/brandRoute";
import supplierRouter from "./route/supplierRoute";
import categoryRouter from "./route/categoryRoute";
import promotionRouter from "./route/promotionRoute";
import productRouter from "./route/productRoute";
import SubcategoryRouter from "./route/SubcategoryRoute";
import orderRouter from "./route/orderRoute";
import errorHandler from "./midleware/errorHandler";
import router from "./route/paymentRoute";
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(json());
app.use(bodyParser.json());
app.use(morgan("tiny"));
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("DB connected");
  } catch (error) {
    throw error;
  }
};
// views

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested With, Content-Type, Accept"
  );
  next();
});
//public folder
app.use("/upload", express.static(path.join(__dirname, "/upload")));
app.use("/public", express.static(path.join(__dirname, "/public")));
// app.use("upload", express.static(path.join(__dirname, "upload")));
// app.use("public", express.static(path.join(__dirname, "public")));
//upload image router
app.post("/v1/api/upload/single", upload.uploadSingle, (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "thành công", images: req.file.path });
});
app.post("/v1/api/upload/multiple", upload.uploadMultiple, (req, res, next) => {
  const images = req.files.map((file) => {
    return file.path;
  });
  console.log(images);
  res
    .status(200)
    .json({ success: true, message: "thành công", images: images });
});
//Routers

app.use("/v1/api/admin/brand", brandRouter);
app.use("/v1/api/admin/supplier", supplierRouter);
app.use("/v1/api/admin/category", categoryRouter);
app.use("/v1/api/admin/Subcategory", SubcategoryRouter);
app.use("/v1/api/admin/promotion", promotionRouter);
app.use("/v1/api/admin/product", productRouter);
app.use("/v1/api/brand", brandRouter);
app.use("/v1/api/supplier", supplierRouter);
app.use("/v1/api/category", categoryRouter);
app.use("/v1/api/Subcategory", SubcategoryRouter);
app.use("/v1/api/promotion", promotionRouter);
app.use("/v1/api/product", productRouter);
app.use("/v1/api/order", orderRouter);


//Error handler
//unhan route
app.all("*", (req, res, next) => {
  const err = new Error("Không tìm thấy đường dẫn");
  err.statusCode = 404;
  next(err);
});
app.use(errorHandler);
app.listen(
  {
    port: 4000,
    host: "0.0.0.0",
  },
  () => console.log(`App listening at port ${PORT}`)
);
connectDB();
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
