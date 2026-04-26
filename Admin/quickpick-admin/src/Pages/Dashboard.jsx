
import { Sidebar, SidebarTrigger } from '../components/ui/sidebar'
import React from 'react'
import ShowBarChart from '../components/ShowBarChart'
import PieChartWithCustomizedLabel from '../components/PieChart'
import CustomActiveShapePieChart from '../components/PieChart'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import DataCard from '../components/DataCard'
import { ShoppingCart } from 'lucide-react';
import { IndianRupee,PackageCheck,ClipboardClock ,Users   } from 'lucide-react';
import { useState, useEffect } from 'react'
import { allOrders, revenueAndOrderData } from '../api'
import { Badge } from '../components/ui/badge'
import { Select,SelectTrigger,SelectItem,SelectGroup,SelectValue,SelectContent } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAuth } from '../Context/AuthContext'
import { updateShippingAndStatus } from '../api'
import {  toast,Bounce } from 'react-toastify';

function Dashboard() {
  
    const {dashboardStats} = useAuth()
      const [Orders, setOrders] = useState([])
      const convertdate = (date) => {
          return new Date(date).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric"
          })
      }
      const fetchAllOrders = async () => {
          const response = await allOrders()
          const result = setOrders(response.data.orders)
  
      }
             useEffect(() => {
          fetchAllOrders()
          
  
      }, [])
  
       const postStatusAndShipping = async (orderId,orderStatus,shippingDetails) => {
              try {
                  await updateShippingAndStatus({
                      orderId,
                      orderStatus,
                      shippingDetails,
                      
                      
      
      
                  })
                  toast.success('details updated successfully', {
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
                  toast.error(error.message, {
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
   
  
  return (
   
      <>
      <div className="">
        <div className="grid grid-cols-1 gap-6  w sm:grid-cols-4">
        <DataCard className="" img={<IndianRupee />} data={dashboardStats.revenue} text="total revenue"   />
         <DataCard img={<PackageCheck  />} data={dashboardStats.delivered} text="orders delivered"   />
          <DataCard img={<ClipboardClock  />} data={dashboardStats.placed} text="orders pending"  />
           <DataCard img={<Users  />} data={dashboardStats.totalUsers} text="total users" />
           

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-4">
         
          <div >
             <Card className="bg-background">
              <CardHeader className="text-2xl font-bold">Last 6 month revenue</CardHeader>
            <ShowBarChart />
            </Card>
          </div>
          <div className="">
            <Card className="bg-background">
            <CardHeader className="text-2xl font-bold">Orders stats</CardHeader>
           
            <PieChartWithCustomizedLabel />
             </Card>
          </div>

        </div>
         <div className="mt-7">
            <h1 className="text-2xl font-bold">Recent Orders</h1>
            <div className="mt-3">
                <Card className="hidden sm:block shadow-2xl ">
                    <CardContent className="grid grid-cols-1  sm:grid-cols-6">
                        <p>Order ID</p>
                        <p>Items</p>
                        <p>Order Date</p>
                        <p>Order Status</p>
                        <p>Shipping Details</p>
                        <p className="ml-7">Action</p>
                    </CardContent>
                </Card>
            </div>
            {Orders.slice(0,5).map((order, index) => (
                <Card className="" key={order._id}>
                    <CardContent>
                        <div
                            key={order._id || index}
                            className="grid grid-cols-1 sm:grid-cols-6 gap-4"
                        >


                            <div className="">
                                <p className="text-sm font-semibold sm:hidden">Order ID</p>
                               <Badge className="bg-chart-1"><p>{order._id}</p></Badge> 
                            </div>

                            <div>
                                <p className="text-sm font-semibold sm:hidden">Items</p>
                                {order.items.length}
                                </div>
                            <div>
                                 <p className="text-sm font-semibold sm:hidden">Order Date</p>
                                {convertdate(order.createdAt)}</div>
                            <div>
                                 <p className="text-sm font-semibold sm:hidden">Order Status</p>
                                <Select
                                    value={order.orderStatus}
                                    onValueChange={(value) => {
                                        const updatedOrders = Orders.map((o) =>
                                            o._id === order._id ? { ...o, orderStatus: value } : o
                                        )
                                        setOrders(updatedOrders)
                                    }}
                                >
                                    <SelectTrigger className="w-50">
                                        <SelectValue placeholder="Select order status" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="placed">Placed</SelectItem>
                                        <SelectItem value="shipped">Shipped</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                 <p className="text-sm font-semibold sm:hidden">Shipping Details</p>
                                <Textarea
                                    value={order.shippingDetails || ""}
                                    onChange={(e) => {
                                        const updatedOrders = Orders.map((o) =>
                                            o._id === order._id
                                                ? { ...o, shippingDetails: e.target.value }
                                                : o
                                        )
                                        setOrders(updatedOrders)
                                    }}
                                    placeholder="Enter shipping address"
                                />
                            </div>
                            <div className="sm:ml-5 sm:mt-3 ">
                                  <p className="text-sm font-semibold sm:hidden">Action</p>
                                <Button className="mt-2 sm:mt-0" onClick={() => postStatusAndShipping(order._id, order.orderStatus, order.shippingDetails)}>Update Details</Button>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
        
      </div>
   
      </>
  
  )
}

export default Dashboard