import React from 'react'
import checkMark from "/images/checkout/CheckMark.png"
import { useLocation } from 'react-router-dom'

const OrderMessage = () => {
    const location= useLocation();
    const {orderId}=location.state 
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-16 pt-64 flex flex-col justify-center items-center'>
        <img src={checkMark} className='h-28'/>
        <p className='text-2xl font-medium petrona mt-4'>Your order has been confirmed!</p>
        <p className='grey marcellus text-lg text-grey'>Your Order ID: {orderId}</p>
    </div>
  )
}

export default OrderMessage