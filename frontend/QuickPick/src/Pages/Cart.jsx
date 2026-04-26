import React, { useEffect, useState } from "react"

import { useSearch } from "../Context/SearchContext"
import { useRecoilValue } from "recoil"
import { currency } from "../Recoil/atoms"
import { Card, CardContent, CardDescription, CardTitle } from "../components/ui/card"
import { Trash2 } from "lucide-react"
import Title from "../components/Title"
import { Button } from "../components/ui/button"
import { motion } from "motion/react"
import CartTotal from "../components/CartTotal"
import { ToastContainer, toast } from 'react-toastify';


function Cart() {
  const { cart, updateQuantity, getTotalAmount, products } = useSearch()
  const curr = useRecoilValue(currency)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempdata = []
      for (const items in cart) {
        for (const item in cart[items]) {
          if (cart[items][item] > 0) {
            tempdata.push({
              _id: items,
              size: item,
              quantity: cart[items][item],
            })
          }

        }
      }
      setCartData(tempdata)
    }


  }, [cart, products])

  const totalQty = cartData.reduce((sum, i) => sum + i.quantity, 0)

  if (totalQty > 100) {
    toast.warn("Max 100 items allowed")


  }

  if (cartData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col items-center justify-center text-gray-600"
      >
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h1>
        <p className="text-sm text-gray-500">Add some products to continue shopping!</p>
      </motion.div>
    )
  }


  return (
    <div className="border-t pt-10  md:px-10 w-full min-h-screen ">
      <div className="mb-10 text-center">
        <Title title1="YOUR" title2="CART" />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 ">

        <div className="flex-1 space-y-1 font-sans text-shadow-md">


          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)
            return (
              <Card
                key={index}
                className="rounded-2xl  hover:shadow-xl transition-shadow duration-300 border shadow-2xl border-gray-100"
              >
                <CardContent className="flex items-center justify-between p-1 h-17">
                  <div className="flex items-center space-x-4 ">
                    <img
                      src={productData.image[0]}
                      alt={productData.name}
                      className="w-30 h-30 rounded-lg shadow-md object-cover"
                    />
                    <div>
                      <CardTitle className="text-base text-gray-800 font-semibold">
                        {productData.name}
                      </CardTitle>
                      <CardTitle className="text-sm text-gray-600 mt-1">
                        {curr}
                        {productData.price.toLocaleString()}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        Size: {item.size.toUpperCase()}
                      </CardDescription>
                    </div>
                  </div>
                  <input type="number" onChange={(e) => {
                    const value = Number(e.target.value)

                    if (value < 1) return

                    if (totalQty - item.quantity + value > 100) {
                      toast.warn("Max 100 items allowed")
                      return
                    }

                    updateQuantity(item._id, item.size, value)
                  }} className="border-foreground w-10" min={1} max={100} defaultValue={item.quantity} />
                  <button className="text-gray-400 hover:text-red-500 transition " >
                    <Trash2 size={20} onClick={() => updateQuantity(item._id, item.size, 0)} />
                  </button>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className='flex flex-col '>
          <CartTotal />
        </div>
      </div>


    </div>
  )
}

export default Cart
