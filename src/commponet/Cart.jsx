import React from 'react'
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CartItem from './CartItem';

export default function Cart() {

  const cartarr = useSelector(((state) => state));
  console.log("printing cart data", cartarr.cart)
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalitem, setTotalitem] = useState(0);
  useEffect(() => {
    setTotalitem(cartarr.cart.reduce((acc, curr) => acc + curr.amount, 0));
    const totalamount = cartarr.cart.reduce((acc, curr) => acc + (curr.amount * (curr.price)), 0)
    setTotalAmount(totalamount.toFixed(2));
  }, [cartarr.cart]);
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script);
    })
  }
  const buyItem = async () => {
    try {
      console.log("inside buy course", courses)
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        toast.error("RazorPay SDK failed to load")
        return;

      }
      const orderResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/capturePayment`,
        { totalAmount },
        { withCredentials: true }
      )
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message);
      }
      console.log("printing order response", orderResponse)
      const optation = {
        key: "rzp_test_t4LUM04KXw6wHc",
        order_id: orderResponse.data.message.id,
        currency: orderResponse.data.message.currency,
        amount: orderResponse.data.message.amount,
        description: "Thank You for Purchasing the Course",
        name: "e-mart",
        image: userDetails.image,
        handler: function (response) {
          verifyPayment({ ...response })
        }

      }
      const paymentObject = new window.Razorpay(optation)
      paymentObject.open();
      paymentObject.on("payment.failed", (response) => {
        toast.error("Opps,payment is failed")
        console.log("error accure in payment", response);
      })
    } catch (error) {
      console.log("something went to wrong while payment and errror is", error)
      toast.error("payment faile! try again")
    }

  }
  const verifyPayment = async (bodydata) => {
    const toastId = toast.loading("verifying payment...")

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/verifyPayment`,
        bodydata,
        { withCredentials: true }
      )
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("payment Successful, ypou are addded to the course");
      navigate("/home");
    
    }
    catch (error) {
      console.log("PAYMENT VERIFY ERROR....", error);
      toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    // dispatch(setPaymentLoading(false));
  }
  return (
    <div>
      {
        cartarr.cart.length > 0 ?
          (<div className='w-full flex '>
            <div className='w-[1200px] '>{cartarr.cart.map((cartitem) => {
              return <CartItem key={cartitem.id} item={cartitem} />
            })}

            </div>
            <div className='h-full flex flex-col item-center space-y-3 mt-10'>
              <div className=' space-y-3'>
                <p className='text-4xl font-bold'>Your cart</p>
                <h2 className='text-3xl mt-3 text-green-700 font-extrabold'>Summary</h2>
                <p className='text-2xl font-semibold'>Total item:-<span className='text-green-600'>{totalitem}</span></p>
              </div >
              <p className='text-white bg-green-800 p-3 rounded-lg font-semibold' >Total Amount:-{totalAmount}</p>
              <button type='button' className='text-white bg-green-800 p-3 rounded-lg font-semibold' onClick={() => { buyItem() }}>Check Out</button>
            </div>
          </div>) :
          (<div className='w-[90vw] h-[90vh] flex   translate-x-[50%] translate-y-[50%] -mt-10'>
            <div className='flex flex-col '>
              <div className='text-2xl font-semibold '>cart is empty</div>
              <NavLink to="/">
                <button className=' bg-green-700 text-white text-xl font-medium rounded-lg py-4 px-3'><p>Show product</p></button>
              </NavLink>
            </div>
          </div>)

      }
    </div>
  )
}
