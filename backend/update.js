import Product from "./model/ProductModel";

const updateMany = async () => {
  await Product.updateMany({}, { Subcategory: "6336de180e1272e8971f6865" });
};

export default updateMany;
