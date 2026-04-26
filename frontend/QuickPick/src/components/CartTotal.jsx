import React from 'react'
import { useRecoilValue } from 'recoil'
import { currency } from '../Recoil/atoms'
import { useSearch } from '../Context/SearchContext'
import { Button } from './ui/button'
import {NavLink} from "react-router-dom"
import {useNavigate, useLocation} from 'react-router-dom'
import {motion} from 'motion/react'


function CartTotal({handlePayment}) {
  const { getTotalAmount } = useSearch()
  const curr = useRecoilValue(currency)
  const total = getTotalAmount()
 const navigate = useNavigate()
 const location = useLocation()
 const isPlaceOrder = location.pathname === '/placeOrder'
 console.log("Current path:", location.pathname)

 const handleCheckOut = () =>  {
  if (isPlaceOrder) {
    handlePayment?.()
  } else {
    navigate('/placeOrder')
  }
}
  

  const subtotal = total || 0
  const deliveryFee = 50
  const finalTotal = subtotal + deliveryFee
   if (total === 0){
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
    <div className="w-full lg:w-96 font-sans text-1xl">
      <div className="bg-background p-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Summary</h2>

        <div className="flex justify-between text-gray-700 mb-4">
          <span>Subtotal</span>
          <span className="font-medium">
            {curr}{subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-foreground mb-4">
          <span>Delivery Fee</span>
          <span className="font-medium">
            {curr}{deliveryFee}
          </span>
        </div>

        <div className="flex justify-between text-foreground mb-4">
          <span>Total Amount</span>
          <span className="font-medium">
            {curr}{finalTotal.toLocaleString()}
          </span>
        </div>

        <div className="border-t my-4" />

        <p className="text-sm text-foreground mb-2">Do you have a promotional code?</p>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter code"
            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 w-10"
          />
          <Button className="bg-foreground text-background px-4 rounded-r-lg hover:bg-gray-800 transition">
            Apply
          </Button>
        </div>
      
        <Button
        onClick={handleCheckOut}
        
         className="w-full bg-foreground text-background py-3 rounded-lg hover:bg-gray-800 transition font-semibold">
          {isPlaceOrder ? 'Pay' : 'Place Order'}
        </Button>
       
      </div>
    </div>
  )
}

export default CartTotal
