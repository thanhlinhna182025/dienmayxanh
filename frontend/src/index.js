import "./scss/style.scss";
import FooterScreen from "./components/Footer";
import HeaderScreen from "./components/Header";
import { parseRequestUrl } from "./helper/ultil";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Error404Screen from "./screens/Error404Screen";
import CartScreen from "./screens/CartScreen";
import AddToCartScreen from "./screens/AddToCartScreen";
import OrderScreen from "./screens/OrderScreen";
import { hideLoading, showLoading } from "./helper/ultil";
import VNPayScreen from "./screens/VNPayCreateScreen";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/product/:id/add": AddToCartScreen,
  "/cart": CartScreen,
  "/order/:id": OrderScreen,
  "/vnpay/:id": VNPayScreen,
};

const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  $("#header").html(await HeaderScreen.render());
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  $("#main").html(await screen.render());
  if (screen.after_render) {
    await screen.after_render();
  }
  $("#footer").html(FooterScreen.render());
  hideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
