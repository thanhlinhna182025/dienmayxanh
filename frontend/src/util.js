export const showLoading = () => {
  document.getElementById("overlay").classList.add("active");
};
export const hideLoading = () => {
  document.getElementById("overlay").classList.remove("active");
};
