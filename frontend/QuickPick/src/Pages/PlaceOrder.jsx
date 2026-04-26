  import { Input } from "../components/ui/input"
  import { Label } from "../components/ui/label"
  import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
  import { Button } from "../components/ui/button"
  import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
  import { assets } from "../assets/assets"
  import CartTotal from "../components/CartTotal"
  import {useLocation} from 'react-router-dom'
  import { useState } from "react"
  import { handleStripePayment, placeOrder } from "../../api"
  import {toast} from 'react-toastify'

  export default function PlaceOrder() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: ""
  })

    const [payment, setPayment] = useState('cod')
    const handlePayment = async () => {
      
     
        try {
    switch (payment) {

      case "stripe": {
        // 🔥 ONLY Stripe flow
        await handleStripePayment({
          address: form,
          paymentMethod: "stripe"
        });
        break; // ⛔ yahin ruk jao
      }

      case "razorPay": {
        console.log("razorpay payment called");
        // future razorpay logic
        break;
      }

      case "cod": {
        // ✅ COD flow
        const payload = {
          address: form,
          paymentMethod: "cod"
        };

        const res = await placeOrder(payload);

        if (res.data.success) {
          toast.success("Order placed successfully 🎉");
        }
        break;
      }

      default: {
        toast.error("Invalid payment method");
      }
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Payment failed");
  }
      
    }


    return (
      <div className="flex flex-col lg:flex-row  gap-7 max-w-7xl mx-auto p-4">
        {/* LEFT SIDE - Address Form */}
        <div className="flex-1 space-y-6">
          <Card className="border-0 shadow-xl hover:shadow-2xl ">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Shipping Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required  value={form.fullName} onChange={(e)=> setForm({...form, fullName: e.target.value})}    placeholder="John Doe" />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" required value={form.phone} onChange={(e)=> setForm({...form, phone: e.target.value})} placeholder="+91 9876543210" />
                </div>

                <div className="lg:col-span-2 flex flex-col gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required value={form.address} onChange={(e)=> setForm({...form, address: e.target.value})} placeholder="123 Main Street" />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required placeholder="New Delhi"  value={form.city} onChange={(e)=> setForm({...form, city: e.target.value})} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" required  value={form.state} onChange={(e)=> setForm({...form, state: e.target.value})} placeholder="Delhi" />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="pincode">Pin Code</Label>
                  <Input id="pincode" required  value={form.pincode} onChange={(e)=> setForm({...form, pincode: e.target.value})} placeholder="110001" />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" required value={form.country} onChange={(e)=> setForm({...form, country: e.target.value})} placeholder="India" />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* PAYMENT METHODS */}
        <Card className="border-0 shadow-xl hover:shadow-2xl w-full">
    <CardHeader>
      <CardTitle className="text-xl font-semibold">Payment Method</CardTitle>
    </CardHeader>

  <CardContent>
    <RadioGroup
    onValueChange={(value) => {
      console.log("Payment changed to:", value);
      setPayment(value);
    }}
    defaultValue="cod"
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
  >
    {/* Stripe */}
    <Label
      htmlFor="stripe"
      className="flex flex-row items-center justify-center gap-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition"
    >
      <RadioGroupItem value="stripe" id="stripe" className="border-accent-foreground" />
      <img
        src={assets.stripe}
        alt="Stripe Logo"
        className="w-20 h-auto opacity-80 hover:opacity-100 transition"
      />
      
    </Label>

    {/* Razorpay */}
    

    {/* Cash on Delivery */}
    <Label
      htmlFor="cod"
      className="flex flex-row items-center justify-center gap-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition"
    >
      <RadioGroupItem value="cod" id="cod" className="border-accent-foreground" />
      <span className="text-sm font-medium">Cash on Delivery</span>
    </Label>
  </RadioGroup>

  </CardContent>

  </Card>

        </div>

        {/* RIGHT SIDE - Cart Summary */}
        <div className="flex-3 lg:max-w-sm flex flex-col items-center gap-2">
          <CartTotal handlePayment={handlePayment} />
        </div>
      </div>
    )
  }
