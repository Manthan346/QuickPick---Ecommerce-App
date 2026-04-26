import axios from 'axios'


const API = axios.create({

     baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1"

})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginAdmin = (data) => {
  return  API.post("/user/admin", data)
}

export const addProduct = (formdata) => {
  return API.post("/product/addproduct", formdata);
};

export const removeProduct = (id) => {
  return API.delete(`/product/deleteproduct/${id}`)
}

export const listItems = (query) => {
  return API.get(`/product/listproducts?${query}`)
}

export const updateItems = (id, updateData) => {
return API.put(`/product/editproduct/${id}`, updateData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const getProduct = (id) => {
  return API.get(`/product/productinfo?productId=${id}`)

}

export const allOrders = (query) => {
  return API.get(`/orders/allorders?${query}`)
}

export const updateShippingAndStatus = (data) => {
  return API.post("/orders/shippingdetails",data)

}

export const montlyIncome = () => {
  return API.get("/data/monthlyincome")
}

export const revenueAndOrderData = () => {
  return API.get("/data/totalincomeAndOrderStats")
}
