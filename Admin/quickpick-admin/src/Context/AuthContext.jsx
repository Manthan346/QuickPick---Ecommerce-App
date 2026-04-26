
import { createContext, useContext, useEffect, } from "react";
import { useState } from "react";
import { allOrders, listItems, revenueAndOrderData } from "../api";
import {  toast,Bounce } from 'react-toastify';
import { getProduct } from "../api";






const AuthContext = createContext()




export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [productPage, setProductPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [totalPages, setTotalPages] = useState(1);

  const [ordersPage, setOrdersPage] = useState(1)

    const productNextPage = () => {
    if (productPage < totalPages) {
      setProductPage(prev => prev + 1); 
      listItems(productPage + 1, limit); 
    }
  };

  const productPrevPage = () => {
    if (productPage > 1) {
      setProductPage(prev => prev - 1);
      listItems(productPage - 1, limit); 
    }
  };

      const ordersNextPage = () => {
    if (ordersPage < totalPages) {
      setOrdersPage(prev => prev + 1); 
      allOrders(ordersPage + 1, limit); 
    }
  };

  const ordersPrevPage = () => {
    if (ordersPage > 1) {
      setOrdersPage(prev => prev - 1);
      allOrders(ordersPage - 1, limit); 
    }
  };

  const Login = (jwttoken) => {
    localStorage.setItem("token", jwttoken)
    setToken(jwttoken)
  }

  const Logout = () => {
    localStorage.removeItem("token")
    setToken("")
  }

  const [dashboardStats, setDashboardStats] = useState({
    revenue: 0,
    placed: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    totalUsers: 0,
  });


  const fetchRevenueAndOrderData = async () => {
   try {
     const response = await revenueAndOrderData();
 
 
     const stats = response.data.totalRevenueAndOrderStats[0];
 
 
     setDashboardStats({
       revenue: stats.Revenue?.[0]?.totalRevenue || 0,
       placed: stats.pendingOrders?.[0]?.count || 0,
       shipped: stats.ordersShipped?.[0]?.count || 0,
       delivered: stats.ordersDelivered?.[0]?.count || 0,
       cancelled: stats.ordersCancelled?.[0]?.count || 0,
       totalUsers: response.data.totalusers?.[0]?.totalusers || 0,
     });

      toast.success('data fetch successfully', {
                     position: "top-right",
                     autoClose: 5000,
                     hideProgressBar: false,
                     closeOnClick: false,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                     theme: "light",
                     transition: Bounce,
                 });
   } catch (error) {
    toast.error('couldnt fetch data please refresh', {
                     position: "top-right",
                     autoClose: 5000,
                     hideProgressBar: false,
                     closeOnClick: false,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                     theme: "light",
                     transition: Bounce,
                 });
    
   }
  };
  useEffect(() => {
    fetchRevenueAndOrderData()
  }, [])




  return (
    <AuthContext.Provider value={{ token, Login, Logout, dashboardStats,ordersNextPage,ordersPrevPage, productPage,productNextPage,productPrevPage,totalPages,limit,setTotalPages,ordersPage }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
