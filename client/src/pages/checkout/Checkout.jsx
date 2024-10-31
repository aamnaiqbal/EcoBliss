import React, { useState, useRef } from "react";
import { useContext } from "react";
import { BsCashCoin } from "react-icons/bs";
import { FaCcVisa } from "react-icons/fa";
import { CartContext } from "../../store/CartContext";
import Item from "./Item";

import StripeCheckout from 'react-stripe-checkout';
import { AuthContext } from "../../store/AuthContext";

const Checkout = () => {
    const {cartItems, subtotal}=useContext(CartContext)
    const {auth}= useContext(AuthContext)
    const [shippingCharges]= useState(500)
    const [paymentMethod, setPaymentMethod]= useState("Cash on Delivery")

    const fullname = useRef(null);
    const address = useRef(null);
    const phoneNo= useRef(null);
    const cardNo= useRef(null);
    const expirationDate= useRef(null);
    const securityCode= useRef(null);
    const nameOnCard= useRef(null);

    console.log(cartItems)

    const handleCheckout=()=>{
      const orderData ={
        customerId: auth.id,
        items: cartItems.map((item)=>({
          productId: item.productId._id,
          modelType:  item.productType,
          name: item.productId.name,
          quantity: item.quantity ,
          size: item.size,
          price: item.size? item.productId.size[item.size] : item.productId.price
        })),
        shippingCharges,
        totalAmount: shippingCharges+subtotal,
        paymentMethod,
        shippingDetails:{
          fullName: fullName.current.value,
          address: address.current.value,
          phoneNo: phoneNo.current.value
        }
      }

      console.log(orderData)
    }



  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-16 pt-44 flex gap-4 mb-8">
      <div className="w-1/2">
        <div>
          <h3 className="marcellus font-medium text-xl mb-8">Delivery</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full name"
              className="border border-grey p-[10px] rounded-md outline-none"
              ref={fullname}
            />
            <input
              type="text"
              placeholder="Address"
              className="border border-grey p-[10px] rounded-md outline-none"
              ref={address}
            />
            <input
              type="number"
              placeholder="Phone Number"
              className="border border-grey p-[10px] rounded-md outline-none"
              ref={phoneNo}
            />
          </div>
        </div>
        <div className="mt-8">
          <h3 className="marcellus font-medium text-xl ">Payment</h3>
          <div
            className={`btn  text-white text-lg bg-lightGreen  hover:bg-lightestGreen hover:text-white outline-none border-0 w-full mt-8 flex items-center justify-center gap-4`}
            onClick={()=>setPaymentMethod("Cash on Delivery")}
          >
            <BsCashCoin size={24} /> <span>Cash On Delivery</span>
          </div>
          <div
            className={`btn  text-white text-lg bg-lightGreen  hover:bg-lightestGreen hover:text-white outline-none border-0 w-full mt-8 flex items-center justify-center gap-4 }`}
            onClick={()=>setPaymentMethod("Card")}
          >
            <FaCcVisa size={24} /> <span>Pay with Card</span>
          </div>
          <div className={`flex flex-col gap-4 border border-grey px-4 py-8 rounded-md ${paymentMethod!=="Cash on Delivery"? "flex": "hidden"}`}>
            <input
              type="number"
              placeholder="Card Number"
              className="border border-grey p-[10px] rounded-md outline-none"
              ref={cardNo}
            />
            <input
              type="text"
              placeholder="Expiration Date (MM/YY)"
              className="border border-grey p-[10px] rounded-md outline-none"
              ref={expirationDate}
            />
            <input
              type="text"
              placeholder="Security Code"
              className="border border-grey p-[10px] rounded-md outline-none"
              ref={securityCode}
            />
            <input
              type="text"
              placeholder="Name on Card"
              className="border border-grey p-[10px] rounded-md outline-none"
              ref={nameOnCard}
            />
            <button
              className={`btn  text-white text-lg bg-lightGreen  hover:bg-lightestGreen hover:text-white outline-none border-0 mt-4 w-1/2 mx-auto`}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 border border-[#CAD6F1] px-4  h-max">
        <div>{cartItems.map((item, i)=><Item key={i} item={item}/>)}</div>
        <div className="px-4 pb-8">
          <div className="flex justify-between petrona text-lg font-semibold">
            <p>Subtotal</p>
            <p>Rs. {subtotal}</p>
          </div>
          <div className="flex justify-between petrona text-lg font-semibold border-b border-grey pb-4">
            <p>Shipping</p>
            <p>Rs. {shippingCharges}</p>
          </div>
          <div className="flex justify-between petrona text-2xl font-bold ">
            <p>Total</p>
            <p>Rs. {subtotal+shippingCharges}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
