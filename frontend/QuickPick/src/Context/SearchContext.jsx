import React, { createContext, useContext, useEffect, useState } from "react";

import { addCart, getAllProducts, getUserCart, updateCart } from "../../api";
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const SearchContext = createContext();


export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};


export const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cart, setCart] = useState({})
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    category: [],
    subCategory: [],
    sort: "",
    priceMin: 100,
    priceMax: 100000
  });

 const getProducts = async () => {
const params = new URLSearchParams();


params.append("page", page);
params.append("limit", limit);
params.append("priceMin", filters.priceMin)
params.append("priceMax", filters.priceMax)

filters.category.forEach(c => params.append("category", c));
filters.subCategory.forEach(sc => params.append("subCategory", sc));
if (filters.sort) params.append("sort", filters.sort);


const response = await getAllProducts(params.toString());


setProducts(response.data.products);
setTotalPages(response.data.totalPages);
 }



useEffect(() => {
getProducts();
}, [page, filters]);
  const nextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1); // safer functional update
      getProducts(page + 1, limit); // fetch next page
    }
  };


  const prevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
      getProducts(page - 1, limit); // fetch previous page
    }
  };


  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );


  const Login = (jwttoken) => {
    localStorage.setItem("token", jwttoken)
    setToken(jwttoken)
  }

  const Logout = () => {
    localStorage.removeItem("token")
    setToken("")
  }


  const cartCount = () => {
    let totalCount = 0
    for (const items in cart) {
      for (const item in cart[items]) {
        if (cart[items][item] > 0) {
          totalCount += cart[items][item]

        }

      }

    }
    return totalCount

  }

  const addToCart = async (itemId, size) => {

    try {
      let cartData = structuredClone(cart)
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1


        }
        else {
          cartData[itemId][size] = 1
        }
      }
      else {
        cartData[itemId] = {}
        cartData[itemId][size] = 1
      }
      setCart(cartData)

      await addCart({

        productId: itemId,
        size: size,
      })
    } catch (error) {
      toast.warn(error.message, {
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






  }
  useEffect(() => {
    console.log(cart)

  }, [cart])

  const updateQuantity = async (itemId, size, quantity) => {
    try {
      if (quantity == 100) {
        return toast.warn("cannot add more than 100 quantity", {
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
      let cartData = structuredClone(cart)
      cartData[itemId][size] = quantity
      setCart(cartData)


      await updateCart({
        productId: itemId,
        size,
        quantity
      })

    } catch (error) {
      toast.warn(error.message, {
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


  }

  const getCartData = async () => {
    try {
      if (token) {
        const response = await getUserCart()
        const result = response.data?.cartData
        setCart(result)


      }



    } catch (error) {
      toast.warn(error.message, {
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

  }

  useEffect(() => {
    getCartData()

  }, [])

  const getTotalAmount = () => {
    const deliveryFee = 50
    let total = 0;
    for (const productId in cart) {
      for (const size in cart[productId]) {
        const quantity = cart[productId][size];
        if (quantity > 0) {
          const product = products.find((p) => p._id === productId);
          if (product) total += product.price * quantity;
        }
      }
    }
    return total;
  };




  const toggleSearch = () => {
    navigate("/collections")
    setShowSearch((prev) => !prev);

  }

  const value = {
    searchText,
    setSearchText,
    showSearch,
    setShowSearch,
    toggleSearch,
    addToCart,
    setCart,
    cart,
    cartCount,
    updateQuantity,
    getTotalAmount,
    Login,
    Logout,
    token,
    products,
    page,
    limit,
    totalPages,
    nextPage,
    prevPage,
    
    getProducts,
    
    filters,
    setFilters

  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
