import React, { useEffect, useState } from "react"
import { invoiceDownload, userOrder } from "../../api"
import { Download } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Truck,Check,BadgeCheck,X } from 'lucide-react';
import { StepperDescription, Stepper, StepperIndicator, StepperItem, StepperTitle,StepperTrigger,StepperSeparator } from "../components/ui/stepper";

import {
  Card,
  CardContent,
  CardHeader,
} from "../components/ui/card"

import { Badge } from "../components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

function Order() {
  const [orders, setOrders] = useState([])
  const [deliverfee, setdeliverfee] = useState(0)

  //date logic
  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

  const getDeliveryStatus = (status) => {
    switch (status.toLowerCase()) {
      case "placed":
        return "bg-chart-5 text-background"
      case "shipped":
        return "bg-chart-1 text-background"
      case "delivered":
        return "bg-chart-2 text-white"
      case "cancelled":
        return "bg-destructive text-white"
      default:
        return "bg-muted"
    }
  }
  const getPaymentStatus = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-background bg-destructive"
      case "paid":
        return "text-background bg-chart-2"
    }

  }
  //api calls
  const getOrder = async () => {
    const response = await userOrder()

    // latest order first
    const getorder = response.data.order
    const getDeliveryfee = response.data.deliverfee


    setOrders(getorder)
    setdeliverfee(getDeliveryfee)
  }

  useEffect(() => {
    getOrder()
  }, [])

  const getInvoice = async (orderId) => {
    await invoiceDownload(orderId)

  }

  const getOrderSteps = (order) => [
    {
      step: 1,
      status: "placed",
      details: "order has been placed",
    },
    {
      step: 2,
      status: "shipped",
      details:
        order.orderStatus === "shipped" || order.orderStatus === "delivered"
          ? order.shippingDetails
          : "Waiting for shipment",
    },
     {
      step: 3,
      status: "delivered",
      details:
        order.orderStatus === "delivered"
          ? "Your order has been delivered"
          : "Not delivered yet",
    },
    {
      step: 4,
      status: "cancelled",
      details:
        order.orderStatus === "cancelled"
          ? "Your order has been cancelled"
          : "",
    },
   
    
  ];





const STATUS_TO_STEP = {
  placed: 1,
  shipped: 2,
  cancelled: 4,
  delivered: 3,
}


  return (
    <div className="mt-6 space-y-6">
      {orders.length === 0 && (
        <p className="text-center text-muted-foreground">
          No orders found
        </p>
      )}

      {orders.map((order) => {
        const steps = getOrderSteps(order)
        return (
          <Card key={order._id} className="shadow-xl">

            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-mono text-sm">{order._id}</p>
                {/* <p className="mt-2 text-sm text-muted-foreground">Payment method</p>
              <p>{order.paymentMethod}</p>
               <p className="mt-2 text-sm text-muted-foreground">Payment Satus</p>
              <p>{order.paymentStatus}</p> */}
              </div>

              <Badge className={getDeliveryStatus(order.orderStatus)}>
                {order.orderStatus === "shipped" && <Truck />}
                {order.orderStatus === "delivered" && <Check />}
                {order.orderStatus === "cancelled" && <X  />}
                {order.orderStatus === "placed" && <BadgeCheck  />}
                {order.orderStatus}
              </Badge>
            </CardHeader>


            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <p>
                <span className="text-muted-foreground">Items:</span>{" "}
                {order.items.length}
              </p>
              <p>
                <span className="text-muted-foreground">Order Date:</span>{" "}
                {formatDateTime(order.createdAt)}
              </p>
              <p className="font-semibold">
                Total: ₹{order.totalAmount}
              </p>
            </CardContent>


            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value={order._id}>
                  <AccordionTrigger className="text-sm font-medium">
                    View full order details
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* ---------- Products ---------- */}
                      <div className="lg:col-span-8 space-y-6 font-mono">
                        {order.items.map((product) => (
                          <div
                            key={product._id}
                            className="flex gap-4 items-start border-b pb-6"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-20 w-20 rounded-xl object-cover"
                            />

                            <div className="flex-1">
                              <h2 className="text-lg font-semibold">
                                {product.name}
                              </h2>
                              <p className="text-sm text-muted-foreground">
                                Size: {product.size}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {product.quantity}
                              </p>
                            </div>

                            <div className="font-bold text-lg">
                              ₹{product.price * product.quantity}
                            </div>

                          </div>



                        ))}
                        {/* {orders.map((item,index) => (
                      <Card>
                        <CardHeader>payment Method</CardHeader>
                        <CardContent>{item.paymentMethod}</CardContent>
                      </Card>
                     ))} */}
                        <Card>
                          <CardHeader className="text-2xl font-bold">Payment Method</CardHeader>
                          <CardContent className="sm:text-xl">{order.paymentMethod}</CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="text-2xl font-bold">Payment Status</CardHeader>
                          <CardContent><Badge className={`${getPaymentStatus(order.paymentStatus)} sm:text-xl`}>{order.paymentStatus}</Badge></CardContent>
                        </Card>
                      </div>




                      <div className="lg:col-span-4">
                        <Card className="border-muted font-mono">
                          <CardHeader className="text-xl font-bold">
                            Order Summary
                          </CardHeader>

                          <CardContent className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="font-bold">Subtotal</span>
                              <span className="font-bold">₹{order.totalAmount - deliverfee} </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="font-bold">Delivery</span>
                              <span className="font-bold"> ₹{deliverfee}</span>
                            </div>

                            <div className="flex justify-between font-bold text-lg border-t pt-3">
                              <span>Total</span>
                              <span>₹{order.totalAmount}</span>
                            </div>
                          </CardContent>
                        </Card>
                       {order.orderStatus === "delivered" ?  <Card className="mt-5">
                          <CardHeader className="font-mono font-bold text-xl">Download Invoice</CardHeader>
                          <CardContent > <Button className="w-full" onClick={() => getInvoice(order._id)}><Download /> Click here to Download</Button></CardContent>
                        </Card> : ""}
                        <Card className="mt-5">
                          <CardHeader className="text-xl font-bold font-mono">Order Status</CardHeader>
                          <CardContent>
                            <Stepper value={STATUS_TO_STEP[order.orderStatus] || 1} orientation="vertical">
                              {steps.map(({ step, status, details }) => (
                                <StepperItem
                                  key={step}
                                  step={step}
                                  className="relative items-start [&:not(:last-child)]:flex-1"
                                >
                                  <StepperTrigger className="items-start pb-12 last:pb-0">
                                    <StepperIndicator />
                                    <div className="mt-0.5 space-y-0.5 px-2 text-left">
                                      <StepperTitle className="font-bold font-mono text-lg completed">{status}</StepperTitle>
                                      <StepperDescription>{details}</StepperDescription>
                                    </div>
                                  </StepperTrigger>
                                  {step < steps.length && (
                                    <StepperSeparator className="absolute inset-y-0 left-3 top-[calc(1.5rem+0.125rem)] -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                                  )}
                                </StepperItem>
                              ))}
                            </Stepper>



                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default Order
