import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/CartContext";
import { AuthContext } from "../store/AuthContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { fetchCartItems, cartItems } = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const [subtotal, setSubtotal]= useState(0)
  
  // useEffect(() => {
  //   if (auth?.id) {
  //     fetchCartItems(auth.id);
  // }

  // }, [auth?.id])

  useEffect(() => {
    console.log("Subtotal is calculated")
    // Calculate subtotal whenever cart items are updated
    const newSubtotal = cartItems.reduce((acc, item) => {
      const itemPrice = item.size ? item.productId.size[item.size] : item.productId.price;
      return acc + itemPrice * item.quantity;
    }, 0);
    setSubtotal(newSubtotal);
  }, [cartItems]);
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-16 pt-44">
      <h2 className="marcellus text-3xl font-md">Cart</h2>
      <div className="">
        {cartItems.map((item, i) => (
          <CartItem item={item} setSubtotal={setSubtotal} subtotal={subtotal} key={`${item.productId._id}-${item.size}`}/> 
        ))}
      </div>
      <div className="px-12">
        <div className="flex justify-between petrona">
          <h4 className=" text-2xl font-md">Subtotal</h4>
          <p className="text-2xl font-md">Rs. {subtotal}</p>
        </div>
        <button
          className={`btn  text-green text-lg bg-lightGreen  hover:bg-[#3cb371] hover:text-white outline-none border-0 w-full mt-8 `}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
