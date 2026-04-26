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

export const registerUser = (data) => {
   return API.post("user/register", data)
}

export const loginUser = (data) => {
   return API.post("/user/login", data)
}

export const getAllProducts = (queryString) => {
return API.get(`product/listproducts?${queryString}`);
};

export const addCart = (data) => {
   return API.post("cart/addtocart", data)
}

export const updateCart = (data) => {
   return API.post("cart/updatecart", data)
}

export const getUserCart = () => {
   return API.get("cart/getcart")
}

export const placeOrder = (data) => {
   return API.post("orders/placeorder",data)
}

export const  userName = () => {
   return API.get("user/username")
}

export const userOrder = () => {
   return API.get("orders/yourorders")
}

export const invoiceDownload = (orderId) => { 
   window.open( `${import.meta.env.VITE_API_URL2}/api/v1/pdf/downloadinvoice/${orderId}`, 
      "_blank" ) }


export const handleStripePayment = async (payload) => {
  try {
    const res = await API.post("/orders/stripePayment", payload);
    
    // 🔥 Stripe Checkout redirect
    window.location.href = res.data.url;
  } catch (error) {
    console.error(error);
  }
};