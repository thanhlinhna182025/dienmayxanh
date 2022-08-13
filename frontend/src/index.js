import "./scss/style.scss";
import FooterScreen from "./components/Footer";
import HeaderScreen from "./components/Header";
import { parseRequestUrl } from "./helper/ultils";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Error404Screen from "./screens/Error404Screen";
import AddToCartScreen from "./screens/AddToCartScreen";
import OrderScreen from "./screens/OrderScreen";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/product/:id/addtocart": AddToCartScreen,
  "/order": OrderScreen,
};

const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  $("#header").html(HeaderScreen.render());
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  $("#main").html(await screen.render());
  if (screen.after_render) {
    await screen.after_render();
  }
  $("#footer").html(FooterScreen.render());
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
