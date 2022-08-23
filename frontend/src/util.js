export const showLoading = () => {
  document.getElementById("overlay").classList.add("active_loading");
};
export const hideLoading = () => {
  document.getElementById("overlay").classList.remove("active_loading");
};
