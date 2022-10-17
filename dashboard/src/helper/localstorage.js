export const setSubcategory = (subItem) => {
  localStorage.setItem("category", JSON.stringify(subItem));
};
export const getSubcategory = () => {
  const Subcategory = localStorage.getItem("category")
    ? JSON.parse(localStorage.getItem("category"))
    : [];
  return Subcategory;
};
export const removeSubcategory = () => {
  localStorage.removeItem("category");
};

export const getOptions = () => {
  const cartItems = localStorage.getItem("Items")
    ? JSON.parse(localStorage.getItem("Items"))
    : [];
  return cartItems;
};
export const setOptions = (item) => {
  localStorage.setItem("Items", JSON.stringify(item));
};
