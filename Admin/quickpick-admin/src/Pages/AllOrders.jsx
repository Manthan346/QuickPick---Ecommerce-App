import { Card, CardContent } from '../components/ui/card'
import { allOrders, updateShippingAndStatus } from '../api'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import { toast, Bounce } from 'react-toastify';
import { Badge } from '@/components/ui/badge'
import { useAuth } from '../Context/AuthContext';
import { Spinner } from '@/components/ui/spinner'


function AllOrders() {
    const { ordersPage, totalPages, limit, ordersNextPage, ordersPrevPage, setTotalPages } = useAuth()
    const [Orders, setOrders] = useState([])
    const [loading ,setLoading] = useState(false)
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
      try {
   
        setLoading(true)
          const params = new URLSearchParams()


          params.append("page", ordersPage);
          params.append("limit", limit);
          const response = await allOrders(params.toString())
          const result = setOrders(response.data.orders)
          setTotalPages(response.data.totalPages);

      } catch (error) {
        toast.error(error.message)
        
      } finally {
        setLoading(false)
      }




    }

    useEffect(() => {
       
        fetchAllOrders()

    }, [ordersPage])

    const postStatusAndShipping = async (orderId, orderStatus, shippingDetails) => {
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
        <div>
            <h1 className="text-2xl">All Orders</h1>
            <div>
                <Card className="hidden sm:block shadow-2xl  ">
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
            {Orders.map((order, index) => (
                <Card className="border-t-0" key={order._id}>
                    <CardContent>
                        <div
                            key={order._id || index}
                            className="grid grid-cols-1 sm:grid-cols-6 gap-4 "
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
                                {loading ? (
                                    <Button disabled className="mt-2 sm:mt-0">
                                        <Spinner className="mr-2" />
                                        Loading...
                                    </Button>
                                ) : (
                                     <Button className="mt-2 sm:mt-0" onClick={() => postStatusAndShipping(order._id, order.orderStatus, order.shippingDetails)}>Update Details</Button>
                                )}
                               
                            </div>

                        </div>
                    </CardContent>
                </Card>
            ))}
            <div className="flex items-center justify-center mt-4 space-x-4">
                <Button disabled={ordersPage === 1} onClick={ordersPrevPage}>Prev</Button>
                <span>{ordersPage} / {totalPages}</span>
                <Button disabled={ordersPage === totalPages} onClick={ordersNextPage}>Next</Button>
            </div>

        </div>
    )
}

export default AllOrders