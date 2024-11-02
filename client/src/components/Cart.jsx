import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/CartContext";
import { AuthContext } from "../store/AuthContext";
import CartItem from "./CartItem";
import {  useNavigate } from "react-router-dom";

const Cart = () => {
  const { fetchCartItems, cartItems , subtotal, setSubtotal} = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const navigate=useNavigate()
  
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    // console.log("Subtotal is calculated")
    // Calculate subtotal whenever cart items are updated
    const newSubtotal = cartItems.reduce((acc, item) => {
      const itemPrice = item.size ? item.productId.size[item.size] : item.productId.price;
      return acc + itemPrice * item.quantity;
    }, 0);
    setSubtotal(newSubtotal);
  }, [cartItems]);
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 md:px-16 px-4 lg:pt-48 pt-24  mb-8">
      <h2 className="marcellus text-3xl font-md">Cart</h2>
      {auth? <div className="">
        {cartItems.map((item, i) => (
          <CartItem item={item} setSubtotal={setSubtotal} subtotal={subtotal} key={`${item.productId._id}-${item.size}`}/> 
        ))}
      </div>: <div className="text-xl my-28 text-center text-grey">Please login to see your cart items.</div>}
      {cartItems.length===0 && auth && <div className="text-xl my-28 text-center text-grey"><p>Please add items to your cart.</p><p>Happy Shopping.</p> </div>}
      <div className="px-12">
        <div className="flex justify-between petrona">
          <h4 className=" text-2xl font-md">Subtotal</h4>
          <p className="text-2xl font-md">Rs. {subtotal}</p>
        </div>
        <button
          className={`btn  text-white text-lg bg-lightGreen  hover:bg-lightestGreen hover:text-white outline-none border-0 w-full mt-8 ${cartItems.length===0? 'disabled': ''}`}
          onClick={()=>handleCheckout()}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
