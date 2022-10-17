import "./scss/style.scss";
import { parseRequestUrl } from "./helper/ultils";
import DashBoardScreen from "./screens/DashBoardScreen";
import SideBarScreen from "./screens/SibarScreen";
import ChartScreen from "./screens/ChartScreen";

import SupplierCreateScreen from "./screens/SupplierCreateScreen";
import SupplierEditScreen from "./screens/SupplierEditScreen";
import SupplierStopScreen from "./screens/SupplierStopScreen";

import CategoryCreateScreen from "./screens/CategoryCreateScreen";
import CategoryEditScreen from "./screens/CategoryEditScreen";
import CategoryStopScreen from "./screens/CategoryStopScreen";

import BrandCreateScreen from "./screens/BrandCreateScreen";
import BrandEditScreen from "./screens/BrandEditScreen";

import SubcategoryCreateScreen from "./screens/SubcategoryCreateScreen";
import SubcategoryEditScreen from "./screens/SubcategoryEditScreen";

import PromotionCreateScreen from "./screens/PromotionCreateScreen";
import PromotionEditScreen from "./screens/PromotionEditScreen";

import ProductCreateScreen from "./screens/ProductCreateScreen";
import ProductScreen from "./screens/ProductScreen";

const routes = {
  "/": DashBoardScreen,
  "/chart": ChartScreen,

  "/category": CategoryCreateScreen,
  "/category/:id": CategoryEditScreen,
  "/category/:id/stop": CategoryStopScreen,

  "/supplier": SupplierCreateScreen,
  "/supplier/:id": SupplierEditScreen,
  "/supplier/:id/stop": SupplierStopScreen,

  "/brand": BrandCreateScreen,
  "/brand/:id": BrandEditScreen,

  "/subcategory": SubcategoryCreateScreen,
  "/subcategory/:id": SubcategoryEditScreen,

  "/promotion": PromotionCreateScreen,
  "/promotion/:id": PromotionEditScreen,

  "/product-create": ProductCreateScreen,
  "/product": ProductScreen,
};

const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  $("#sidebar").html(SideBarScreen.render());
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  $("#main").html(await screen.render());
  if (screen.after_render) {
    await screen.after_render();
  }
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
