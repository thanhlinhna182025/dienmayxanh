import axios from "axios";
import { baseUrl } from "./ultils";
export const PF = "http://localhost:4000/";
export const uploadImageSingle = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/v1/api/upload/single`, data);
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const getCityData = async () => {
  try {
    const cities = await fetch("https://provinces.open-api.vn/api/p").then(
      (data) =>
        data.json().then((data) =>
          data.map(function (item) {
            return { name: item.name, code: item.code };
          })
        )
    );
    return cities;
  } catch (error) {
    console.log(error);
  }
};

export const getDistrictData = async (code) => {
  try {
    const districts = await fetch(
      `https://provinces.open-api.vn/api/p/${code}?depth=2`
    )
      .then((data) => data.json())
      .then((data) => data.districts)
      .then((data) =>
        data.map((item) => {
          return { name: item.name, code: item.code };
        })
      );
    return districts;
  } catch (error) {
    console.log(error);
  }
};
export const getWardData = async (code) => {
  try {
    const wards = await fetch(
      `https://provinces.open-api.vn/api/d/${code}?depth=2`
    )
      .then((data) => data.json())
      .then((data) => data.wards)
      .then((data) =>
        data.map((item) => {
          return { name: item.name, code: item.code };
        })
      );
    return wards;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImageMultiple = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/v1/api/upload/multiple`,
      data
    );
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
//Thương hiệu
export const createBrand = async (newBrand) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/brand/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: newBrand,
    });
    if (response.statusText !== "Created") {
      throw new Error("Error creating brand");
    }
    return response.data;
  } catch (error) {
    return {
      error: error.response ? error.response.data : error.message,
    };
  }
};

export const getAllBrand = async () => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/brand`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data.brands;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const getOneBrand = async (id) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/brand/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data.brand;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const updateBrand = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/brand/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};

export const updateStatusBrand = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/brand/${id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
// Nhà cung cấp
export const createSupplier = async (newSupplier) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/supplier/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: newSupplier,
    });
    if (response.statusText !== "Created") {
      throw new Error("Error creating brand");
    }
    return response.data;
  } catch (error) {
    return {
      error: error.response ? error.response.data : error.message,
    };
  }
};

export const getAllSupplier = async () => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/supplier`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data.suppliers;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const getOneSupplier = async (id) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/supplier/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data.supplier;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const updateSupplier = async (id, update) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/supplier/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: update,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const changeStatusSupplier = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/supplier/${id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};

//Danh mục
export const createCategory = async (newCategory) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/category`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: newCategory,
    });
    if (response.statusText !== "Created") {
      throw new Error("Error creating category");
    }
    return response.data;
  } catch (error) {
    return {
      error: error.response ? error.response.data : error.message,
    };
  }
};

export const getAllCategory = async () => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/category`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data.category;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const getOneCategory = async (id) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/category/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data.category;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/category/${id}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const updateCategory = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/category/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const changeStatusCategory = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/category/${id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
// //Danh mục
export const createSubcategory = async (newSubcategory) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/subcategory`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: newSubcategory,
    });
    if (response.statusText !== "Created") {
      throw new Error("Error creating category");
    }
    return response.data;
  } catch (error) {
    return {
      error: error.response ? error.response.data : error.message,
    };
  }
};

export const getAllSubcategory = async () => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/subcategory`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data.Subcategory;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data : error.message,
    };
  }
};
export const getOneSubcategory = async (id) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/subcategory/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data.Subcategory;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const updateSubcategory = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/subcategory/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const updateStatusSubcategory = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/subcategory/${id}/status`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const deleteSubcategory = async (id) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/subcategory/${id}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};

// Chương trình khuyến mãi
export const createPromotion = async (newPromotion) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/promotion`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: newPromotion,
    });
    if (response.statusText !== "Created") {
      throw new Error("Error creating category");
    }
    return response.data;
  } catch (error) {
    return {
      error: error.response ? error.response.data : error.message,
    };
  }
};
export const getAllPromotion = async () => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/promotion`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data.promotions;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const getOnePromotion = async (id) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/promotion/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data.promotion;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const addProductPromotion = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/promotion/${id}/add`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const updatePromotion = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/promotion/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const updateStatusPromotion = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/promotion/${id}/status`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const deletePromotion = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/promotion/${id}/delete`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
//Sản phẩm
export const createProduct = async (newProduct) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/product`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: newProduct,
    });
    if (response.statusText !== "Created") {
      throw new Error("Error creating category");
    }
    return response.data;
  } catch (error) {
    return {
      error: error.response ? error.response.data : error.message,
    };
  }
};

export const getAllProduct = async (
  search = "",
  page = 1,
  limit = 5,
  sort = ""
) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/product?search=${search}&page=${page}&limit=${limit}&sort=${sort}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const getOneProduct = async (id) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/product/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data.product;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const updateStatusProduct = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/product/${id}/status`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
export const updateProduct = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/v1/api/admin/product/${id}/edit`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.statusText !== "OK") {
      throw new Error("Server Error");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
};
